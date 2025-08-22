import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { EditorPreviewDialogCampaignDraftFragment } from '~/gql/graphql'

import { BasePreviewItem } from '../BasePreviewItem'

const fragment = gql`
  fragment EditorPreviewDialogCampaignDraft on Draft {
    id
    campaigns {
      campaign {
        id
        name
      }
    }
  }
`

export const Campaign = ({
  draft,
  closeDialog,
}: {
  draft: EditorPreviewDialogCampaignDraftFragment
  closeDialog: () => void
}) => {
  const { campaign } = draft.campaigns[0]
  if (!campaign) {
    return null
  }

  return (
    <BasePreviewItem
      title={
        <FormattedMessage
          defaultMessage="Event"
          id="+SgLoK"
          description="src/components/Editor/PreviewDialog/Campaign/index.tsx"
        />
      }
      names={[campaign.name]}
      eventType="campaign"
      draftId={draft.id}
      eventDetail={{
        id: campaign.id,
        name: campaign.name,
      }}
      closeDialog={closeDialog}
    />
  )
}

Campaign.fragment = fragment
