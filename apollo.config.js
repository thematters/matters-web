module.exports = {
  client: {
    name: 'Matters Web',
    service: {
      name: 'matters',
      localSchemaFile: './schema.json'
    },
    includes: [
      '+(pages|views|components)/**/*.{ts,tsx}',
      './common/utils/types/**/*.ts'
    ]
  }
}
