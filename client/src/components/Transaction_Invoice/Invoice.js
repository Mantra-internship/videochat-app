import React from 'react';
import { Page, Document, Image, StyleSheet, Text, View } from '@react-pdf/renderer';
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
    width: 190,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    width: `100%`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    marginTop: `20px`
  },
  heading: {
    fontSize: `32px`,
    
  },
  invoiceId: {
    fontSize: `16px`,
    alignSelf: `center`,
    padding: `0`
  },
  bsInfo: {
    flexDirection: `row`,
    width: `100%`
  },
  infoHolder: {
    width: `50%`,
    padding: `5px 0px`

  },
  infoHeading: {
    fontSize: `18px`,
    color: `rgb(80, 80, 80)`
  },
  fieldName: {
    fontSize: `12px`,
    color: `black`
  },
  infoText: {
    color: `rgb(50, 50, 50)`
  },
  paymentInfoHolder: {
    width: `100%`,
    marginTop: `30px`,
  }
});

export default function Invoice(props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src="https://play-lh.googleusercontent.com/wCnxghYaWoQq27vGPQ88pdLN0Tccwsgp_rRo6UmgwxnEFVIXQYd5F4dGc_UUQO4rC85l=w600-h300-pc0xffffff-pd" />

        <View style={styles.header}>
          <Text style={styles.heading}>Invoice</Text>
          <Text style={styles.invoiceId}>{props.invoice.paymentId}</Text>
        </View>

        <View style={styles.bsInfo}>

          <View style={styles.infoHolder}>
            <Text style={styles.infoHeading}>Buyer:</Text>
            <Text style={styles.infoText}><Text style={styles.fieldName}>Name:</Text> {props.invoice.name}</Text>
            <Text style={styles.infoText}><Text style={styles.fieldName}>Phone:</Text> {props.invoice.phone}</Text>
          </View>

          <View style={styles.infoHolder}>
            <Text style={styles.infoHeading}>Seller:</Text>
            <Text style={styles.infoText}><Text style={styles.fieldName}>Organization:</Text> 11Mantra</Text>
            <Text style={styles.infoText}><Text style={styles.fieldName}>Country:</Text> India</Text>
            <Text style={styles.infoText}><Text style={styles.fieldName}>Phone:</Text> +91 xxxxxxxxxx</Text>
          </View>

        </View>

        <View style={styles.paymentInfoHolder}>
          <Text style={styles.infoHeading}>Payment Details</Text>
          <Text style={styles.infoText}><Text style={styles.fieldName}>Status:</Text> {props.invoice.paymentRequestStatus}</Text>
          <Text style={styles.infoText}><Text style={styles.fieldName}>Payment Date:</Text> {props.invoice.paymentCreatedAt.substring(0, 10)}</Text>
          <Text style={styles.infoText}><Text style={styles.fieldName}>Amount:</Text> {props.invoice.amount} {props.invoice.currency}</Text>
        </View>

        <InvoiceThankYouMsg />
      </Page>
    </Document>
  );
}
