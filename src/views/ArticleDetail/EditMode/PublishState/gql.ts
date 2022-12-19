import gql from 'graphql-tag'

import { fragments as EditorFragments } from '~/components/Editor/fragments'

const EDIT_MODE_ARTICLE_DRAFTS = gql`
  query EditModeArticleDrafts($id: ID!) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        content
        mediaHash
        tags {
          content
        }
        drafts {
          id
          mediaHash
          tags
          publishState
          ...EditorDraft
        }
      }
    }
  }
  ${EditorFragments.draft}
`

export default EDIT_MODE_ARTICLE_DRAFTS
