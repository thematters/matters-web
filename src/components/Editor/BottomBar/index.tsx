import classNames from 'classnames'

import {
  IconCollection24,
  IconHashTag24,
  IconImage24,
  Layout,
  TextIcon,
  Translate,
} from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'

import SetCoverDialog, { BaseSetCoverDialogProps } from '../SetCoverDialog'
import MoreActions from './MoreActions'
import styles from './styles.css'

import { ArticleAccessType, SearchExclude } from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

export type BottomBarProps = {
  editCover: (asset?: Asset) => any

  collection: ArticleDigestDropdownArticle[]
  editCollection: (articles: ArticleDigestDropdownArticle[]) => any

  tags: DigestTag[]
  editTags: (tag: DigestTag[]) => any

  circle?: DigestRichCirclePublic | null
  accessType?: ArticleAccessType
  editAccess?: (addToCircle: boolean, paywalled: boolean) => any
  canToggleCircle: boolean
  canTogglePaywall: boolean

  saving?: boolean
  disabled?: boolean
} & Omit<BaseSetCoverDialogProps, 'onEdit'>

/**
 * Editor toolbar that fixed on bottom to edit cover, tags and collection,
 * only used on mobile
 */
const BottomBar: React.FC<BottomBarProps> = ({
  cover,
  editCover,

  collection,
  editCollection,

  tags,
  editTags,

  circle,
  editAccess,
  accessType,
  canToggleCircle,
  canTogglePaywall,

  saving,
  disabled,

  ...restProps
}) => {
  const bottomBarClasses = classNames({
    'bottom-bar': true,
    'u-area-disable': disabled,
  })

  return (
    <section className={bottomBarClasses}>
      <Layout.FixedMain>
        <section className="content">
          <section className="inner">
            <SetCoverDialog cover={cover} onEdit={editCover} {...restProps}>
              {({ open: openSetCoverDialog }) => (
                <button type="button" onClick={openSetCoverDialog}>
                  <TextIcon
                    icon={<IconImage24 size="md" />}
                    size="md-s"
                    weight="md"
                    spacing="xtight"
                  >
                    <Translate id="cover" />
                  </TextIcon>
                </button>
              )}
            </SetCoverDialog>

            <SearchSelectDialog
              title="addTag"
              hint="hintAddTag"
              searchType="Tag"
              onSave={(nodes: SearchSelectNode[]) =>
                editTags(nodes as DigestTag[])
              }
              nodes={tags}
              saving={saving}
              createTag
            >
              {({ open: openAddMyArticlesDialog }) => (
                <button type="button" onClick={openAddMyArticlesDialog}>
                  <TextIcon
                    icon={<IconHashTag24 size="md" />}
                    size="md-s"
                    weight="md"
                    spacing="xtight"
                  >
                    <Translate id="tag" />
                  </TextIcon>
                </button>
              )}
            </SearchSelectDialog>

            <SearchSelectDialog
              title="extendArticle"
              hint="hintEditCollection"
              searchType="Article"
              searchExclude={SearchExclude.blocked}
              onSave={(nodes: SearchSelectNode[]) =>
                editCollection(nodes as ArticleDigestDropdownArticle[])
              }
              nodes={collection}
              saving={saving}
            >
              {({ open: openAddMyArticlesDialog }) => (
                <button type="button" onClick={openAddMyArticlesDialog}>
                  <TextIcon
                    icon={<IconCollection24 size="md" />}
                    size="md-s"
                    weight="md"
                    spacing="xtight"
                  >
                    <Translate id="extend" />
                  </TextIcon>
                </button>
              )}
            </SearchSelectDialog>

            {editAccess && (
              <MoreActions
                circle={circle}
                accessType={accessType}
                editAccess={editAccess}
                saving={!!saving}
                canToggleCircle={canToggleCircle}
                canTogglePaywall={canTogglePaywall}
              />
            )}
          </section>
        </section>
      </Layout.FixedMain>

      <style jsx>{styles}</style>
    </section>
  )
}

export default BottomBar
