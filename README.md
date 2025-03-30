# react-native-interswitch-pay

<img width="459" alt="Interswitch" src="https://github.com/user-attachments/assets/1450262e-2ae9-4ec3-ac74-31fe50655b49">

The Interswitch React Native SDK simplifies the integration of the Interswitch Payment Gateway (IPG) into your React Native app using a WebView component.


[demo](https://www.loom.com/share/a368f65a0b2641b69e4fce1d74fcbbd8)


## Features  

- Flexible implementation following the [official documentation](https://docs.interswitchgroup.com/docs/web-checkout).  
- Integrated with the [Interswitch Web Redirect](https://docs.interswitchgroup.com/docs/web-checkout#option-2---web-redirect).  
- Built with TypeScript for type safety and an enhanced developer experience.  
- Supports both Expo and React Native CLI.


## Installation

##### Npm

```sh
npm install react-native-interswitch-pay
```

##### Yarn

```sh
yarn  react-native-interswitch-pay
```

##### Expo

```sh
expo  install react-native-interswitch-pay
```


> **_Important_**: This package depends on `react-native-webview` as a peer dependency and requires it for proper functionality.

## Quick Examples.


#### Auto start Payment

```js

import { View } from 'react-native';
import IswPaymentWebView from 'react-native-interswitch-pay';

export const PaymentScreen = () => {

  const handleCallback = () => {
    console.log('Handle callback here')
  };

  return (
    <View style={styles.container}>
        <IswPaymentWebView
          amount={amount}
          currency={566}
          mode={'TEST'}
          autoStart={true}
          payItem={{id: '9405967'}}
          merchantCode={'MX6072'}
          onCompleted={handleCallback}
          transactionReference={'12344grtr'}
          redirectUrl="https://example.com/payment-response"
          checkoutUrl={'https://newwebpay.qa.interswitchng.com/collections/w/pay'}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '10%',
  },
});


```

#### Use with Ref to trigger using a button

```js
import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import IswPaymentWebView from 'react-native-interswitch-pay';


// Note: For typescript  support
type TIswPaymentWebView = React.ComponentRef<typeof IswPaymentWebView>;

export default function App() {
  const IswWebViewRef = React.useRef<TIswPaymentWebView>(null);

  return (
    <View style={styles.container}>
        <IswPaymentWebView
          amount={amount}
          currency={566}
          mode={'TEST'}
          autoStart={false}
          ref={IswWebViewRef}
          payItem={{id: '9405967'}}
          merchantCode={'MX6072'}
          onCompleted={handleCallback}
          transactionReference={'12344grtr'}
          redirectUrl="https://example.com/payment-response"
          checkoutUrl={'https://newwebpay.qa.interswitchng.com/collections/w/pay'}
        />
      <Button
        onPress={() => {
          IswWebViewRef.current?.start();
        }}
        title={'Pay Now'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '10%',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
```

### Props

| Props Name           | Description                                                                                                                          | Required | Value                                   | Data type     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- | --------------------------------------- | -------- |
| transactionReference      | transaction reference.          | Yes      |                                         | string   |
| merchantCode       |  ISW merchant code                                                             | Yes       |   | string   |
| amount        | Cost of the item you want your customer to pay  | Yes       |                                         | number   |
| customer         | Customer information e.g email, first name, last name      | No       |                                         | object   |
| payItem       | Payment Item e.g id and name              | Yes      | | object[]  |
| autoStart      | To auto initialize transaction                                                                                                       | No       | false                                   | boolean  |
| indicatorColor | activity indicator color                                                                                                            | No       | red                                | string   |
| redirectUrl     | Merchant's website redirect url.                                                      | Yes       |                                         | string   |
| currency       | ISO currency code e.g 566                         | Yes      | e.g 566                                     | number   |
| mode  | Environment e.g LIVE, TEST                                  | Yes       |       TEST                                  | string   |
| onCompleted      | Callback that triggers when webview close or cancels                                                                                 | Yes      |                                         | Function |
| splitAccounts       | ISW Split accounts for settlements                                                                              | No      |      `SplitAccounts[]`                                   | Array |
| onWebMessage   | Callback to handle web view message event                                                                                            | no       |                                         | Function |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
