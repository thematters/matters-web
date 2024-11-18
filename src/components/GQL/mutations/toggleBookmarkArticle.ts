import gql from 'graphql-tag'

export default gql`
  mutation ToggleBookmarkArticle($id: ID!, $enabled: Boolean) {
    toggleBookmarkArticle(input: { id: $id, enabled: $enabled }) {
      id
      bookmarked
    }
  }
`
