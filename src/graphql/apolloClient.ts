// Core
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { INPUT_VALUE_QUERY } from '../containers/App';

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
    const arrCopy = [...arr];
    // delete second last item
    arrCopy.splice(arr.length - 2, 1);
    return arrCopy;
  }

  // if `arr` to short, just return `arr`
  return arr;
};

const resolvers = {
  Query: {
    // NOTE: ################ This is where the magic happens ################
    // If this resolver is sync, all works fine and as expected (try removing
    // the async keyowrd and you'll get expected behaviour).
    // When this resolver is **`async`**, weird things start to happen. The
    // returned array is incorrectly written to the cache. Seems some sort of
    // merging behaviour is going on.
    async wonkyResolver(_parent: any, { uselessId }: any): Promise<string[]> {
      // including `uselessId` b/c, despite being useless, the resolver that's
      // displaying the buggy behavior in my code has one too -- just being
      // thorough.
      console.log('Inside wonkyResolver, uselessId:', uselessId);

      if (window.runningResolverForFirstTime) {
        window.runningResolverForFirstTime = false;
        return window.nextResolverValues;
      }

      let tempArray = window.nextResolverValues;
      tempArray = pop2ndLastItem(tempArray);

      window.nextResolverValues = tempArray;
      return tempArray;
    },
    inputValue(_parent: any, _args: any, { cache }: any): string {
      console.log('Inside inputValue');

      const res = cache.readQuery({
        query: INPUT_VALUE_QUERY,
      });

      if (res) {
        return res.inputValue;
      }

      return '';
    },
  },
  Mutation: {
    setInputValue(_parent: any, { value }: any, { client }: any): string {
      console.log('Inside setInputValue');
      client.writeQuery({
        query: INPUT_VALUE_QUERY,
        data: {
          inputValue: value,
        },
      });
      return value;
    },
  },
};

export const client = new ApolloClient({
  uri: 'http://localhost:4000/query',
  cache,
  resolvers,
});
