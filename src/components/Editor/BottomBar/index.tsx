import classNames from 'classnames'

import {
  IconCollectionMedium,
  IconHashTagMedium,
  IconImageMedium,
  TextIcon,
  Translate,
} from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'

import SetCoverDialog, { BaseSetCoverDialogProps } from '../SetCoverDialog'
import styles from './styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

type BottomBarProps = {
  tags: DigestTag[]
  collection: ArticleDigestDropdownArticle[]

  onEditCover: (asset?: Asset) => any
  onEditCollection: (articles: ArticleDigestDropdownArticle[]) => any
  onEditTags: (tag: DigestTag[]) => any

  saving?: boolean
  disabled?: boolean
} & Omit<BaseSetCoverDialogProps, 'onEdit'>

/**
 * Editor toolbar that fixed on bottom to edit cover, tags and collection,
 * only used on mobile
 */
const BottomBar: React.FC<BottomBarProps> = ({
  cover,
  tags,
  collection,

  onEditCover,
  onEditCollection,
  onEditTags,

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
      <div className="l-row full">
        <div className="l-col-three-left" />
        <div className="l-col-three-right">
          <section className="content">
            <SetCoverDialog cover={cover} onEdit={onEditCover} {...restProps}>
              {({ open: openSetCoverDialog }) => (
                <button type="button" onClick={openSetCoverDialog}>
                  <TextIcon
                    icon={<IconImageMedium size="md" />}
                    size="xm"
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
                onEditTags(nodes as DigestTag[])
              }
              nodes={tags}
              saving={saving}
              creatable
            >
              {({ open: openAddMyArticlesDialog }) => (
                <button type="button" onClick={openAddMyArticlesDialog}>
                  <TextIcon
                    icon={<IconHashTagMedium size="md" />}
                    size="xm"
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
              onSave={(nodes: SearchSelectNode[]) =>
                onEditCollection(nodes as ArticleDigestDropdownArticle[])
              }
              nodes={collection}
              saving={saving}
            >
              {({ open: openAddMyArticlesDialog }) => (
                <button type="button" onClick={openAddMyArticlesDialog}>
                  <TextIcon
                    icon={<IconCollectionMedium size="md" />}
                    size="xm"
                    weight="md"
                    spacing="xtight"
                  >
                    <Translate id="extend" />
                  </TextIcon>
                </button>
              )}
            </SearchSelectDialog>
          </section>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default BottomBar
