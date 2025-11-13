import gql from 'graphql-tag'

export const fragments = {
  article: gql`
    fragment ToggleSpamArticle on Article {
      id
      oss {
        spamStatus {
          isSpam
        }
      }
    }
  `,
  comment: gql`
    fragment ToggleSpamComment on Comment {
      id
      spamStatus {
        isSpam
      }
    }
  `,
  moment: gql`
    fragment ToggleSpamMoment on Moment {
      id
      spamStatus {
        isSpam
      }
    }
  `,
}

export const TOGGLE_SPAM = gql`
  mutation ToggleSpam($id: ID!, $isSpam: Boolean!) {
    setSpamStatus(input: { id: $id, isSpam: $isSpam }) {
      ... on Article {
        ...ToggleSpamArticle
      }
      ... on Comment {
        ...ToggleSpamComment
      }
      ... on Moment {
        ...ToggleSpamMoment
      }
    }
  }
  ${fragments.article}
  ${fragments.comment}
  ${fragments.moment}
`

export const FETCH_ARTICLE_SPAM_STATUS = gql`
  query FetchArticleSpamStatus($shortHash: String!) {
    article(input: { shortHash: $shortHash }) {
      ...ToggleSpamArticle
    }
  }
  ${fragments.article}
`

export const FETCH_COMMENT_SPAM_STATUS = gql`
  query FetchCommentSpamStatus($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        ...ToggleSpamComment
      }
    }
  }
  ${fragments.comment}
`

export const FETCH_MOMENT_SPAM_STATUS = gql`
  query FetchMomentSpamStatus($id: ID!) {
    node(input: { id: $id }) {
      ... on Moment {
        ...ToggleSpamMoment
      }
    }
  }
  ${fragments.moment}
`
