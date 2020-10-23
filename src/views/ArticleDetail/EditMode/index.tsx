import { useQuery } from '@apollo/react-hooks'
import _uniq from 'lodash/uniq'
import { useEffect, useState } from 'react'

import { Layout, Spinner, Title, useResponsive } from '~/components'
import { QueryError, useImperativeQuery } from '~/components/GQL'

import Content from '../Content'
import styles from '../styles.css'
import EditModeBottomBar from './BottomBar'
import { EDIT_MODE_ARTICLE, EDIT_MODE_ARTICLE_ASSETS } from './gql'
import EditModeHeader from './Header'
import EditModeSidebar from './Sidebar'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'
import { EditModeArticle } from './__generated__/EditModeArticle'
import { EditModeArticleAssets } from './__generated__/EditModeArticleAssets'

interface EditModeProps {
  article: ArticleDetailPublic_article
  onSaved: () => void
}

const EditMode: React.FC<EditModeProps> = ({ article, onSaved }) => {
  const isSmallUp = useResponsive('sm-up')

  // staging editing data
  const [cover, editCover] = useState<Asset>()
  const [tags, editTags] = useState<DigestTag[]>(article.tags || [])
  const [collection, editCollection] = useState<ArticleDigestDropdownArticle[]>(
    []
  )

  // fetch and refetch latest metadata
  const { data, loading, error } = useQuery<EditModeArticle>(
    EDIT_MODE_ARTICLE,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )
  const refetchAssets = useImperativeQuery<EditModeArticleAssets>(
    EDIT_MODE_ARTICLE_ASSETS,
    {
      variables: { mediaHash: article.mediaHash },
      fetchPolicy: 'network-only',
    }
  )

  useEffect(() => {
    if (!data?.article) {
      return
    }

    // cover, find from `article.assets` since `article.cover` isn't a `Asset`
    const assets = data.article.assets
    const currCover = assets.find((asset) => asset.path === data.article?.cover)
    if (currCover) {
      editCover(currCover)
    }

    // collection
    editCollection(data.article.collection.edges?.map(({ node }) => node) || [])
  }, [data?.article?.id])

  /**
   * Render
   */
  if (loading) {
    return (
      <Layout.Main inEditor>
        <Layout.Header
          right={
            <EditModeHeader
              article={article}
              cover={cover}
              tags={tags}
              collection={collection}
              onSaved={onSaved}
              disabled
            />
          }
        />

        <Spinner />
      </Layout.Main>
    )
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <Layout.Main
      aside={
        <EditModeSidebar
          article={article}
          cover={cover}
          assets={data?.article?.assets || []}
          tags={tags}
          collection={collection}
          editCover={editCover}
          editTags={editTags}
          editCollection={editCollection}
          refetchAssets={refetchAssets}
        />
      }
      inEditor
    >
      <Layout.Header
        right={
          <EditModeHeader
            article={article}
            cover={cover}
            tags={tags}
            collection={collection}
            onSaved={onSaved}
          />
        }
      />

      <section className="content editing">
        <section className="title">
          <Title type="article">{article.title}</Title>
        </section>

        <Content article={article} />
      </section>

      {!isSmallUp && (
        <EditModeBottomBar
          article={article}
          cover={cover}
          assets={data?.article?.assets || []}
          tags={tags}
          collection={collection}
          editCover={editCover}
          editTags={editTags}
          editCollection={editCollection}
          refetchAssets={refetchAssets}
        />
      )}

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default EditMode
