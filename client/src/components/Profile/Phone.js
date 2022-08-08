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
    }else{
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
          // console.log(response);
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
        {
          userPhone !== phone
          ?
            <button onClick={otpSender}>Get OTP</button>
          :
            <></> 
        }
        
      </Row>
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
            <Row>
              <button onClick={otpVerifier}>Verify OTPs</button>
            </Row>
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

export default Phone;
