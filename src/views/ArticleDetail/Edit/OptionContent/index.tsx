import { FormattedMessage } from 'react-intl'

import { Tabs } from '~/components'
import { SetConnectionsProps, SetTagsProps } from '~/components/Editor'
import SupportSettingDialog from '~/components/Editor/MoreSettings/SupportSettingDialog'
import { SelectCampaignProps } from '~/components/Editor/SelectCampaign'
import { SetCoverProps } from '~/components/Editor/SetCover'
import Sidebar from '~/components/Editor/Sidebar'
import { SidebarCanCommentProps } from '~/components/Editor/Sidebar/CanComment'
import { SidebarCollectionsProps } from '~/components/Editor/Sidebar/Collections'
import { SidebarIndentProps } from '~/components/Editor/Sidebar/Indent'
import { SidebarISCNProps } from '~/components/Editor/Sidebar/ISCN'
import { SidebarLicenseProps } from '~/components/Editor/Sidebar/License'
import { SidebarSensitiveProps } from '~/components/Editor/Sidebar/Sensitive'
import {
  CollectionDigestCollectionPublicFragment,
  DigestRichCirclePublicFragment,
  DraftDetailViewerQueryQuery,
  EditorSelectCampaignFragment,
} from '~/gql/graphql'

import { Article } from '..'
import { OptionTab } from '../Hooks'
import styles from './styles.module.css'

export type OptionContentProps = {
  article: Article

  viewerData?: DraftDetailViewerQueryQuery
  campaigns?: EditorSelectCampaignFragment[]
  ownCircles?: DigestRichCirclePublicFragment[]
  ownCollections?: CollectionDigestCollectionPublicFragment[]
} & SelectCampaignProps &
  SetCoverProps &
  SetTagsProps &
  SetConnectionsProps &
  SidebarCollectionsProps &
  SidebarIndentProps &
  SidebarLicenseProps &
  SidebarCanCommentProps & {
    requestForDonation?: string | null
    replyToDonator?: string | null
    editSupportSetting: (
      requestForDonation: string | null,
      replyToDonator: string | null
    ) => void
  } & SidebarSensitiveProps &
  SidebarISCNProps

type OptionItemProps = OptionContentProps & { disabled: boolean }

const EditCampaign = ({
  campaigns,
  selectedCampaign,
  selectedStage,
  editCampaign,
}: OptionItemProps) => {
  return (
    <Sidebar.Campaign
      campaigns={campaigns}
      selectedCampaign={selectedCampaign}
      selectedStage={selectedStage}
      editCampaign={editCampaign}
    />
  )
}

const EditCover = ({
  cover,
  assets,
  entityId,
  entityType,
  editCover,
  refetchAssets,
  coverSaving,
  disabled,
}: OptionItemProps) => {
  return (
    <Sidebar.Cover
      cover={cover}
      assets={assets}
      entityId={entityId}
      entityType={entityType}
      editCover={editCover}
      refetchAssets={refetchAssets}
      coverSaving={coverSaving}
      disabled={disabled}
    />
  )
}

const EditTags = ({
  tags,
  editTags,
  tagsSaving,
  disabled,
}: OptionItemProps) => {
  return (
    <Sidebar.Tags
      tags={tags}
      editTags={editTags}
      saving={tagsSaving}
      disabled={disabled}
    />
  )
}

const EditConnections = ({
  connections,
  editConnections,
  connectionsSaving,
  disabled,
}: OptionItemProps) => {
  return (
    <Sidebar.Connections
      connections={connections}
      editConnections={editConnections}
      connectionsSaving={connectionsSaving}
      disabled={disabled}
    />
  )
}

