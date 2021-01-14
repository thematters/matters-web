import BottomBar from '~/components/Editor/BottomBar'

import { ENTITY_TYPE } from '~/common/enums'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'

interface EditModeBottomBarProps {
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

const EditModeBottomBar: React.FC<EditModeBottomBarProps> = ({
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
    <BottomBar
      cover={cover?.path}
      assets={assets}
      tags={tags}
      collection={collection}
      circle={circle}
      onEditCover={editCover}
      onEditCollection={editCollection}
      onEditTags={editTags}
      onToggleCircle={toggleCircle}
      canToggleCircle={canToggleCircle}
      entityId={article.id}
      entityType={ENTITY_TYPE.article}
      refetchAssets={refetchAssets}
      disabled={disabled}
    />
  )
}

export default EditModeBottomBar
