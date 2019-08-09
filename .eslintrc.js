module.exports = {
  extends: ['codfish', 'codfish/docker', 'codfish/dapp'],
  root: true,
  env: {
    node: true,
  },
  rules: {
    'no-console': 'off',
  }
};
