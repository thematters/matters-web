import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useEffect } from 'react'

import { Spinner } from '~/components'
import SidebarCollection from '~/components/Editor/Sidebar/Collection'
import SidebarCover from '~/components/Editor/Sidebar/Cover'
import SidebarTags from '~/components/Editor/Sidebar/Tags'
import { QueryError } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'
import assetFragment from '~/components/GQL/fragments/asset'

import { ENTITY_TYPE } from '~/common/enums'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../../__generated__/ArticleDetailPublic'
import { EditModeArticle } from './__generated__/EditModeArticle'

interface EditModeSidebarProps {
  article: ArticleDetailPublic_article
  cover?: Asset
  tags: DigestTag[]
  collection: ArticleDigestDropdownArticle[]
  setCover: (cover?: Asset) => any
  setTags: (tags: DigestTag[]) => any
  setCollection: (articles: ArticleDigestDropdownArticle[]) => any
}

const EDIT_MODE_ARTICLE = gql`
  query EditModeArticle(
    $mediaHash: String!
    $after: String
    $first: Int = null
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      cover
      assets {
        ...Asset
      }
      ...ArticleCollection
    }
  }
  ${assetFragment}
  ${articleFragments.articleCollection}
`

const EditModeSidebar = ({
  article,
  cover,
  tags,
  collection,
  setCover,
  setTags,
  setCollection,
}: EditModeSidebarProps) => {
  const { data, loading, error, refetch } = useQuery<EditModeArticle>(
    EDIT_MODE_ARTICLE,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )

  useEffect(() => {
    if (!data?.article) {
      return
    }

    const assets = data.article.assets
    const currCover = assets.find(
      (asset) => asset.path === data?.article?.cover
    )
    const currCollection =
      data.article.collection.edges?.map(({ node }) => node) || []

    if (currCover) {
      setCover(currCover)
    }

    if (currCollection.length > 0) {
      setCollection(currCollection)
    }
  }, [data?.article?.id])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!data?.article) {
    return null
  }

  return (
    <>
      <SidebarCover
        cover={cover?.path}
        assets={data.article.assets}
        entityId={article.id}
        entityType={ENTITY_TYPE.article}
        onEdit={setCover}
        refetchAssets={refetch}
      />

      <SidebarTags
        tags={tags.length > 0 ? tags : tags}
        onEdit={(newTags: DigestTag[]) => setTags(_uniq(newTags))}
      />

      <SidebarCollection
        articles={collection.length > 0 ? collection : collection}
        onEdit={setCollection}
      />
    </>
  )
}

export default EditModeSidebar
