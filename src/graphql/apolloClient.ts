// Core
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const cache = new InMemoryCache();

// init cache
cache.writeData({
  data: {
    inputValue: '',
    iShouldBeInCache: 'foobar yes',
  },
});

const pop2ndLastItem = (arr: string[]): string[] => {
  if (arr.length > 2) {
    arr.splice(arr.length - 2, 1);
    return arr;
  }

  // if `arr` too short, just return `arr`
  return arr;
};

const resolvers = {
  Query: {
    // NOTE: ################ This is where the magic happens ################
    // The returned array is incorrectly written to the cache. Seems some sort
    // of merging behaviour is going on.
    wonkyResolver(_parent: any, { uselessId }: any): string[] {
      // including `uselessId` b/c, despite being useless, the resolver that's
      // displaying the buggy behavior in my code has one too -- just being
      // thorough.
      console.log('Inside wonkyResolver, uselessId:', uselessId);

      if (window.runningResolverForFirstTime) {
        window.runningResolverForFirstTime = false;
        return window.nextResolverValues;
      }

      let tempArray = [...window.nextResolverValues];
      tempArray = pop2ndLastItem(tempArray);

      window.nextResolverValues = tempArray;
      console.log('Resolver return value:', tempArray);
      return tempArray;
    },
  },
};

export const client = new ApolloClient({
  uri: 'http://localhost:4000/query',
  cache,
  resolvers,
});
