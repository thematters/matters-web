import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment HeaderArticle on Article {
      id
      campaigns {
        campaign {
          id
          shortHash
          ... on WritingChallenge {
            id
            nameZhHant: name(input: { language: zh_hant })
            nameZhHans: name(input: { language: zh_hans })
            nameEn: name(input: { language: en })
          }
        }
        stage {
          id
          nameZhHant: name(input: { language: zh_hant })
          nameZhHans: name(input: { language: zh_hans })
          nameEn: name(input: { language: en })
        }
      }
    }
  `,
}
