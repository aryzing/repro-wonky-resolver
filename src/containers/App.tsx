import React, { useState, FunctionComponent } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface InnerAppProps {
  number: number;
  setNumber(n: number): void;
}

const WONKY_QUERY = gql`
  query Wonky($uselessId: ID!) {
    wonkyResolver(uselessId: $uselessId) @client(always: true)
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

  if (wonkyLoading) {
    return <div>Loading...</div>;
  }

  if (wonkyError) {
    return (
      <div>
        <pre>{JSON.stringify(wonkyError)}</pre>
      </div>
    );
  }

  if (wonkyData) {
    return (
      <div>
        <h2>Click the button to re-render this component</h2>
        <p>
          Every time the button is clicked, the state is changed (
          <code>useState</code>) and the component re-renders.
        </p>
        <p>
          On each render, the <code>wonkyResolver</code> runs b/c the query we
          have in place has an <code>@client(always: true)</code> directive.
        </p>
        <p>
          When the <code>wonkyResolver</code> is declard as <code>async</code>,
          the array below gets messd up.
        </p>
        <p>
          The purpose of <code>wonkyResolver</code> is to remove the second last
          item from the array. The logic in this component cycles around this
          behavior four times before a query with previously seen variables is
          run (<code>{'nextNumber = number < 3 ? number + 1 : 0'}</code>).
        </p>
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
            Click me!
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
