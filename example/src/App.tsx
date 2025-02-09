import { useRef } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { IswPaymentWebView } from 'react-native-interswitch-pay';

// Note: For typescript  support
type TIswPaymentWebViewRef = React.ElementRef<typeof IswPaymentWebView>;

export default function App() {
  const IswPaymentWebViewRef = useRef<TIswPaymentWebViewRef>(null);
  const payParams = {
    customer: {
      email: 'mike@gmail.com',
      name: 'Mike',
      id: '33',
    },
    amount: 5000,
    currency: 566,
    mode: 'TEST',
    merchantCode: 'MX6072',
    payItem: { id: '9405967' },
    transactionRef: '12344grtr',
    redirectUrl: 'https://example.com/payment-response',
    checkoutUrl: 'https://newwebpay.qa.interswitchng.com/collections/w/pay',
  };

  const handleCallback = () => {
    console.log(`HELLO`);
  };

  return (
    <View style={styles.container}>
      {/* <IswPaymentWebView  /> */}
      <Text>Interswitch Payment</Text>
      <IswPaymentWebView
        amount={payParams.amount}
        currency={payParams.currency}
        mode={payParams.mode as any}
        autoStart={true}
        customer={payParams.customer}
        payItem={payParams.payItem}
        trnxRef={payParams.transactionRef}
        merchantCode={payParams.merchantCode}
        onCompleted={handleCallback}
        redirectUrl={payParams.redirectUrl}
        checkoutUrl={payParams.checkoutUrl}
      />
      <Button
        title="Start"
        onPress={() => {
          IswPaymentWebViewRef.current?.start();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
