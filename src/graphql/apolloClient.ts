// Core
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import { GET_INPUT_VALUE_QUERY } from '../containers/App';

const cache = new InMemoryCache();

// init cache
cache.writeData({
  data: {
    getInputValue: '',
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
    wonkyResolver(_parent: any, { uselessId }: any): string[] {
      // including id b/c, despite being useless, b/c resolver that's
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
    getInputValue(_parent: any, _args: any, { cache }: any): string {
      console.log('Inside getInputValue');

      const res = cache.readQuery({
        query: GET_INPUT_VALUE_QUERY,
      });

      if (res) {
        return res.getInputValue;
      }

      return '';
    },
  },
  Mutation: {
    setInputValue(_parent: any, { value }: any, { client }: any): string {
      console.log('Inside setInputValue');
      client.writeQuery({
        query: GetInputValueDocument,
        data: {
          getInputValue: value,
        },
      });
      return value;
    },
  },
};

const typeDefs = gql`
  extend type Query {
    wonkyResolver(uselessId: ID!): [ID!]!
    getInputValue: String!
  }

  extend type Mutation {
    setInputValue(value: String!): String!
  }
`;

export const client = new ApolloClient({
  uri: 'http://localhost:4000/query',
  cache,
  resolvers,
  typeDefs,
});
