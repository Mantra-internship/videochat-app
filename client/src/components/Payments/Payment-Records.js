import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";

const Payment_records = (props) => {
    const [transactionData, setTransactionData] = useState([0]);
    const [userId, setUserId] = useState("");

    useEffect( () => {
        const temp = setTimeout(transactionDataFetcher(), 1000);
    },[]);

    // To be tested
    const transactionDataFetcher = async () => {
        const cArray = document.cookie.split(" ");
        cArray.forEach((string) => {
            let sArray = string.split("=");
            if(sArray[0] === "user"){
                // To be Updated (replace atob or shift functionality to backend for buffer use)
                setUserId(atob(sArray[1].split(".")[1].replace('-', '+').replace('_', '/')).id);
            }
        })
        await axios.post("http://localhost:5000/api/user/payment-record", {
            header: { "Authorization": `Bearer ${userId}`}
        }).then((resObj) => {
            setTransactionData(resObj.data.paymentRecord);
            console.log(transactionData)
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <h4>Transaction history</h4>
            {
                transactionData.map((record) => {
                    return(
                        <div style={{border: "solid 1px white", borderRadius: "10px", margin: "20px", padding: "20px"}}>
                            <h4>{ record.paymentRequestStatus }</h4>
                            <p>{ record.amount }</p>
                            <p>{ record.paymentRequestId }</p>
                        </div>
                    )
                })
            }
        </>
    );
}

export default Payment_records;