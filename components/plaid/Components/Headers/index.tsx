import React, { useContext } from 'react';
import Callout from 'plaid-threads/Callout';
import Button from 'plaid-threads/Button';
import InlineLink from 'plaid-threads/InlineLink';

import Link from '../Link';
import Context from '../../Context';

const PlaidModal = () => {
  const {
    itemId,
    accessToken,
    userToken,
    linkToken,
    linkSuccess,
    isItemAccess,
    backend,
    linkTokenError,
    isPaymentInitiation
  } = useContext(Context);

  return !linkSuccess ? (
    // return true ? (
    <div className="grid justify-items-center ">
      <div className="">
        {/* <div>
          <p>Connecting to your information...</p>
        </div> */}

        <>
          {/* message if backend is not running and there is no link token */}
          {!backend ? (
            <Callout warning>Unable to fetch link_token</Callout>
          ) : /* message if backend is running and there is no link token */
          linkToken == null && backend ? (
            <Callout warning>
              <div>Unable to fetch link_token</div>

              <div>
                Error Code: <code>{linkTokenError.error_code}</code>
              </div>
              <div>
                Error Type: <code>{linkTokenError.error_type}</code>{' '}
              </div>
              <div>Error Message: {linkTokenError.error_message}</div>
            </Callout>
          ) : linkToken === '' ? (
            <div className="">
              <Button disabled>
                Loading...
              </Button>
            </div>
          ) : (
            <div className="">
              <Link />
            </div>
          )}
        </>
      </div>
    </div>
  ) : (
    <></>
  );
};

PlaidModal.displayName = 'Header';

export default PlaidModal;
