import React, { ReactNode } from 'react';
import { useWonkyQuery } from '../graphql/generated/react';

export const App = (): ReactNode => {
  const { loading, error, data } = useWonkyQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <pre>{error}</pre>
      </div>
    );
  }

  if (data) {
    return (
      <div>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    );
  }

  return null;
};
