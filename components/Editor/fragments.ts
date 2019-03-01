import gql from 'graphql-tag'

export const fragments = {
  draft: gql`
    fragment EditorDraft on Draft {
      id
      title
      content
      upstream {
        id
      }
    }
  `
}
