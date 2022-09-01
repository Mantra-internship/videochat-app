import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Phone({
  phone,
  getToken
}
) {

  const [userPhone, setUserPhone] = useState(phone);
  const [loader, setLoader] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const oldPhoneOtpRef = useRef();
  const newPhoneOtpRef = useRef();
  

  const otpSender = async () => {
    // to accomodate all country codes for now
    if(userPhone.length < 10 || userPhone.length > 14){
      alert("Enter a valid phone number");
    } else {
      // axios to update the profile data
      await axios
        .post(
          'http://localhost:5000/api/user/phone-update',
          {
            newPhone: userPhone
          },
          {
            headers: { authorization: `Bearer ` + getToken() },
          }
        ).then((response) => {
          setShowFields(true);
          alert(response.data.message);
        }).catch((error) => {
          console.log(error);
          alert("something went wrong");
        })
    }
  }

  const otpVerifier = async () => {
    const oldPhoneOtp = oldPhoneOtpRef.current.value;
    const newPhoneOtp = newPhoneOtpRef.current.value;
    if(oldPhoneOtp && newPhoneOtp){
      setLoader(true);
      await axios
        .post(
          'http://localhost:5000/api/user/phone-update-verify',
          {
            oldPhoneOtp,
            newPhoneOtp
          },
          {
            headers: { authorization: `Bearer ` + getToken() },
          }
        ).then((response) => {
          console.log(response);
          alert(response.data.message);
          phone = userPhone;
          setLoader(false);
          setShowFields(false);
        }).catch((error) => {
          console.log(error);
          setLoader(false);
          alert("Wrong OTPs");
        })
    }else{
      alert("Please fill all the neccessary fields");
    }
  }

  return (
    <>
      <Row>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          type="phone"
          id="phone"
          placeholder="+91XXXXXXXXXX"
          defaultValue={phone}
          onChange={(e) => setUserPhone(e.target.value)}
        />
      </Row>
      <Row2>
        {
          userPhone !== phone
          ?
            <Button onClick={otpSender}>Get OTP</Button>
          :
            <></> 
        }
        
      </Row2>
      {
        showFields
        ?
          <>
            <Row>
              <Label htmlFor="oldPhoneOtp">Old phone OTP</Label>
              <Input
                type="number"
                id="oldPhoneOtp"
                placeholder="OTP sent on old number"
                ref={oldPhoneOtpRef}
              />
            </Row>
            <Row>
              <Label htmlFor="newPhoneOtp">New phone OTP</Label>
              <Input
                type="number"
                id="newPhoneOtp"
                placeholder="OTP sent on new number"
                ref={newPhoneOtpRef}
              />
            </Row>
            <Row2>
              <Button onClick={otpVerifier}>Verify OTPs</Button>
            </Row2>
          </>
        :
          <></>
      }
      
    </>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  line-height: 35px;
`;

const Row2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 250px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;

  @media (max-width: 500px) {
    width: 200px;
  }
`;

// const Select = styled.select`
//   width: 260px;
//   height: 35px;
//   margin-left: 15px;
//   padding-left: 10px;
//   outline: none;
//   border: none;
//   border-radius: 5px;

//   @media (max-width: 500px) {
//     width: 210px;
//   }
// `;

// const Textarea = styled.textarea`
//   height: 70px;
//   width: 250px;
//   resize: none;
//   font-size: 20px;
//   outline: none;
//   margin-left: 15px;
//   padding-left: 10px;
//   border: none;
//   border-radius: 5px;

//   @media (max-width: 500px) {
//     width: 200px;
//   }
// `;

const Button = styled.button`
  height: 30px;
  // margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 20px;
  font-weight: 500;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

export default Phone;
