import React, { useEffect, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from "plaid-threads/Button";

import Context from "../../Context";
import { redirect } from "next/navigation";

const Link = () => {
  const { user_id, linkToken, isPaymentInitiation, isCraProductsExclusively, dispatch } =
    useContext(Context);

    console.log({ linkToken, isPaymentInitiation, isCraProductsExclusively, dispatch })

  const onSuccess = React.useCallback(
    (public_token: string) => {
      // If the access_token is needed, send public_token to server
      console.log("public token",public_token)
      // public-sandbox-948c8c02-0673-4913-99af-dd02cf8469ae
      const exchangePublicTokenForAccessToken = async () => {
        const response = await fetch("/api/plaid/set_access_token", {
          method: "POST",
          headers: {
          },
          body: JSON.stringify({ public_token: public_token, user_id:user_id }),
        });
        if (!response.ok) {
          dispatch({
            type: "SET_STATE",
            state: {
              itemId: `no item_id retrieved`,
              accessToken: `no access_token retrieved`,
              isItemAccess: false,
            },
          });
          return;
        }
        const data = await response.json();
        dispatch({
          type: "SET_STATE",
          state: {
            itemId: data.item_id,
            accessToken: data.access_token,
            isItemAccess: true,
          },
        });
      };

      // 'payment_initiation' products do not require the public_token to be exchanged for an access_token.
      if (isPaymentInitiation) {
        dispatch({ type: "SET_STATE", state: { isItemAccess: false } });
      } else if (isCraProductsExclusively) {
        // When only CRA products are enabled, only user_token is needed. access_token/public_token exchange is not needed.
        dispatch({ type: "SET_STATE", state: { isItemAccess: false } });
      } else {
        exchangePublicTokenForAccessToken();
      }

      dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
      // redirect("/");
    },
    [dispatch, isPaymentInitiation, isCraProductsExclusively]
  );

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };
  console.log("config",config)

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);
  console.log('ready',ready)

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <Button type="button" onClick={() => open()} disabled={!ready}>
      Link Plaid to Get Started
    </Button>
  );
};

Link.displayName = "Link";

export default Link;
