import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    process.env.GRAPHQL_SCHEMA_URL as string,
    './src/common/utils/types/index.ts',
  ],
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    'src/gql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
    'src/gql/mergeables.ts': {
      plugins: [
        './bin/generateMergeableTypes.js'
      ],
    },
  },
}

export default config
