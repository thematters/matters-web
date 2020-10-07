import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useEffect, useState } from 'react'

import { Layout, Spinner, Title, useResponsive } from '~/components'
import { QueryError } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'
import assetFragment from '~/components/GQL/fragments/asset'

import Content from '../Content'
import styles from '../styles.css'
import EditModeBottomBar from './BottomBar'
import EditModeHeader from './Header'
import EditModeSidebar from './Sidebar'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'
import { EditModeArticle } from './__generated__/EditModeArticle'

interface EditModeProps {
  article: ArticleDetailPublic_article
  onEditSaved: () => void
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

const EditMode: React.FC<EditModeProps> = ({ article, onEditSaved }) => {
  const isSmallUp = useResponsive('sm-up')

  const [cover, setCover] = useState<Asset>()
  const [tags, setTags] = useState<DigestTag[]>(article.tags || [])
  const [collection, setCollection] = useState<ArticleDigestDropdownArticle[]>(
    []
  )

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
    return (
      <Layout.Main inEditor>
        <Layout.Header
          right={
            <EditModeHeader
              article={article}
              cover={cover}
              tags={tags}
              collection={collection}
              onEditSaved={onEditSaved}
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
        isSmallUp && (
          <EditModeSidebar
            article={article}
            cover={cover}
            assets={data?.article?.assets || []}
            tags={tags}
            collection={collection}
            setCover={setCover}
            setTags={setTags}
            setCollection={setCollection}
            refetch={refetch}
          />
        )
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
            onEditSaved={onEditSaved}
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
          setCover={setCover}
          setTags={setTags}
          setCollection={setCollection}
          refetch={refetch}
        />
      )}

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default EditMode
