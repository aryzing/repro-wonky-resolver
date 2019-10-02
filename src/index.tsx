import React from 'react';
import { render } from 'react-dom';

import { App } from './containers/App';

declare global {
  interface Window {
    nextResolverValues: string[];
    runningResolverForFirstTime: boolean;
  }
}

window.nextResolverValues = ['a', 'b', 'c', 'd'];
window.runningResolverForFirstTime = true;

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
