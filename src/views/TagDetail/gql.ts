import gql from 'graphql-tag'

import { TagBookmarkButton } from '~/components'

const tagFragment = gql`
  fragment TagFragment on Tag {
    id
    content
    numArticles
    selectedArticles: articles(input: { first: 0 }) {
      totalCount
    }
    ...TagBookmarkButtonTagPrivate
    hottestArticles: articles(input: { first: 0, sortBy: byHottestDesc }) {
      totalCount
    }
    recommended(input: { first: 10 }) {
      edges {
        cursor
        node {
          id
          content
          numArticles
        }
      }
    }
  }
  ${TagBookmarkButton.fragments.tag.private}
`

export const TAG_DETAIL_PUBLIC = gql`
  query TagDetailPublic($id: ID!) {
    node(input: { id: $id }) {
      ...TagFragment
    }
  }
  ${tagFragment}
`

export const TAG_DETAIL_BY_SEARCH = gql`
  query TagDetailPublicBySearch($key: String!) {
    search(input: { type: Tag, key: $key, first: 1 }) {
      totalCount
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ...TagFragment
        }
      }
    }
  }
  ${tagFragment}
`

export const TAG_DETAIL_PRIVATE = gql`
  query TagDetailPrivate($id: ID!) {
    node(input: { id: $id }) {
      ... on Tag {
        id
        ...TagBookmarkButtonTagPrivate
      }
    }
  }
  ${TagBookmarkButton.fragments.tag.private}
`
