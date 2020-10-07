import BottomBar from '~/components/Editor/BottomBar'

import { ENTITY_TYPE } from '~/common/enums'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'

interface EditModeBottomBarProps {
  article: ArticleDetailPublic_article
  cover?: Asset
  assets: Asset[]
  tags: DigestTag[]
  collection: ArticleDigestDropdownArticle[]

  setCover: (cover?: Asset) => any
  setTags: (tags: DigestTag[]) => any
  setCollection: (articles: ArticleDigestDropdownArticle[]) => any

  refetch: () => any
}

const EditModeBottomBar: React.FC<EditModeBottomBarProps> = ({
  article,

  cover,
  assets,
  tags,
  collection,

  setCover,
  setTags,
  setCollection,

  refetch,
}) => {
  return (
    <BottomBar
      cover={cover?.path}
      assets={assets}
      tags={tags}
      collection={collection}
      onEditCover={setCover}
      onEditCollection={setCollection}
      onEditTags={setTags}
      entityId={article.id}
      entityType={ENTITY_TYPE.article}
      refetchAssets={refetch}
    />
  )
}

export default EditModeBottomBar
