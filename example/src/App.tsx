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
  type GetHtmlInputsFields,
} from 'react-native-interswitch-pay';

const isTablet = Platform.OS === 'ios' && Platform.isPad;

const IPG_SANDBOX_FORM_URL =
  'https://newwebpay.interswitchng.com/collections/w/pay';
// 'https://newwebpay.qa.interswitchng.com/collections/w/pay';

// Example of a fully self-hosted checkout page (no dependency on the hosted
// inline checkout URL): a hidden HTML form matching Interswitch's classic
// redirect-based checkout, auto-submitted as soon as the WebView loads it.

const buildCheckoutFormHtml = (params: GetHtmlInputsFields) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <form
      id="ipg-form"
      method="post"
      action="${IPG_SANDBOX_FORM_URL}"
      style="display: none;"
    >
      <input name="merchant_code" value="${params.merchantCode}" />
      <input name="pay_item_id" value="${params.payItem.id}" />
      <input name="site_redirect_url" value="${params.siteRedirectUrl ?? ''}" />
      <input name="txn_ref" value="${params.trnxRef}" />
      <input name="amount" value="${params.amount}" />
      <input name="currency" value="${params.currency}" />
    </form>
    <script>
      document.getElementById('ipg-form').submit();
    </script>
  </body>
</html>
`;

type DemoTab = 'baseUrl' | 'customHtml';

export default function App() {
  const [activeTab, setActiveTab] = useState<DemoTab>('baseUrl');

  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<WebCheckoutPayResponse | undefined>(
    undefined
  );
  const webRef = useRef<IswWebViewRefMethods>(null);
  const [txnRef, setTxnRef] = useState(`txn_${Date.now()}`);

  const [htmlAmount, setHtmlAmount] = useState<string | undefined>(undefined);
  const [htmlResponse, setHtmlResponse] = useState<
    WebCheckoutPayResponse | undefined
  >(undefined);
  const htmlWebRef = useRef<IswWebViewRefMethods>(null);
  const [htmlTxnRef, setHtmlTxnRef] = useState(`txn_${Date.now()}`);

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

  const handleTabChange = (tab: DemoTab) => {
    setActiveTab(tab);
    setAmount(undefined);
    setHtmlAmount(undefined);
  };

  const handleStartHtmlPayment = () => {
    if (!htmlAmount) {
      Alert.alert('Validation Error', 'Please enter a valid amount');
      return;
    }
    if (isNaN(Number(htmlAmount))) {
      Alert.alert('Validation Error', 'Amount must be a number');
      return;
    }
    setHtmlResponse(undefined);
    try {
      const newTxnRef = `txn_${Date.now()}`;
      setHtmlTxnRef(newTxnRef);

      // Added this delay for Test purposes, so you can test multiple times
      setTimeout(() => {
        htmlWebRef.current?.start();
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

  const htmlIsw = {
    currency: isw.currency,
    mode: isw.mode,
    merchantCode: isw.merchantCode,
    payItemId: isw.payItemId,
    transactionRef: htmlTxnRef,
    amount: Number(htmlAmount) ?? 0,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.text}>Interswitch Payment Gateway(IPG) DEMO</Text>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'baseUrl' && styles.tabButtonActive,
          ]}
          onPress={() => handleTabChange('baseUrl')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'baseUrl' && styles.tabButtonTextActive,
            ]}
          >
            Custom Base URL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'customHtml' && styles.tabButtonActive,
          ]}
          onPress={() => handleTabChange('customHtml')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'customHtml' && styles.tabButtonTextActive,
            ]}
          >
            Custom HTML
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'baseUrl' ? (
        <>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount ?? ''}
              onChangeText={(text) => setAmount(text)}
              placeholderTextColor={'#777'}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleStartPayment}
            >
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
        </>
      ) : (
        <>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={htmlAmount ?? ''}
              onChangeText={(text) => setHtmlAmount(text)}
              placeholderTextColor={'#777'}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleStartHtmlPayment}
            >
              <Text style={styles.buttonText}>Start Payment</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.displayContainer}>
            <Text style={styles.displayTitle}>Payment Response</Text>

            <TextInput
              multiline
              editable={false}
              value={
                htmlResponse
                  ? JSON.stringify(htmlResponse, null, 2)
                  : 'No response yet'
              }
              style={styles.displayBody}
            />
          </View>
          {htmlIsw.amount ? (
            <IswPaymentWebView
              ref={htmlWebRef}
              amount={htmlIsw.amount}
              autoStart={false}
              trnxRef={htmlTxnRef}
              showBackdrop={false}
              mode={htmlIsw.mode as any}
              merchantCode={htmlIsw.merchantCode}
              payItem={{ id: htmlIsw.payItemId }}
              style={styles.webViewStyle}
              onCompleted={(resp) => {
                setHtmlResponse(resp);
              }}
              getHtml={buildCheckoutFormHtml}
            />
          ) : null}
        </>
      )}
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
  tabBar: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  tabButtonTextActive: {
    color: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  form: {
    marginTop: '10%',
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
