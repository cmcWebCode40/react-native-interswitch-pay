import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  WebView,
  type WebViewNavigation,
  type WebViewMessageEvent,
} from 'react-native-webview';
import type { IswPaymentWebViewProps, IswWebViewRefMethods } from './types';
import { getHtmlInputsFields, getWebCheckoutHtmlContent } from './utils';
import { BackDrop } from './Backdrop';
import { StyleSheet } from 'react-native';

const DefaultRedirectUrl = 'https://newwebpay.interswitchng.com/';

const IswPaymentWebView: React.ForwardRefRenderFunction<
  IswWebViewRefMethods,
  IswPaymentWebViewProps
> = (
  {
    mode,
    onCompleted,
    payItem,
    accessToken,
    merchantCode,
    amount,
    customer,
    autoStart,
    onWebMessage,
    checkoutUrl,
    tokenizeCard,
    splitAccounts,
    currency = 566,
    transactionReference,
    redirectUrl = DefaultRedirectUrl,
  },
  ref
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    if (autoStart) {
      setOpenModal(true);
    }
  }, [autoStart]);

  useImperativeHandle(ref, () => ({
    start() {
      setOpenModal(true);
    },
    end() {
      setOpenModal(false);
    },
  }));

  const inputs = getHtmlInputsFields({
    mode,
    payItem,
    amount,
    currency,
    accessToken,
    customer,
    merchantCode,
    tokenizeCard,
    redirectUrl,
    splitAccounts,
    transactionReference,
  });

  const htmlContent = getWebCheckoutHtmlContent(checkoutUrl, inputs);

  const onMessageHandler = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent?.data;
    const webResponse = JSON.parse(data);
    if (onWebMessage) {
      onWebMessage(webResponse);
    }
  };

  const handleNavigationStateChange = (state: WebViewNavigation) => {
    if (state.url === redirectUrl) {
      onCompleted();
    }
  };

  return (
    <>
      {openModal ? (
        <WebView
          ref={webViewRef}
          cacheMode={'LOAD_DEFAULT'}
          onMessage={onMessageHandler}
          source={{ html: htmlContent }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
          }}
          style={[style.flex]}
          onNavigationStateChange={handleNavigationStateChange}
        />
      ) : null}
      <BackDrop isLoading={isLoading} />
    </>
  );
};
export default forwardRef(IswPaymentWebView);

const style = StyleSheet.create({
  flex: {
    flex: 1,
    marginTop: 24,
  },
});
