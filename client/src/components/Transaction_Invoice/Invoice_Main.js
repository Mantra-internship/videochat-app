import React, { Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import Invoice from './Invoice';

function Invoice_Main() {
  const [invoiceData, setInvoiceData] = useState(false);
  // const [token, setToken] = useState('');

  useEffect(() => {
    getJwtToken();
    transactionDataFetcher();
  }, []);

  const getJwtToken = () => {
    const cArray = document.cookie.split(' ');
    let jwtToken; 
    cArray.map((cString) => {
      let sArray = cString.split('=');
      if (sArray[0] === 'user') {
        jwtToken = sArray[1];
        if(jwtToken[jwtToken.length - 1] === ';'){
          jwtToken = jwtToken.slice(0, -1);
        }
      }
    })
    return jwtToken;
  }

  // To be tested
  const transactionDataFetcher = async () => {

    const currentURLArray = window.location.href.split('/');
    const len = currentURLArray.length;
    const paymentId = currentURLArray[len - 1];

    await axios
      .post(
        `https://video-chat-backend99.herokuapp.com/api/user/getPaymentInfo/${paymentId}`,
        {},
        {
          headers: { authorization: `Bearer ` + getJwtToken() },
        }
      )
      .then((resObj) => {
        setInvoiceData(resObj.data);
        // console.log(resObj.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <PDFViewer width="1000" height="600" className="app">
        {
          invoiceData ? <Invoice invoice={invoiceData} /> : <></>
        }
        
      </PDFViewer>
    </Fragment>
  );
}

export default Invoice_Main;
