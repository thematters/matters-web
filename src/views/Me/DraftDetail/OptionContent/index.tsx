import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Tabs } from '~/components'
import { getSelectCampaigns } from '~/components/Editor/SelectCampaign'
import Sidebar from '~/components/Editor/Sidebar'
import {
  DigestRichCirclePublicFragment,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'
import { EditMetaDraftFragment } from '~/gql/graphql'

import { useEditDraftCampaign } from '../hooks'
import styles from './styles.module.css'

export interface OptionContentProps {
  draft: EditMetaDraftFragment
  campaigns?: EditorSelectCampaignFragment[]
  ownCircles?: DigestRichCirclePublicFragment[]
}

type OptionItemProps = OptionContentProps & { disabled: boolean }

const EditDraftCampaign = ({ draft, campaigns }: OptionItemProps) => {
  const { edit } = useEditDraftCampaign()

  const {
    campaigns: selectableCampaigns,
    selectedCampaign,
    selectedStage,
  } = getSelectCampaigns({
    applied: campaigns,
    attached: draft.campaigns,
    createdAt: draft.createdAt,
  })

  return (
    <Sidebar.Campaign
      campaigns={selectableCampaigns}
      selectedCampaign={selectedCampaign}
      selectedStage={selectedStage}
      editCampaign={(value) => edit(value as any)}
    />
  )
}

export const OptionContent = (props: OptionContentProps) => {
  const [type, setType] = useState<'contentAndLayout' | 'settings'>(
    'contentAndLayout'
  )

  const isContentAndLayout = type === 'contentAndLayout'
  const isSettings = type === 'settings'

  const isPending = props.draft.publishState === 'pending'
  const isPublished = props.draft.publishState === 'published'
  const disabled = isPending || isPublished

  return (
    <section>
      <section className={styles.header}>
        <Tabs noSpacing fill>
          <Tabs.Tab
            selected={isContentAndLayout}
            onClick={() => setType('contentAndLayout')}
          >
            <FormattedMessage
              defaultMessage="Content and Layout"
              id="XU93/I"
              description="src/views/Me/DraftDetail/OptionDrawer/index.tsx"
            />
          </Tabs.Tab>

          <Tabs.Tab selected={isSettings} onClick={() => setType('settings')}>
            <FormattedMessage
              defaultMessage="Settings"
              id="Mu2Jy8"
              description="src/views/Me/DraftDetail/OptionDrawer/index.tsx"
            />
          </Tabs.Tab>
        </Tabs>
      </section>

      <section className={styles.content}>
        {isContentAndLayout && (
          <EditDraftCampaign {...props} disabled={disabled} />
        )}
      </section>
    </section>
  )
}
