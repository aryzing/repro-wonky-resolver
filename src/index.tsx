import React from 'react';
import { render } from 'react-dom';
import { App } from './containers/App';

import { client } from './graphql/apolloClient';
import { ApolloProvider } from '@apollo/react-hoc';

declare global {
  interface Window {
    nextResolverValues: string[];
    runningResolverForFirstTime: boolean;
  }
}

window.nextResolverValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
window.runningResolverForFirstTime = true;

const AppWithProviders = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(AppWithProviders, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
