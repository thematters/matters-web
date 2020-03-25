import gql from 'graphql-tag'

export const fragments = {
  draft: gql`
    fragment EditorDraft on Draft {
      id
      title
      publishState
      content
    }
  `,
}
