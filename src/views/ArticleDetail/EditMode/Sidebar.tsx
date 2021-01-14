import _uniq from 'lodash/uniq'

import Sidebar from '~/components/Editor/Sidebar'

import { ENTITY_TYPE } from '~/common/enums'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'

interface EditModeSidebarProps {
  article: ArticleDetailPublic_article
  cover?: Asset
  assets: Asset[]
  tags: DigestTag[]
  collection: ArticleDigestDropdownArticle[]
  circle?: DigestRichCirclePublic | null

  disabled: boolean

  editCover: (cover?: Asset) => any
  editTags: (tags: DigestTag[]) => any
  editCollection: (articles: ArticleDigestDropdownArticle[]) => any
  toggleCircle?: () => any
  canToggleCircle?: boolean

  refetchAssets: () => any
}

const EditModeSidebar: React.FC<EditModeSidebarProps> = ({
  article,

  cover,
  assets,
  tags,
  collection,
  circle,

  disabled,

  editCover,
  editTags,
  editCollection,
  toggleCircle,
  canToggleCircle,

  refetchAssets,
}) => {
  return (
    <>
      <Sidebar.Cover
        cover={cover?.path}
        assets={assets}
        entityId={article.id}
        entityType={ENTITY_TYPE.article}
        onEdit={editCover}
        refetchAssets={refetchAssets}
        disabled={disabled}
      />

      <Sidebar.Tags
        tags={tags.length > 0 ? tags : tags}
        onEdit={(newTags: DigestTag[]) => editTags(_uniq(newTags))}
        disabled={disabled}
      />

      <Sidebar.Collection
        articles={collection.length > 0 ? collection : collection}
        onEdit={editCollection}
        disabled={disabled}
      />

      {toggleCircle && (
        <Sidebar.Management
          circle={circle}
          onEdit={toggleCircle}
          disabled={!canToggleCircle}
        />
      )}
    </>
  )
}

export default EditModeSidebar
