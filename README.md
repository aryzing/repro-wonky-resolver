# repro-wonky-resolver

## Getting started

```
yarn
yarn dev
```

## Buggy behaviour

**Intended outcome:**
Data returned from a @client resolver should be written into the cache rather than merged with previous results.

Specifically, I'm returning an array of strings. 

**Actual outcome:**
The last item of the array will start to get duplicated when the resolver returns less items. For example, on the initial resolver run, returns full array:

* `return ['a', 'b', 'c', 'd'] // return value of resolver`
* value saved to cache: `['a', 'b', 'c', 'd']`

Next run, item `'c'` is omitted

* `return ['a', 'b', 'd']`
* value saved to cache: `['a', 'b', 'd', 'd']`

Next run, item `'b'` is omitted

* `return ['a', 'd']`
* value saved to cache: `['a', 'd', 'd', 'd']`

**How to reproduce the issue:**
<!--
If possible, please create a reproduction using https://github.com/apollographql/react-apollo-error-template and link to it here. If you prefer an in-browser way to create reproduction, try: https://codesandbox.io/s/github/apollographql/react-apollo-error-template

Instructions for how the issue can be reproduced by a maintainer or contributor. Be as specific as possible, and only mention what is necessary to reproduce the bug. If possible, try to isolate the exact circumstances in which the bug occurs and avoid speculation over what the cause might be.
-->

**Versions**
<!--
Run the following command in your project directory, and paste its (automatically copied to clipboard) results here:

`npx envinfo@latest --preset apollo --clipboard`
-->
