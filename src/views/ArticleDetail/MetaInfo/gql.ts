import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment MetaInfoArticle on Article {
      id
      access {
        type
      }
      language
      slug
      shortHash
      revisionCount
      revisedAt
      createdAt
      author {
        id
        userName
      }
      campaigns {
        campaign {
          id
          shortHash
          ... on WritingChallenge {
            nameZhHant: name(input: { language: zh_hant })
            nameZhHans: name(input: { language: zh_hans })
            nameEn: name(input: { language: en })
          }
        }
      }
    }
  `,
  articleVersion: gql`
    fragment MetaInfoArticleVersion on ArticleVersion {
      id
      createdAt
    }
  `,
}
