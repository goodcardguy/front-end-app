import React, { useEffect, useState } from 'react';

import Note from 'plaid-threads/Note';
import { Button } from '@/components/ui/button';

import Table from '../Table';
import Error from '../Error';
import { DataItem, Categories, ErrorDataItem, Data } from '../../dataUtilities';

import { useContext } from 'react';
import Context from '../../Context';

interface Props {
  user_id?: string | null;
  endpoint: string;
  name?: string;
  categories: Array<Categories>;
  schema: string;
  description: string;
  transformData: (arg: any) => Array<DataItem>;
}

const Endpoint = (props: Props) => {
  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user_id, linkSuccess } = useContext(Context);

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/plaid/${props.endpoint}`, {
      method: 'POST',
      body: JSON.stringify({ user_id: props.user_id })
    });
    const data = await response.json();
    console.log('test', data);
    if (data.error != null || !data || !data.latest_transactions) {
      setError(data.error);
      setIsLoading(false);
      return;
    }
    setTransformedData(props.transformData(data)); // transform data into proper format for each individual product
    if (data.pdf != null) {
      setPdf(data.pdf);
    }
    setShowTable(true);
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, [user_id]);

  return (
    <>
      <div className="relative grid justify-items-end">
        {linkSuccess && (
          <div className="">
            <Button onClick={getData}>
              {isLoading ? 'Loading...' : `Refresh Transactions`}
            </Button>
          </div>
        )}
      </div>
      {showTable && transformedData && (
        <Table
          categories={props.categories}
          data={transformedData}
          isIdentity={props.endpoint === 'identity'}
        />
      )}
      {error != null && <Error error={error} />}
    </>
  );
};

Endpoint.displayName = 'Endpoint';

export default Endpoint;
