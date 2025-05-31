import { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IswPaymentWebView } from 'react-native-interswitch-pay';

type TIswPaymentWebViewRef = React.ComponentRef<typeof IswPaymentWebView>;

export default function App() {
  const IswPaymentWebViewRef = useRef<TIswPaymentWebViewRef>(null);
  const payParams = {
    customer: {
      email: 'mike@gmail.com',
      name: 'Mike',
      id: '33',
    },
    amount: 1000,
    currency: 566,
    mode: 'TEST',
    merchantCode: 'MX19329',
    payItem: { id: 'Default_Payable_MX19329' },
    transactionRef: `TRN-${Date.now()}`,
    redirectUrl: 'https://example.com/payment-response',
    checkoutUrl: 'https://newwebpay.qa.interswitchng.com/collections/w/pay',
  };

  const handleCallback = () => {
    console.log(`HELLO`);
  };

  return (
    <View style={styles.container}>
      <IswPaymentWebView
        autoStart={false}
        ref={IswPaymentWebViewRef}
        amount={payParams.amount}
        payItem={payParams.payItem}
        onCompleted={handleCallback}
        currency={payParams.currency}
        mode={payParams.mode as any}
        customer={payParams.customer}
        transactionReference={payParams.transactionRef}
        merchantCode={payParams.merchantCode}
        redirectUrl={payParams.redirectUrl}
        checkoutUrl={payParams.checkoutUrl}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => IswPaymentWebViewRef.current?.start()}
      >
        <Text style={styles.buttonText}>Start Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.stopButton]}
        onPress={() => IswPaymentWebViewRef.current?.end()}
      >
        <Text style={styles.buttonText}>Stop Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
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
