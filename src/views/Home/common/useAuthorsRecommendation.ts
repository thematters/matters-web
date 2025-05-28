import { useQuery } from '@apollo/client'
import { useContext } from 'react'

import { usePublicQuery, useRoute, ViewerContext } from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import {
  AuthorsRecommendationPublicQuery,
  LastFetchRandomQuery,
} from '~/gql/graphql'

import { AUTHORS_RECOMMENDATION_PUBLIC } from './gql'

interface UseAuthorsRecommendationProps {
  perPage?: number
  randomMaxSize?: number
  cacheField: 'feedAuthors' | 'sidebarAuthors'
  publicQuery?: boolean
}

export const useAuthorsRecommendation = ({
  perPage = 4,
  randomMaxSize = 50,
  cacheField,
  publicQuery = true,
}: UseAuthorsRecommendationProps) => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  const { data: lastFetchRandom, client } = useQuery<LastFetchRandomQuery>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom[cacheField]

  const { data, loading, error } =
    usePublicQuery<AuthorsRecommendationPublicQuery>(
      AUTHORS_RECOMMENDATION_PUBLIC,
      {
        variables: {
          random: lastRandom || 0,
          first: perPage,
          shortHash: shortHash || null,
        },
        ...(publicQuery && { publicQuery: !viewer.isAuthed }),
      }
    )

  const edges = data?.viewer?.recommendation.authors.edges

  const shuffle = () => {
    const size = Math.round(
      (data?.viewer?.recommendation.authors.totalCount || randomMaxSize) /
        perPage
    )
    const random = Math.floor(Math.min(randomMaxSize, size) * Math.random())

    lastFetchRandom &&
      client.cache.modify({
        id: client.cache.identify(lastFetchRandom.lastFetchRandom),
        fields: { [cacheField]: () => random },
      })
  }

  return {
    data,
    loading,
    error,
    edges,
    shuffle,
    viewer,
    lastRandom,
  }
}
