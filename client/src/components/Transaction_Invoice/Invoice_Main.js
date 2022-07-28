import React, { Component, Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Invoice from './Invoice';

function Invoice_Main() {
  const [invoiceData, setInvoiceData] = useState([0]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const temp = setTimeout(transactionDataFetcher(), 1000);
  }, []);

  // To be tested
  const transactionDataFetcher = async () => {
    const cArray = document.cookie.split(' ');
    cArray.forEach((string) => {
      let sArray = string.split('=');
      if (sArray[0] === 'user') {
        setUserId(sArray[1]);
      }
    });

    const currentURLArray = window.location.href.split('/');
    const len = currentURLArray.length;
    const paymentId = currentURLArray[len - 1];

    await axios
      .post(`http://localhost:5000/api/user/getPaymentInfo/${paymentId}`, {
        header: { Authorization: `Bearer ${token}` },
      })
      .then((resObj) => {
        setTransactionData(resObj.data.paymentRecord);
        console.log(transactionData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <PDFViewer width="1000" height="600" className="app">
        <Invoice invoice={invoice} />
      </PDFViewer>
    </Fragment>
  );
}

export default Invoice_Main;
