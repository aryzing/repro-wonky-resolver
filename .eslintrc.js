module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    // TODO:327ae883-af26-48a7-8e1c-23439e0dfbbb
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. '@typescript-eslint/explicit-function-return-type': 'off',

    // We're using TypeScript
    'react/prop-types': 0,

    // GraphQL rules
    'graphql/template-strings': ['error', {
      env: 'apollo',
      schemaJson: require('./schema.json'),
    }],
    'graphql/named-operations': ['error', {
      schemaJson: require('./schema.json'),
    }],
    'graphql/capitalized-type-name': ['error', {
      schemaJson: require('./schema.json'),
    }],
    'graphql/no-deprecated-fields': [
      'error',
      {
        schemaJson: require('./schema.json'),
      },
    ],
  },
  plugins: [
    'graphql'
  ],
  settings: {
    react: {
      version: 'detect'     , // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
