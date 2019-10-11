import React, { useState, FunctionComponent } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface InnerAppProps {
  number: number;
  setNumber(n: number): void;
}

const WONKY_QUERY = gql`
  query Wonky($uselessId: ID!) {
    wonkyResolver(uselessId: $uselessId) @client
  }
`;

export const GET_INPUT_VALUE_QUERY = gql`
  query GetInputValue {
    getInputValue @client
  }
`;

const INPUT_MUTATION = gql`
  mutation Input($value: String!) {
    setInputValue(value: $value) @client
  }
`;

export const InnerApp: FunctionComponent<InnerAppProps> = ({
  number,
  setNumber,
}) => {
  console.log('InnerApp');
  const {
    loading: wonkyLoading,
    error: wonkyError,
    data: wonkyData,
  } = useQuery(WONKY_QUERY, {
    variables: {
      uselessId: `mock-id-${number}`,
      // uselessId: `mock-id-static`,
    },
    // fetchPolicy: 'no-cache',
  });
  const {
    loading: inputQueryLoading,
    error: inputQueryError,
    data: inputQueryData,
  } = useQuery(GET_INPUT_VALUE_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const [
    setInputValue,
    { loading: inputLoading, error: inputError, data: inputData },
  ] = useMutation(INPUT_MUTATION);

  if (wonkyLoading || inputLoading || inputQueryLoading) {
    return <div>Loading...</div>;
  }

  if (wonkyError || inputError || inputQueryError) {
    return (
      <div>
        <pre>{JSON.stringify(wonkyError)}</pre>
        <pre>{JSON.stringify(inputError)}</pre>
        <pre>{JSON.stringify(inputQueryError)}</pre>
      </div>
    );
  }

  if (wonkyData && inputQueryData) {
    return (
      <div>
        <div>
          <input
            value={inputQueryData.getInputValue}
            onChange={(e): void => {
              setInputValue({ variables: { value: e.target.value } });
            }}
          />
        </div>
        <div>
          <pre>{JSON.stringify(wonkyData.wonkyResolver)}</pre>
        </div>
        <div>
          <button
            onClick={(): void => {
              const nextNumber = number < 3 ? number + 1 : 0;
              setNumber(nextNumber);
            }}
          >
            Random!
          </button>
          <span>{number}</span>
        </div>
      </div>
    );
  }

  return <div>Oops, something went wrong.</div>;
};

export const App: FunctionComponent = () => {
  const [number, setNumber] = useState(0);
  console.log('App');
  return <InnerApp number={number} setNumber={setNumber} />;
};
