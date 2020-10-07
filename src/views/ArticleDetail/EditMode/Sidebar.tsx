import _uniq from 'lodash/uniq'

import Sidebar from '~/components/Editor/Sidebar'

import { ENTITY_TYPE } from '~/common/enums'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'

interface EditModeSidebarProps {
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

const EditModeSidebar: React.FC<EditModeSidebarProps> = ({
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
    <>
      <Sidebar.Cover
        cover={cover?.path}
        assets={assets}
        entityId={article.id}
        entityType={ENTITY_TYPE.article}
        onEdit={setCover}
        refetchAssets={refetch}
      />

      <Sidebar.Tags
        tags={tags.length > 0 ? tags : tags}
        onEdit={(newTags: DigestTag[]) => setTags(_uniq(newTags))}
      />

      <Sidebar.Collection
        articles={collection.length > 0 ? collection : collection}
        onEdit={setCollection}
      />
    </>
  )
}

export default EditModeSidebar