const EditCollections = ({
  ownCollections,
  checkedCollections,
  editCollections,
  collectionsSaving,
  disabled,
  loadMore,
  viewerData,
}: OptionItemProps) => {
  const collections = ownCollections || []
  const hasMoreCollections =
    !!viewerData?.viewer?.collections?.pageInfo?.hasNextPage
  return (
    <Sidebar.Collections
      checkedCollections={checkedCollections}
      collections={collections}
      editCollections={editCollections}
      collectionsSaving={collectionsSaving}
      disabled={disabled}
      loadMore={loadMore}
      hasNextPage={hasMoreCollections}
    />
  )
}

const EditIndent = ({
  indented,
  toggleIndent,
  indentSaving,
}: OptionItemProps) => {
  return (
    <Sidebar.Indent
      indented={indented}
      toggleIndent={toggleIndent}
      indentSaving={indentSaving}
    />
  )
}

const EditLicense = ({ license, circle, editAccess }: OptionItemProps) => {
  return (
    <Sidebar.License
      license={license}
      circle={circle}
      editAccess={editAccess}
      saving={false}
    />
  )
}

const EditCanComment = ({ canComment, editCanComment }: OptionItemProps) => {
  return (
    <Sidebar.CanComment
      canComment={canComment}
      editCanComment={editCanComment}
      saving={false}
    />
  )
}

const EditSupportSetting = ({
  article,
  requestForDonation,
  replyToDonator,
  editSupportSetting,
}: OptionItemProps) => {
  return (
    <SupportSettingDialog
      article={{ ...article, replyToDonator, requestForDonation }}
      editSupportSetting={editSupportSetting}
      supportSettingSaving={false}
    >
      {({ openDialog }) => (
        <Sidebar.SupportSetting openSupportSetting={openDialog} />
      )}
    </SupportSettingDialog>
  )
}

const EditSensitive = ({
  sensitive,
  toggleSensitive,
  sensitiveSaving,
}: OptionItemProps) => {
  return (
    <Sidebar.Sensitive
      sensitive={sensitive}
      toggleSensitive={toggleSensitive}
      sensitiveSaving={sensitiveSaving}
    />
  )
}

const EditCircle = ({
  circle,
  editAccess,
  saving,
  license,
  ownCircles,
}: OptionItemProps) => {
  const checked = ownCircles?.[0].id === circle?.id

  return (
    <Sidebar.Circle
      license={license}
      circle={circle}
      editAccess={editAccess}
      saving={saving}
      checked={checked}
    />
  )
}

export const OptionContent = (
  props: OptionContentProps & {
    tab: OptionTab
    setTab: (tab: OptionTab) => void
  }
) => {
  const { tab, setTab } = props
  const isContentAndLayout = tab === 'contentAndLayout'
  const isSettings = tab === 'settings'
  const hasOwnCollections = (props.ownCollections?.length || 0) > 0
  const hasOwnCircle = props.ownCircles && props.ownCircles.length >= 1
  const disabled = false

  return (
    <section>
      <section className={styles.header}>
        <Tabs noSpacing fill>
          <Tabs.Tab
            selected={isContentAndLayout}
            onClick={() => setTab('contentAndLayout')}
          >
            <FormattedMessage
              defaultMessage="Content and Layout"
              id="XU93/I"
              description="src/views/Me/DraftDetail/OptionDrawer/index.tsx"
            />
          </Tabs.Tab>

          <Tabs.Tab selected={isSettings} onClick={() => setTab('settings')}>
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
            <EditCampaign {...props} disabled={disabled} />
            <EditCover {...props} disabled={disabled} />
            <EditTags {...props} disabled={disabled} />
            <EditConnections {...props} disabled={disabled} />
            {hasOwnCollections && (
              <EditCollections {...props} disabled={disabled} />
            )}
            <EditIndent {...props} disabled={disabled} />
          </>
        )}
        {isSettings && (
          <>
            <EditLicense {...props} disabled={disabled} />
            <EditCanComment {...props} disabled={disabled} />
            <EditSupportSetting {...props} disabled={disabled} />
            <EditSensitive {...props} disabled={disabled} />
            {hasOwnCircle && <EditCircle {...props} disabled={disabled} />}
          </>
        )}
      </section>
    </section>
  )
}
