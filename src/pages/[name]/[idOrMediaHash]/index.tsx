import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { toGlobalId, toPath } from '~/common/utils'
import { EmptyLayout, SpinnerBlock, Throw404, useRoute } from '~/components'
import {
  GetShortHashByIdQuery,
  GetShortHashByMediaHashQuery,
} from '~/gql/graphql'

/**
 * FIXME: can retire this page when Cloudflare Bulk Redirects is ready
 */

const GET_SHORT_HASH_BY_ID = gql`
  query GetShortHashById($id: ID!) {
    node(input: { id: $id }) {
      ... on Article {
        id
        shortHash
      }
    }
  }
`

const GET_SHORT_HASH_BY_MEDIA_HASH = gql`
  query GetShortHashByMediaHash($mediaHash: String!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      shortHash
    }
  }
`

// - `/:username:/:articleId:-:slug:-:mediaHash`
// - `/:username:/:articleId:`
const LegacyIDArticle = ({ articleId }: { articleId: string }) => {
  const router = useRouter()
  const { data, loading, error } = useQuery<GetShortHashByIdQuery>(
    GET_SHORT_HASH_BY_ID,
    { variables: { id: toGlobalId({ type: 'Article', id: articleId }) } }
  )
  const shortHash =
    data?.node?.__typename === 'Article' ? data.node.shortHash : ''

  useEffect(() => {
    if (!shortHash) return

    const path = toPath({ page: 'articleDetail', article: { shortHash } })
    router.replace(path.href)
  }, [shortHash])

  if (loading) {
    return (
      <EmptyLayout>
        <SpinnerBlock />
      </EmptyLayout>
    )
  }

  if (!shortHash || error) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return null
}

// - `/:username:/:slug:-:mediaHash:`
const LegacyMediaHashArticle = ({ mediaHash }: { mediaHash: string }) => {
  const router = useRouter()
  const { data, loading, error } = useQuery<GetShortHashByMediaHashQuery>(
    GET_SHORT_HASH_BY_MEDIA_HASH,
    { variables: { mediaHash } }
  )
  const shortHash = data?.article?.shortHash

  useEffect(() => {
    if (!shortHash) return

    const path = toPath({ page: 'articleDetail', article: { shortHash } })
    router.replace(path.href)
  }, [shortHash])

  if (loading) {
    return (
      <EmptyLayout>
        <SpinnerBlock />
      </EmptyLayout>
    )
  }

  if (!shortHash || error) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return null
}

const LegacyArticle = () => {
  const { getQuery } = useRoute()
  const idOrMediaHash = getQuery('idOrMediaHash')

  const mediaHashMatch = idOrMediaHash.match(/^.*-?(bafy\w{55}|zdpu\w{45})$/)
  const articleIdMatch = idOrMediaHash.match(/^(\d+)-?[^\/]*$/)

  let mediaHash = ''
  let articleId = ''
  if (mediaHashMatch) {
    mediaHash = mediaHashMatch[1]
  }
  if (articleIdMatch) {
    articleId = articleIdMatch[1]
  }

  if (mediaHash) {
    return <LegacyMediaHashArticle mediaHash={mediaHash} />
  }

  if (articleId) {
    return <LegacyIDArticle articleId={articleId} />
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default LegacyArticle
