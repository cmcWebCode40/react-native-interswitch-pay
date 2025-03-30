import type { ColorValue } from 'react-native';

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

export type GetHtmlInputsFields = Omit<
  IswPaymentWebViewProps,
  'onCompleted' | 'onWebMessage' | 'autoStart' | 'checkoutUrl'
>;

export interface IswPaymentWebViewProps {
  /**
   * Customer information e.g email, first name, last name
   */
  customer?: IswCustomer;
  /**
   * Flag to indicate whether you want the customer's card to be tokenized, a tokenized value would be returned when you requery to confrim the transaction status
   */
  tokenizeCard?: 'true' | 'false';
  /**
   * Payment Item
   */
  payItem: IswPayItem;

  /**
   *  Merchant's website redirect url
   */
  redirectUrl?: string;

  /**
   * transaction reference
   */
  transactionReference?: string;

  /**
   * ISW merchant code
   */
  merchantCode?: string;
  /**
   * Cost of the item you want your customer to pay
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
  onCompleted: <T = object>(response?: T) => void;

  /**
   * callback to handle web view message event
   */
  onWebMessage?: (data: string) => void;

  /**
   * Access token value gotten from passport
   */
  accessToken?: 'true' | 'false';

  /**
   * ISO currency code
   */
  currency: number | string;
  /**
   * The mode of the payment
   */
  mode: 'TEST' | 'LIVE';
  /**
   * Indicator Color
   */
  indicatorColor?: ColorValue;

  /**
   * ISW webchkout url
   */
  checkoutUrl: string;

  /**
   * ISW Split accounts for settlements
   */
  splitAccounts?: SplitAccounts[];
}

export type IswTestMode = 'TEST' | 'LIVE';

export type SplitAccounts = {
  alias: string;
  amount: number;
  description: string;
  isPrimary: boolean;
};
