import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { EditorPreviewDialogConnectionsDraftFragment } from '~/gql/graphql'

import { BasePreviewItem } from '../BasePreviewItem'

const fragment = gql`
  fragment EditorPreviewDialogConnectionsDraft on Draft {
    id
    connections(input: { first: null }) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

export const Connections = ({
  draft,
  closeDialog,
}: {
  draft: EditorPreviewDialogConnectionsDraftFragment
  closeDialog: () => void
}) => {
  const { connections } = draft

  if (!connections) {
    return null
  }

  const names = connections.edges?.map((edge) => edge.node.title) ?? []

  if (names.length === 0) {
    return null
  }

  return (
    <BasePreviewItem
      title={
        <FormattedMessage
          defaultMessage="Curated Article"
          id="Ajy3De"
          description="src/components/Editor/PreviewDialog/Connections/index.tsx"
        />
      }
      names={names}
      draftId={draft.id}
      eventType="connections"
      closeDialog={closeDialog}
    />
  )
}

Connections.fragment = fragment
