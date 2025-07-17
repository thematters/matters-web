import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { EditorPreviewDialogTagsDraftFragment } from '~/gql/graphql'

import { BasePreviewItem } from '../BasePreviewItem'

const fragment = gql`
  fragment EditorPreviewDialogTagsDraft on Draft {
    tags
  }
`

export const Tags = ({
  draft,
  closeDialog,
}: {
  draft: EditorPreviewDialogTagsDraftFragment
  closeDialog: () => void
}) => {
  const { tags } = draft

  if (!tags) {
    return null
  }

  return (
    <BasePreviewItem
      title={
        <FormattedMessage
          defaultMessage="Tags"
          id="gccvX4"
          description="src/components/Editor/PreviewDialog/Tags/index.tsx"
        />
      }
      names={tags}
      eventType="tags"
      closeDialog={closeDialog}
    />
  )
}

Tags.fragment = fragment
