import { gql } from '@apollo/client'

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
