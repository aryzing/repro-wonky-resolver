# repro-wonky-resolver

## Getting started

```
yarn
yarn dev
```

## Buggy behaviour

**Intended outcome:**
Data returned from a @client async resolver should be written into the cache rather than merged with previous results.

Specifically, I'm returning an array of strings. 

**Actual outcome:**
The last items of the array will start to get duplicated when the same queries are run (same query + same query variables) while the resolver is returning less items in the array. The resolver returns less items than those being written (or merged into?) to the cache. Try running this repo to see what happens.

**How to reproduce the issue:**
Create a resolver. When running a resolver with `@client(always: true)` with a previously seen query (query name + same variables), the results from the resolver will get writtin into the cache in an unexpected "merged" way.

**Versions**

Node: v11.12.0

Check [package.json](./package.json).
