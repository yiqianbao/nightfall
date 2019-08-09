
module.exports = {
  extends: ['codfish', 'codfish/docker', 'codfish/dapp'],
  root: true,
  env: {
    node: true,
  },
  rules: {
    'no-console': 'off',
    'space-before-function-paren': ['error', {
      'asyncArrow': 'always',
      'anonymous': 'never',
      'named': 'never'
    }],
    'func-names': ['error', 'as-needed'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': 'error',
    'no-extra-semi': 'error',
    'indent': ['error', 2, { "SwitchCase": 1 }],
    'func-names': ['error', 'as-needed']
  },
};
