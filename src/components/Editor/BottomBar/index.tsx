import classNames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconCollection } from '@/public/static/icons/24px/collection.svg'
import { ReactComponent as IconHashtag } from '@/public/static/icons/24px/hashtag.svg'
import { ReactComponent as IconImage } from '@/public/static/icons/24px/image.svg'
import { ReactComponent as IconSettings } from '@/public/static/icons/24px/settings.svg'
import {
  EditorSearchSelectDialog,
  Icon,
  Layout,
  TextIcon,
  Translate,
} from '~/components'
import {
  SetCollectionProps,
  SetCoverProps,
  SetResponseProps,
  SetTagsProps,
  ToggleAccessProps,
  ToggleResponseProps,
} from '~/components/Editor'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import {
  ArticleDigestDropdownArticleFragment,
  DigestTagFragment,
  SearchExclude,
} from '~/gql/graphql'

import ArticleCustomStagingArea from '../ArticleCustomStagingArea'
import { SelectCampaignProps } from '../SelectCampaign'
import SetCover from '../SetCover'
import TagCustomStagingArea from '../TagCustomStagingArea'
import MoreSettingsDialog from './MoreSettingsDialog'
import styles from './styles.module.css'

export type BottomBarProps = {
  saving: boolean
  disabled: boolean
} & SetCoverProps &
  SetCollectionProps &
  SetTagsProps &
  SetResponseProps &
  ToggleAccessProps &
  Partial<SelectCampaignProps>

/**
 * Editor toolbar that fixed on bottom to edit cover, tags and collection,
 * only used on mobile
 */
const BottomBar: React.FC<BottomBarProps> = ({
  cover,
  editCover,
  assets,
  refetchAssets,
  entityId,
  entityType,
  coverSaving,

  collection,
  editCollection,
  collectionSaving,
  nodeExclude,

  tags,
  editTags,
  tagsSaving,

  circle,
  editAccess,
  accessSaving,
  accessType,
  license,
  canToggleCircle,

  article,
  draft,
  editSupportSetting,
  supportSettingSaving,
  onOpenSupportSetting,

  contentSensitive,
  toggleContentSensitive,
  contentSensitiveSaving,

  iscnPublish,
  togglePublishISCN,
  iscnPublishSaving,

  canComment,
  toggleComment,

  selectedCampaign,
  selectedStage,
  editCampaign,

  saving,
  disabled,
}) => {
  const intl = useIntl()

  const bottomBarClasses = classNames({
    [styles.bottomBar]: true,
    'u-area-disable': disabled,
  })

  const coverProps: SetCoverProps = {
    cover,
    editCover,
    assets,
    refetchAssets,
    entityId,
    entityType,
    coverSaving,
  }
  const settingsProps: ToggleAccessProps &
    ToggleResponseProps &
    Partial<SelectCampaignProps> = {
    circle,
    accessType,
    license,
    editAccess,
    accessSaving,
    canToggleCircle,

    article,
    draft,
    editSupportSetting,
    supportSettingSaving,
    onOpenSupportSetting,

    contentSensitive,
    toggleContentSensitive,
    contentSensitiveSaving,

    iscnPublish,
    togglePublishISCN,
    iscnPublishSaving,

    canComment,
    toggleComment,
    disableChangeCanComment: article?.canComment,

    selectedCampaign,
    selectedStage,
    editCampaign,
  }

  return (
    <section className={bottomBarClasses}>
      <Layout.FixedMain>
        <section className={styles.content}>
          <section className={styles.inner}>
            {/* Cover */}
            <SetCover.Dialog {...coverProps}>
              {({ openDialog: openSetCoverDialog }) => (
                <button
                  type="button"
                  onClick={openSetCoverDialog}
                  aria-haspopup="dialog"
                >
                  <TextIcon
                    icon={<Icon icon={IconImage} size={24} />}
                    size={15}
                    weight="medium"
                    spacing={8}
                  >
                    <FormattedMessage defaultMessage="Cover" id="hl9bd4" />
                  </TextIcon>
                </button>
              )}
            </SetCover.Dialog>

            {/* Tags */}
            <EditorSearchSelectDialog
              title={<FormattedMessage defaultMessage="Add Tag" id="GUW//c" />}
              hint={
                <FormattedMessage
                  defaultMessage="Adding tags helps readers find your articles. Add or create new tags."
                  id="NmhF45"
                />
              }
              searchType="Tag"
              onSave={(nodes: SearchSelectNode[]) =>
                editTags(nodes as DigestTagFragment[])
              }
              nodes={tags}
              saving={tagsSaving}
              createTag
              CustomStagingArea={TagCustomStagingArea}
              dismissOnClickOutside={false}
              dismissOnESC={false}
            >
              {({ openDialog }) => (
                <button
                  type="button"
                  onClick={openDialog}
                  aria-haspopup="dialog"
                >
                  <TextIcon
                    icon={<Icon icon={IconHashtag} size={24} />}
                    size={15}
                    weight="medium"
                    spacing={8}
                  >
                    <FormattedMessage defaultMessage="Tag" id="18HJlm" />
                  </TextIcon>
                </button>
              )}
            </EditorSearchSelectDialog>

            {/* Collection */}
            <EditorSearchSelectDialog
              title={
                <FormattedMessage
                  defaultMessage="Collect Article"
                  id="vX2bDy"
                />
              }
              hint={
                <FormattedMessage
                  defaultMessage="Adding articles to a collection helps readers find your articles."
                  id="XTyKFR"
                />
              }
              searchType="Article"
              searchExclude={SearchExclude.Blocked}
              nodeExclude={nodeExclude}
              onSave={(nodes: SearchSelectNode[]) =>
                editCollection(nodes as ArticleDigestDropdownArticleFragment[])
              }
              nodes={collection}
              saving={collectionSaving}
              CustomStagingArea={ArticleCustomStagingArea}
              dismissOnClickOutside={false}
              dismissOnESC={false}
            >
              {({ openDialog }) => (
                <button
                  type="button"
                  onClick={openDialog}
                  aria-haspopup="dialog"
                >
                  <TextIcon
                    icon={<Icon icon={IconCollection} size={24} />}
                    size={15}
                    weight="medium"
                    spacing={8}
                  >
                    <FormattedMessage defaultMessage="Collect" id="kCPl0r" />
                  </TextIcon>
                </button>
              )}
            </EditorSearchSelectDialog>

            {/* Campaign & Circle & License & Support Feedback & ISCN & canComment */}
            <MoreSettingsDialog {...settingsProps}>
              {({ openDialog }) => (
                <button
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Article Management',
                    id: 'ZEMcZ6',
                  })}
                  aria-haspopup="dialog"
                  onClick={openDialog}
                >
                  <TextIcon
                    icon={<Icon icon={IconSettings} size={24} />}
                    size={15}
                    weight="medium"
                    spacing={8}
                  >
                    <Translate zh_hant="管理" zh_hans="管理" en="Manage" />
                  </TextIcon>
                </button>
              )}
            </MoreSettingsDialog>
          </section>
        </section>
      </Layout.FixedMain>
    </section>
  )
}

export default BottomBar
