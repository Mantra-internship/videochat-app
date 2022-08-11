import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import styled from "styled-components";
import socket from "../../socket";
import VideoCard from "../Video/VideoCard";
import BottomBar from "../BottomBar/BottomBar";
import Chat from "../Chat/Chat";

const Room = (props) => {
  const currentUser = sessionStorage.getItem("user");
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: false, audio: false },
  });
  const [videoDevices, setVideoDevices] = useState([]);
  const [displayChat, setDisplayChat] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [showVideoDevices, setShowVideoDevices] = useState(false);
  const peersRef = useRef([]);
  const userVideoRef = useRef();
  const screenTrackRef = useRef();
  const userStream = useRef();
  const roomId = props.match.params.roomId;
  const [bottomBarButtonsEnabler, setBottomBarButtonsEnabler] = useState(true);
  useEffect(() => {
    // Get Video Devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === "videoinput");
      setVideoDevices(filtered);
      console.log("filtered: ",filtered);
    });

    // Set Back Button Event
    window.addEventListener("popstate", goToBack);

    // Handle close event when user presses cross or Alt + F4 / Ctrl + W
    // To be fixed
    // window.onbeforeunload = () => {
    //   socket.emit("BE-leave-room", { roomId, leaver: currentUser });
    //   props.history.push("/");
    //   sessionStorage.removeItem("user");
    //   return "...";
    // }

    const userID = sessionStorage.getItem('UID');
    socket.emit("BE-token-create", { userID });
    socket.on("FE-token-saver", (error, tokenObj) => {
      // console.log(tokenObj);
      if (error && error.code && (error.code === 400 || error.code === 404)) {
        props.history.push(`/login`);
      } else {
        sessionStorage.setItem("userI", JSON.stringify(tokenObj));
        socket.emit("BE-join-room", { roomId, userName: currentUser });
      }
    })

    // Connect Camera & Mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log("stream.getVideoTrack() :", stream.getVideoTracks())
        stream.getVideoTracks()[0].enabled = false
        const eTime = Math.ceil(JSON.parse(sessionStorage.getItem("userI")).eTime);
        let currTime = Math.ceil(Date.now() / 1000);
        // console.log("currTime : ", currTime);
        if (currTime >= eTime) {
          setBottomBarButtonsEnabler(false);
          alert("Time Up : Credits Expired, Please Recharge to get camera and audio access");
          stopStreamingCameraAndAudio(stream);
        }
       else{
          const interval = setInterval(() => {
            const eTime = Math.ceil(JSON.parse(sessionStorage.getItem("userI")).eTime);
            console.log("eTime : ", eTime);
            console.log(Date.now() / 1000);
            let currTime = Math.ceil(Date.now() / 1000);
            console.log("currTime : ", currTime);
            if (currTime >= eTime) {
              setBottomBarButtonsEnabler(false);
              alert("Time Up : Credits Expired the camera and audio will stop withing 10 secs");
              setTimeout(() => stopStreamingCameraAndAudio(stream), 10000);
              
              setUserVideoAudio((preList) => {
                  const userVideoTrack =
                    userVideoRef.current.srcObject.getVideoTracks()[0];
                  const userAudioTrack =
                    userVideoRef.current.srcObject.getAudioTracks()[0];
                  userVideoTrack.enabled = false;
                  console.log("userVideoTrack : " , userVideoTrack);

                  console.log( "userAudioTrack : ", userAudioTrack);
          
                  if (userAudioTrack) {
                    userAudioTrack.enabled = false;
                  } else {
                    userStream.current.getAudioTracks()[0].enabled = false;
                  }
          
                return {
                  ...preList,
                  localUser: { video: false, audio: false },
                };
              });
          
              socket.emit("BE-toggle-both", { roomId });

              return clearInterval(interval);
            }
          }, 5000);
        }
    
        console.log("stream", stream);
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;


        socket.on("FE-user-join", (users) => {
          // all users
          const peers = [];
          users.forEach(({ userId, info }) => {
            let { userName, video, audio } = info;

            if (userName !== currentUser) {
              const peer = createPeer(userId, socket.id, stream);

              peer.userName = userName;
              peer.peerID = userId;

              peersRef.current.push({
                peerID: userId,
                peer,
                userName,
              });
              peers.push(peer);

              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio },
                };
              });
            }
          });

          setPeers(peers);
        });

        socket.on("FE-receive-call", ({ signal, from, info }) => {
          let { userName, video, audio } = info;
          const peerIdx = findPeer(from);

          if (!peerIdx) {
            const peer = addPeer(signal, from, stream);

            peer.userName = userName;

            peersRef.current.push({
              peerID: from,
              peer,
              userName: userName,
            });
            setPeers((users) => {
              return [...users, peer];
            });
            setUserVideoAudio((preList) => {
              return {
                ...preList,
                [peer.userName]: { video, audio },
              };
            });
          }
        });

        socket.on("FE-call-accepted", ({ signal, answerId }) => {
          const peerIdx = findPeer(answerId);
          peerIdx.peer.signal(signal);
        });

        socket.on("FE-user-leave", ({ userId, userName }) => {
          const peerIdx = findPeer(userId);
          peerIdx.peer.destroy();
          setPeers((users) => {
            users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
            return [...users];
          });
          peersRef.current = peersRef.current.filter(
            ({ peerID }) => peerID !== userId
          );
        });
      });

    socket.on("FE-toggle-camera", ({ userId, switchTarget }) => {
      const peerIdx = findPeer(userId);

      setUserVideoAudio((preList) => {
        let video = preList[peerIdx.userName].video;
        let audio = preList[peerIdx.userName].audio;

        if (switchTarget === "video") video = !video;
        else if(switchTarget === "bothOff") {
          video = false;
          audio = false;
        }
        else audio = !audio;

        return {
          ...preList,
          [peerIdx.userName]: { video, audio },
        };
      });
    });

    return () => {
      // clearInterval(interval);
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  // function for connect camera and mic

  function createPeer(userId, caller, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-call-user", {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on("disconnect", () => {
      peer.destroy();
    });

    return peer;
  }
  function stopStreamingCameraAndAudio(stream){
    stream.getTracks().forEach(function(track) {
        if (track.readyState == 'live') {
            track.stop();
        }
    });
  }
  function addPeer(incomingSignal, callerId, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-accept-call", { signal, to: callerId });
    });

    peer.on("disconnect", () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function findPeer(id) {
    return peersRef.current.find((p) => p.peerID === id);
  }
  function createUserVideo(peer, index, arr) {
    return (
      <VideoBox
        className={`width-peer${peers.length > 8 ? "" : peers.length}`}
        onClick={expandScreen}
        key={index}
      >
        {writeUserName(peer.userName)}
        <FaIcon className="fas fa-expand" />
        <VideoCard key={index} peer={peer} number={arr.length} />
      </VideoBox>
    );
  }

  function writeUserName(userName, index) {
    if (userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].video) {
        return <UserName key={userName}>{userName}</UserName>;
      }
    }
  }

  // Open Chat
  const clickChat = (e) => {
    e.stopPropagation();
    setDisplayChat(!displayChat);
  };

  // BackButton
  const goToBack = (e) => {
    e.preventDefault();
    socket.emit("BE-leave-room", { roomId, leaver: currentUser });
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  const toggleCameraAudio = (e) => {
    const target = e.target.getAttribute("data-switch");
    console.log( "target: ", target);
    setUserVideoAudio((preList) => {
      let videoSwitch = preList["localUser"].video;
      let audioSwitch = preList["localUser"].audio;

      if (target === "video") {
        const userVideoTrack =
          userVideoRef.current.srcObject.getVideoTracks()[0];
        videoSwitch = !videoSwitch;
        userVideoTrack.enabled = videoSwitch;
        console.log("userVideoTrack : " , userVideoTrack);
      } else {
        const userAudioTrack =
          userVideoRef.current.srcObject.getAudioTracks()[0];
        audioSwitch = !audioSwitch;
        console.log( "userAudioTrack : ", userAudioTrack);

        if (userAudioTrack) {
          userAudioTrack.enabled = audioSwitch;
        } else {
          userStream.current.getAudioTracks()[0].enabled = audioSwitch;
        }
      }

      return {
        ...preList,
        localUser: { video: videoSwitch, audio: audioSwitch },
      };
    });

    socket.emit("BE-toggle-camera-audio", { roomId, switchTarget: target });
  };
  // const testToggleCameraAudio = (e) => {
  //   // const target = e.target.getAttribute("data-switch");
  //   // console.log( "target: ", target);
  //   setUserVideoAudio((preList) => {
  //     let videoSwitch = preList["localUser"].video;
  //     let audioSwitch = preList["localUser"].audio;

  //     // if (target === "video") {
  //       const userVideoTrack =
  //         userVideoRef.current.srcObject.getVideoTracks()[0];
  //       videoSwitch = !videoSwitch;
  //       userVideoTrack.enabled = videoSwitch;
  //       console.log("userVideoTrack : " , userVideoTrack);
  //     // } else {
  //       const userAudioTrack =
  //         userVideoRef.current.srcObject.getAudioTracks()[0];
  //       audioSwitch = !audioSwitch;
  //       console.log( "userAudioTrack : ", userAudioTrack);

  //       if (userAudioTrack) {
  //         userAudioTrack.enabled = audioSwitch;
  //       } else {
  //         userStream.current.getAudioTracks()[0].enabled = audioSwitch;
  //       }
  //     // }

  //     return {
  //       ...preList,
  //       localUser: { video: videoSwitch, audio: audioSwitch },
  //     };
  //   });

  //   // socket.emit("BE-toggle-camera-audio", { roomId, switchTarget: target });
  // };

  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((stream) => {
          const screenTrack = stream.getTracks()[0];

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              peer.streams[0]
                .getTracks()
                .find((track) => track.kind === "video"),
              screenTrack,
              userStream.current
            );
          });

          // Listen click end
          screenTrack.onended = () => {
            peersRef.current.forEach(({ peer }) => {
              peer.replaceTrack(
                screenTrack,
                peer.streams[0]
                  .getTracks()
                  .find((track) => track.kind === "video"),
                userStream.current
              );
            });
            userVideoRef.current.srcObject = userStream.current;
            setScreenShare(false);
          };

          userVideoRef.current.srcObject = stream;
          screenTrackRef.current = screenTrack;
          setScreenShare(true);
        });
    } else {
      screenTrackRef.current.onended();
    }
  };

  const expandScreen = (e) => {
    const elem = e.target;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  // Buy Credits 
  const goToBuyCredits = () => {
    props.history.push("/buy-credits");
 }
  

  const clickBackground = () => {
    if (!showVideoDevices) return;

    setShowVideoDevices(false);
  };

  const clickCameraDevice = (event) => {
    if (
      event &&
      event.target &&
      event.target.dataset &&
      event.target.dataset.value
    ) {
      const deviceId = event.target.dataset.value;
      const enabledAudio =
        userVideoRef.current.srcObject.getAudioTracks()[0].enabled;

      navigator.mediaDevices
        .getUserMedia({ video: { deviceId }, audio: enabledAudio })
        .then((stream) => {
          const newStreamTrack = stream
            .getTracks()
            .find((track) => track.kind === "video");
          const oldStreamTrack = userStream.current
            .getTracks()
            .find((track) => track.kind === "video");

          userStream.current.removeTrack(oldStreamTrack);
          userStream.current.addTrack(newStreamTrack);

          peersRef.current.forEach(({ peer }) => {
            // replaceTrack (oldTrack, newTrack, oldStream);
            peer.replaceTrack(
              oldStreamTrack,
              newStreamTrack,
              userStream.current
            );
          });
        });
    }
  };

  return (
    <RoomContainer onClick={clickBackground}>
      <VideoAndBarContainer>
        <VideoContainer>
          {/* Current User Video */}
          <VideoBox
            className={`width-peer${peers.length > 8 ? '' : peers.length}`}
          >
            {userVideoAudio['localUser'].video ? null : (
              <UserName>{currentUser}</UserName>
            )}
            <FaIcon className="fas fa-expand" />
            <MyVideo
              onClick={expandScreen}
              ref={userVideoRef}
              muted
              autoPlay
              playInline
            ></MyVideo>
          </VideoBox>
          {/* Joined User Vidoe */}
          {peers &&
            peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
        </VideoContainer>
        <BottomBar
          clickScreenSharing={clickScreenSharing}
          clickChat={clickChat}
          clickCameraDevice={clickCameraDevice}
          goToBack={goToBack}
          toggleCameraAudio={toggleCameraAudio}
          userVideoAudio={userVideoAudio['localUser']}
          screenShare={screenShare}
          videoDevices={videoDevices}
          showVideoDevices={showVideoDevices}
          setShowVideoDevices={setShowVideoDevices}
          goToBuyCredits={goToBuyCredits}
          enabled={bottomBarButtonsEnabler}
        />
      </VideoAndBarContainer>
      <Chat display={displayChat} roomId={roomId} />
    </RoomContainer>
  );
};

const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  flex-direction: row;
`;

const VideoContainer = styled.div`
  max-width: 100%;
  height: 92%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  gap: 10px;
`;

const VideoAndBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const MyVideo = styled.video``;

const VideoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > video {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :hover {
    > i {
      display: block;
    }
  }
`;

const UserName = styled.div`
  position: absolute;
  font-size: calc(20px + 5vmin);
  z-index: 1;
`;

const FaIcon = styled.i`
  display: none;
  position: absolute;
  right: 15px;
  top: 15px;
`;

export default Room;
