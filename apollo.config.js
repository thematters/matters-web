module.exports = {
  client: {
    name: 'Matters Web',
    service: {
      name: 'matters',
      url:
        'http://matters-server-develop.ap-southeast-1.elasticbeanstalk.com/graphql',
    },
    includes: ['src/**/*.{ts,tsx}'],
  },
};
