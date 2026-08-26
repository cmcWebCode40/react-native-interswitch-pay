import type {
  ColorValue,
  ModalProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { WebViewProps } from 'react-native-webview';

export type IswCustomer = {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
};

export type IswPayItem = {
  id: string;
  name?: string;
};

export type IswWebViewRefMethods = {
  start: () => void;
  end: () => void;
};

export type GetHtmlInputsFields = Pick<
  IswPaymentWebViewProps,
  | 'customer'
  | 'tokeniseCard'
  | 'payItem'
  | 'trnxRef'
  | 'merchantCode'
  | 'amount'
  | 'accessToken'
  | 'currency'
  | 'mode'
  | 'splitAccounts'
  | 'siteRedirectUrl'
>;

export interface IswPaymentWebViewProps<T = {}> {
  /**
   * Customer information e.g email, first name, last name
   */
  customer?: IswCustomer;
  /**
   * Flag to indicate whether you want the customer's card to be tokenized, a tokenized value would be returned when you re-query to confirm the transaction status
   */
  tokeniseCard?: 'true' | 'false';
  /**
   * Payment Item
   */
  payItem: IswPayItem;

  /**
   * transaction reference
   */
  trnxRef?: string;

  /**
   * ISW merchant code
   */
  merchantCode: string;
  /**
   * Cost of the item you want your customer to pay in Kobo. (Your amount * 100)
   */
  amount: number | string;

  /**
   * to auto initialize transaction
   */
  autoStart?: boolean;

  /**
   * The callback function that returns the state of a transaction.
   *
   */
  onCompleted: (response: WebCheckoutPayResponse & T) => void;

  /**
   * Optional callback for WebView / initialization errors forwarded from the payment HTML.
   */
  onError?: (error: { error: string }) => void;

  /**
   * Access token value gotten from passport
   */
  accessToken?: 'true' | 'false';

  /**
   * ISO currency code
   */
  currency?: number | string;
  /**
   * The mode of the payment
   */
  mode: 'TEST' | 'LIVE';
  /**
   * Indicator Color
   */
  indicatorColor?: ColorValue;

  /**
   * ISW Split accounts for settlements
   */
  splitAccounts?: SplitAccounts[];

  /**
   * Custom back button
   */
  backButton?: React.ReactNode;

  /**
   * Custom WebView component  style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Show backdrop
   */
  showBackdrop?: boolean;

  /**
   * Custom  loading Text
   */
  loadingText?: string;
  /**
   * Custom web pay base URL. Falls back to the hosted Interswitch checkout URL when not provided.
   */
  webPayBaseUrl?: string;

  /**
   * Sit Redirect URL
   */
  siteRedirectUrl?: string;

  /**
   * Provide your own checkout page HTML instead of loading the hosted checkout URL, to avoid
   * depending on it. Receives the resolved payment params and must return a full HTML document
   * string; when set, this takes precedence over `webPayBaseUrl`.
   */
  getHtml?: (params: GetHtmlInputsFields) => string;

  /**
   * Custom style for the loading indicator's container, shown while the WebView initializes.
   */
  loaderContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for the loading indicator's text.
   */
  loaderTextStyle?: StyleProp<TextStyle>;

  /**
   * Additional props passed through to the underlying Modal component (e.g. `animationType`,
   * `transparent`, `presentationStyle`, `statusBarTranslucent`).
   */
  modalProps?: Omit<ModalProps, 'visible' | 'children'>;

  /**
   * Additional props passed through to the underlying WebView component. Useful when providing
   * your own checkout page via `getHtml` and you need to customize WebView behavior (e.g.
   * `injectedJavaScript`, `originWhitelist`, `allowFileAccess`).
   */
  webViewProps?: Omit<
    WebViewProps,
    | 'source'
    | 'ref'
    | 'onMessage'
    | 'style'
    | 'onLoadStart'
    | 'onLoadEnd'
    | 'onError'
  >;
}

export type IswTestMode = 'TEST' | 'LIVE';

export type SplitAccounts = {
  alias: string;
  amount?: number;
  description: string;
  percentage?: string;
  isPrimary?: boolean | string;
};

export interface WebCheckoutPayResponse {
  payRef: string;
  txnref?: string;
  amount: number | string;
  apprAmt: number | string;
  resp: string;
  desc?: string;
  retRef: string;
  cardNum: string;
  mac: string;
}
