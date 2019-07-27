module.exports = {
  client: {
    name: 'Matters Web',
    service: {
      name: 'matters',
      url: 'https://server-develop.matters.news/graphql'
    },
    includes: [
      '+(pages|views|components)/**/*.{ts,tsx}',
      './common/utils/types/**/*.ts'
    ]
  }
}
