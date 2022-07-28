import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default function Invoice() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src="https://play-lh.googleusercontent.com/wCnxghYaWoQq27vGPQ88pdLN0Tccwsgp_rRo6UmgwxnEFVIXQYd5F4dGc_UUQO4rC85l=w600-h300-pc0xffffff-pd" />
        <InvoiceTitle title="Invoice" />
        <InvoiceNo invoice={invoice} />
        <BillTo invoice={invoice} />
        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
}
