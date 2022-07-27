import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { createPortal } from "react-dom";
import styled from "styled-components";

const GetOtp = ({ isVisible, hideModal }) => {

    // make axios POST req to send OTP
    

    const [phone, setPhone] = useState("");
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
                            <STitle>Enter Phone Number</STitle>
                        </SHeader>
                        <PhoneInput style={{
                            height: "2rem",
                            width: "15rem",
                            marginLeft: "5rem",
                            marginRight: "5rem",
                            marginBottom: "2rem"

                        }}
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={setPhone} />
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "2rem"
                        }}>
                            <button style={{}} onClick={hideModal}>
                                Submit
                            </button>

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

export default GetOtp