import type { GetHtmlInputsFields } from './types';

export const getHtmlInputsFields = ({
  customer,
  merchantCode,
  currency,
  mode,
  accessToken,
  amount,
  payItem,
  redirectUrl,
  splitAccounts,
  tokenizeCard,
  transactionReference,
}: GetHtmlInputsFields) => {
  const iswTxReference = `<input name="txn_ref" value=${transactionReference} />`;
  const siteRedirectUrl = `<input name="site_redirect_url" value=${redirectUrl} />`;
  const customerName = customer?.name
    ? `<input name="cust_name" value=${customer?.name} />`
    : '';
  const phoneNumber = customer?.phoneNumber
    ? `<input name="cust_mobile_no" value=${customer?.phoneNumber} />`
    : '';
  const email = customer?.email
    ? `<input name="cust_email" value=${customer?.email} />`
    : '';
  const amountInKobo = `<input name="amount" value=${amount} />`;
  const iswMerchantCode = merchantCode
    ? `<input name="merchant_code" value=${merchantCode} />`
    : '';
  const amountCurrency = `<input name="currency" value=${currency} />`;
  const payItemId = payItem.id
    ? `<input name="pay_item_id" value=${payItem.id} />`
    : '';
  const payItemName = payItem.name
    ? `<input name="pay_item_name" value=${payItem.name} />`
    : '';
  const payMode = `<input name="mode" value=${mode} />`;
  const iswAccessCode = accessToken
    ? `<input name="access_token" value=${accessToken} />`
    : '';
  const iswTokenizeCard = tokenizeCard
    ? `<input name="tokenise_card" value=${tokenizeCard} />`
    : '';
  const iswSplitAccounts = splitAccounts
    ? `<input name="split_accounts" value=${JSON.stringify(splitAccounts)} />`
    : '';
  const htmlInputs = [
    iswTxReference,
    customerName,
    phoneNumber,
    email,
    amountInKobo,
    iswMerchantCode,
    amountCurrency,
    payItemId,
    payItemName,
    payMode,
    siteRedirectUrl,
    iswAccessCode,
    iswSplitAccounts,
    iswTokenizeCard,
  ].join('');

  return htmlInputs;
};

export const getWebCheckoutHtmlContent = (
  checkoutUrl: string,
  inputs: string
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  </head>
  <body style="background-color:transparent;height:100vh">
  <div style="display: flex; justify-content: center; align-items: center; margin: auto;"><p style="text-align: center;">Please wait....</p></div>
  <div>
  <form
  id="myForm" 
  hidden
  method="post"
  action=${checkoutUrl}>
  ${inputs}
  <input type="submit" value="Make Payment" />
  </form>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('myForm').submit();
    });
  </script>
  </body>
  </html>
  `;
};
