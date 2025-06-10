import { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { IswPaymentWebView } from 'react-native-interswitch-pay';
import type { IswWebViewRefMethods } from '../../src/types';

export default function App() {
  const webRef = useRef<IswWebViewRefMethods>(null);
  const [txnRef, setTxnRef] = useState(`txn_${Date.now()}`);

  const handleStartPayment = () => {
    try {
      const newTxnRef = `txn_${Date.now()}`;
      setTxnRef(newTxnRef);

      setTimeout(() => {
        webRef.current?.start();
      }, 100);
    } catch (error) {
      Alert.alert('Validation Error', (error as Error).message);
    }
  };

  const isw = {
    merchantCode: 'MX189360',
    payItemId: 'Default_Payable_MX189360',
    transactionRef: txnRef,
    amount: 100000,
    currency: '566',
    mode: 'TEST',
    customerName: 'Interswitch Energy Platform',
    customerId: '40375312338625',
    splitAccounts: [
      {
        alias: 'Merchant Account',
        amount: 50000,
        description: 'Meter top up',
        isPrimary: true,
      },
      {
        alias: 'Indeco Convenience Account 1',
        amount: 50000,
        description: 'Meter top up convenience fee',
        isPrimary: false,
      },
    ],
    customerEmail: 'innovation@interswitchng.com',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleStartPayment}>
        <Text style={styles.buttonText}>Start Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.stopButton]}
        onPress={() => webRef.current?.end()}
      >
        <Text style={styles.buttonText}>Stop Payment</Text>
      </TouchableOpacity>
      <IswPaymentWebView
        ref={webRef}
        amount={isw.amount}
        autoStart={false}
        mode={isw.mode as any}
        merchantCode={isw.merchantCode}
        trnxRef={txnRef}
        payItem={{ id: isw.payItemId }}
        onCompleted={(response) => {
          console.log('AcceptPaymentScreen', response);
        }}
        splitAccounts={isw.splitAccounts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: '20%',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
