'use client';
import React, { useContext } from 'react';

import Endpoint from '../Endpoint';
import Context from '../../Context';
import {
  transactionsCategories,
  transformTransactionsData
} from '../../dataUtilities';

const Products = ({ user_id: _user_id }: { user_id?: string }) => {
  const { user_id, products, isCraProductsExclusively } = useContext(Context);
  // console.log("testing",user_id)
  // console.log("testing",_user_id)
  return (
    // <ProductTypesContainer productType="Products">

    <div className="">
      <Endpoint
        endpoint="transactions"
        name="Transactions"
        categories={transactionsCategories}
        schema="/transactions/sync/"
        description="Retrieve transactions or incremental updates for credit and depository accounts."
        transformData={transformTransactionsData}
        user_id={user_id || _user_id}
      />

      {/* {products.includes("assets") && (
        <Endpoint
          endpoint="assets"
          name="Assets"
          categories={assetsCategories}
          schema="/asset_report/get/"
          description="Create and retrieve assets information an asset report"
          transformData={transformAssetsData}
          user_id={user_id}
        />
      )} */}

      {/* // </ProductTypesContainer> */}
    </div>
  );
};

Products.displayName = 'Products';

export default Products;
