import OTPInput, { ResendOTP } from "otp-input-react";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const VerifyOtp = ({ isVisible, hideModal }) => {

    const SModalOverlay = styled.div`
    background-color: #999999;
    height: 100vh;
    left: 0;
    opacity: 0.5;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 500;
    `;

    const SModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    left: 0;
    outline: 0;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 25%;
    width: 100%;
    z-index: 1000;
    `;

    const SModal = styled.div`
    align-items: center;
    background: white;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    margin: 1.875rem;
    max-width: 500px;
    position: relative;
    z-index: 100;
    `;

    const SHeader = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 1.875rem 0.9375rem 1.875rem 0.9375rem;
    `;

    const STitle = styled.h5`
    margin-bottom: 0.3125rem;
    `;

    const [OTP, setOTP] = useState("");
    const renderButton = buttonProps => {
        return (
            <button {...buttonProps}>
                {buttonProps.remainingTime !== 0
                    ? `Please wait for ${buttonProps.remainingTime} sec`
                    : "Resend"}
            </button>
        );
    };

    const renderTime = () => React.Fragment;
    return isVisible
        ? createPortal(
            <React.Fragment>
                <SModalOverlay />
                <SModalWrapper
                    aria-modal={true}
                    aria-hidden={true}
                    tabIndex={-1}
                    role="dialog"
                >
                    <SModal>
                        <SHeader>
                            <STitle>Enter OTP</STitle>
                        </SHeader>
                        <OTPInput style={{
                            marginLeft: "5rem",
                            marginRight: "5rem",
                            marginBottom: "2rem"
                        }}
                            value={OTP}
                            onChange={setOTP}
                            autoFocus
                            OTPLength={4}
                            otpType="number"
                            disabled={false}
                        />
                        {/* <ResendOTP handelResendClick={() => console.log("Resend clicked")} /> */}
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "2rem"
                        }}>
                            <ResendOTP renderButton={renderButton} renderTime={renderTime} />

                            <button style={{ marginLeft: "2rem" }} onClick={hideModal}>
                                Close
                            </button>
                        </div>
                    </SModal>
                </SModalWrapper>
            </React.Fragment>,
            document.body,

        ) : null;
};

export default VerifyOtp