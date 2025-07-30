import gql from 'graphql-tag'

import { CircleDigest } from '~/components'
import SelectCampaign from '~/components/Editor/SelectCampaign'
import articleFragments from '~/components/GQL/fragments/article'
import assetFragment from '~/components/GQL/fragments/asset'
import { ArticleTag } from '~/components/Tag'

export const GET_EDIT_ARTICLE = gql`
  query QueryEditArticle(
    $shortHash: String!
    $after: String
    $first: first_Int_min_0 = null
  ) {
    article(input: { shortHash: $shortHash }) {
      id
      title
      slug
      shortHash
      cover
      contents {
        html
      }
      summary
      summaryCustomized
      createdAt
      assets {
        ...Asset
      }
      tags {
        ...DigestTag
      }
      author {
        id
        ownCircles {
          ...DigestRichCirclePublic
        }
        campaigns(input: { first: null }) {
          edges {
            node {
              id
              ...EditorSelectCampaign
            }
          }
        }
        displayName
        avatar
        userName
        isBlocking
      }
      access {
        type
        circle {
          id
          ...DigestRichCirclePublic
        }
      }
      canComment
      indentFirstLine
      license
      sensitiveByAuthor
      requestForDonation
      replyToDonator
      revisionCount
      versions(input: { first: 1 }) {
        edges {
          node {
            id
          }
        }
      }
      campaigns {
        campaign {
          id
          ... on WritingChallenge {
            announcements {
              id
            }
          }
        }
        stage {
          id
        }
      }
      collections(input: { first: null }) {
        edges {
          node {
            id
            title
            articles(input: { first: 0 }) {
              totalCount
            }
          }
        }
      }
      ...ArticleConnections
    }
  }
  ${assetFragment}
  ${ArticleTag.fragments.tag}
  ${articleFragments.articleConnections}
  ${CircleDigest.Rich.fragments.circle.public}
  ${SelectCampaign.fragments}
`

export const GET_EDIT_ARTICLE_ASSETS = gql`
  query QueryEditArticleAssets($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        assets {
          ...Asset
        }
      }
    }
  }
  ${assetFragment}
`
