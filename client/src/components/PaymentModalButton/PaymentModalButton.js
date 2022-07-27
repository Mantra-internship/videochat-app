import React from 'react';
import VerifyOtp from '../VerifyOtp/VerifyOtp';
import GetOtp from '../GetOtp/GetOtp.js';
import useModal from '../OtpModal/useModal.js';
import styled from 'styled-components';

export default function PaymentModalButton() {
  return (
    <div>
      <Button >Buy Credits</Button>
      <GetOtp isVisible={isVisible} hideModal={toggleModal} />
      {/* <button onClick={toggleModal}>
        Verify Otp
      </button>
      <VerifyOtp isVisible={isVisible} hideModal={toggleModal} /> */}
    </div>
  );
}

const Button = styled.div`
  width: 100px;
  height: 30px;
  border: none;
  font-size: 15px;
  line-height: 30px;
  margin-right: 15px;
  padding: 0 7px;
  background-color: #ee2560;
  border-radius: 15px;
  cursor: pointer;

  :hover {
    background-color: #f25483;
    cursor: pointer;
  }
`;
