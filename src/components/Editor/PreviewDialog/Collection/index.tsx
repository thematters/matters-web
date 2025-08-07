import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { EditorPreviewDialogCollectionDraftFragment } from '~/gql/graphql'

import { BasePreviewItem } from '../BasePreviewItem'

const fragment = gql`
  fragment EditorPreviewDialogCollectionDraft on Draft {
    id
    collections(input: { first: null }) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

export const Collection = ({
  draft,
  closeDialog,
}: {
  draft: EditorPreviewDialogCollectionDraftFragment
  closeDialog: () => void
}) => {
  const { collections } = draft

  if (!collections) {
    return null
  }

  const names = collections.edges?.map((edge) => edge.node.title) ?? []

  if (names.length === 0) {
    return null
  }

  return (
    <BasePreviewItem
      title={
        <FormattedMessage
          defaultMessage="Collection"
          id="/MS+jK"
          description="src/components/Editor/PreviewDialog/Collections/index.tsx"
        />
      }
      names={names}
      eventType="collections"
      draftId={draft.id}
      closeDialog={closeDialog}
    />
  )
}

Collection.fragment = fragment
