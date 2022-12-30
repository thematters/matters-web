import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    'https://server-develop.matters.news/graphql',
    './src/common/utils/types/index.ts',
  ],
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    'src/gql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
  hooks: { afterOneFileWrite: ['eslint --fix'] },
}

export default config
