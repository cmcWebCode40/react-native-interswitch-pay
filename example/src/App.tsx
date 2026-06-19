import { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import {
  IswPaymentWebView,
  type IswWebViewRefMethods,
  type WebCheckoutPayResponse,
} from 'react-native-interswitch-pay';

const isTablet = Platform.OS === 'ios' && Platform.isPad;

export default function App() {
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<WebCheckoutPayResponse | undefined>(
    undefined
  );
  const webRef = useRef<IswWebViewRefMethods>(null);
  const [txnRef, setTxnRef] = useState(`txn_${Date.now()}`);

  const handleStartPayment = () => {
    if (!amount) {
      Alert.alert('Validation Error', 'Please enter a valid amount');
      return;
    }
    if (isNaN(Number(amount))) {
      Alert.alert('Validation Error', 'Amount must be a number');
      return;
    }
    setResponse(undefined);
    try {
      const newTxnRef = `txn_${Date.now()}`;
      setTxnRef(newTxnRef);

      // Added this delay for Test purposes, so you can test multiple times
      setTimeout(() => {
        webRef.current?.start();
      }, 100);
    } catch (error) {
      Alert.alert('Validation Error', (error as Error).message);
    }
  };

  const isw = {
    currency: '566',
    mode: 'TEST',
    merchantCode: 'MX6072',
    payItemId: '9405967',
    transactionRef: txnRef,
    amount: Number(amount) ?? 0,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.text}>Interswitch Payment Gateway(IPG) DEMO</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          onChangeText={(text) => setAmount(text)}
          placeholderTextColor={'#777'}
        />
        <TouchableOpacity style={styles.button} onPress={handleStartPayment}>
          <Text style={styles.buttonText}>Start Payment</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.displayContainer}>
        <Text style={styles.displayTitle}>Payment Response</Text>

        <TextInput
          multiline
          editable={false}
          value={
            response ? JSON.stringify(response, null, 2) : 'No response yet'
          }
          style={styles.displayBody}
        />
      </View>
      {isw.amount ? (
        <IswPaymentWebView
          ref={webRef}
          amount={isw.amount}
          autoStart={false}
          trnxRef={txnRef}
          showBackdrop={false}
          mode={isw.mode as any}
          merchantCode={isw.merchantCode}
          payItem={{ id: isw.payItemId }}
          style={styles.webViewStyle}
          onCompleted={(resp) => {
            setResponse(resp);
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  text: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  form: {
    marginTop: '25%',
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  webViewStyle: {
    marginTop: Platform.select({
      ios: isTablet ? '0%' : '10%',
      android: '0%',
    }),
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
  },
  displayContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f7fbff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  displayTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1f2937',
  },
  displayBody: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6eef8',
    fontSize: 12,
    color: '#111827',
    minHeight: 110,
    textAlignVertical: 'top',
  },
});
