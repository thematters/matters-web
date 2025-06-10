import { ApolloQueryResult } from '@apollo/client'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ENTITY_TYPE } from '~/common/enums'
import { Tabs, toDigestTagPlaceholder } from '~/components'
import { getSelectCampaigns } from '~/components/Editor/SelectCampaign'
import Sidebar from '~/components/Editor/Sidebar'
import {
  CollectionDigestCollectionPublicFragment,
  DigestRichCirclePublicFragment,
  DraftDetailViewerQueryQuery,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'
import { EditMetaDraftFragment } from '~/gql/graphql'

import {
  useEditDraftCampaign,
  useEditDraftCollections,
  useEditDraftConnections,
  useEditDraftCover,
  useEditDraftTags,
} from '../hooks'
import styles from './styles.module.css'

export interface OptionContentProps {
  draft: EditMetaDraftFragment
  draftViewer?: DraftDetailViewerQueryQuery
  campaigns?: EditorSelectCampaignFragment[]
  ownCircles?: DigestRichCirclePublicFragment[]
  ownCollections?: CollectionDigestCollectionPublicFragment[]
  loadMoreCollections: () => Promise<
    ApolloQueryResult<DraftDetailViewerQueryQuery>
  >
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
      editCampaign={edit}
    />
  )
}

const EditDraftCover = ({ draft, disabled }: OptionItemProps) => {
  const { edit, refetch, saving } = useEditDraftCover()

  return (
    <Sidebar.Cover
      cover={draft.cover}
      assets={draft.assets}
      entityId={draft.id}
      entityType={ENTITY_TYPE.draft}
      editCover={edit}
      refetchAssets={refetch}
      coverSaving={saving}
      disabled={disabled}
    />
  )
}

const EditDraftTags = ({ draft, disabled }: OptionItemProps) => {
  const { edit, saving } = useEditDraftTags()
  const tags = (draft.tags || []).map(toDigestTagPlaceholder)

  return (
    <Sidebar.Tags
      tags={tags}
      editTags={edit}
      saving={saving}
      disabled={disabled}
    />
  )
}

const EditDraftConnections = ({ draft, disabled }: OptionItemProps) => {
  const { edit, saving } = useEditDraftConnections()
  const articles = draft?.connections?.edges?.map(({ node }) => node) || []

  return (
    <Sidebar.Connections
      connections={articles}
      editConnections={edit}
      connectionsSaving={saving}
      disabled={disabled}
    />
  )
}

const EditDraftCollections = ({
  draft,
  disabled,
  ownCollections,
  loadMoreCollections,
  draftViewer,
}: OptionItemProps) => {
  const { edit, saving } = useEditDraftCollections()
  const collections = ownCollections || []
  const checkedCollections =
    draft.collections?.edges?.map(({ node }) => node) || []
  const hasMoreCollections =
    !!draftViewer?.viewer?.collections?.pageInfo?.hasNextPage
  return (
    <Sidebar.Collections
      checkedCollections={checkedCollections}
      collections={collections}
      editCollections={edit}
      collectionsSaving={saving}
      disabled={disabled}
      loadMore={loadMoreCollections}
      hasNextPage={hasMoreCollections}
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
  const hasOwnCollections = (props.ownCollections?.length || 0) > 0

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
          <>
            <EditDraftCampaign {...props} disabled={disabled} />
            <EditDraftCover {...props} disabled={disabled} />
            <EditDraftTags {...props} disabled={disabled} />
            <EditDraftConnections {...props} disabled={disabled} />
            {hasOwnCollections && (
              <EditDraftCollections {...props} disabled={disabled} />
            )}
          </>
        )}
      </section>
    </section>
  )
}
