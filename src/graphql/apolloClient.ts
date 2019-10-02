// Core
import ApolloClient, {
  InMemoryCache,
  Resolvers as ApolloResolvers,
} from 'apollo-boost';

const cache = new InMemoryCache();

const pop2ndLastItem = (arr: string[]): string[] => {
  if (arr.length > 2) {
    let arrCopy = [...arr]
    // delete second last item
    arrCopy = arr.splice(arr.length - 2, 1)
    return arrCopy

  }
  
  // if `arr` to short, just return `arr`
  return arr
}

const resolvers: Resolvers<{
  cache: typeof cache;
  client: ApolloClient<typeof cache>;
}> = {
  Query: {
    async wonkyResolver(
      _,
      { uselessId },
      { cache, client },
    ): Promise<Query['wonkyResolver']> {

      if (window.runningResolverForFirstTime) {
        window.runningResolverForFirstTime = false;
        return window.nextResolverValues;
      }

      let tempArray = window.nextResolverValues
      tempArray = pop2ndLastItem(tempArray)

      window.nextResolverValues = tempArray
      return tempArray
  },
};

const typedResolvers = resolvers as ApolloResolvers;

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_API_URI,
  cache,
  resolvers: typedResolvers,
  typeDefs: undefined,
});
