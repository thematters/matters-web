import { useQuery } from '@apollo/react-hooks'
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
    router.push(path.href)
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
    router.push(path.href)
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
  const articleId = idOrMediaHash?.match(/^(\d+)/)?.[1] || ''

  const isMediaHashPossiblyValid = (mediaHash?: string | null) => {
    // is there a better way to detect valid?
    // a valid mediaHash, should have length 49 or 59 chars
    // 'zdpuAsCXC87Tm1fFvAbysV7HVt7J8aV6chaTKeJZ5ryLALK3Z'
    // 'bafyreief6bryqsa4byabnmx222jvo4khlodvpypw27af43frecbumn6ocq'
    return (
      mediaHash &&
      ((mediaHash?.length === 49 && mediaHash.startsWith('zdpu')) ||
        (mediaHash?.length === 59 && mediaHash.startsWith('bafy')))
    )
  }

  const isMediaHash = !!(
    (idOrMediaHash && isMediaHashPossiblyValid(idOrMediaHash))
    // && !articleId
  )

  if (isMediaHash) {
    const mediaHash = idOrMediaHash
    return <LegacyMediaHashArticle mediaHash={mediaHash} />
  } else {
    return <LegacyIDArticle articleId={articleId} />
  }
}

export default LegacyArticle
