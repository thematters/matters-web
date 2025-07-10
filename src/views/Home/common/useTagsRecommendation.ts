import { useQuery } from '@apollo/client'

import { usePublicQuery, useRoute } from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import {
  LastFetchRandomQuery,
  TagsRecommendationPublicQuery,
} from '~/gql/graphql'

import { TAGS_RECOMMENDATION_PUBLIC } from './gql'

interface UseTagsRecommendationProps {
  perPage?: number
  cacheField: 'feedTags' | 'sidebarTags'
  publicQuery?: boolean
}

export const useTagsRecommendation = ({
  perPage = 6,
  cacheField,
  publicQuery = false,
}: UseTagsRecommendationProps) => {
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  const { data: lastFetchRandom } = useQuery<LastFetchRandomQuery>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom[cacheField]

  const { data, loading, error } =
    usePublicQuery<TagsRecommendationPublicQuery>(TAGS_RECOMMENDATION_PUBLIC, {
      variables: {
        random: lastRandom || 0,
        first: perPage,
        shortHash: shortHash || null,
      },
      ...(publicQuery && { publicQuery: true }),
    })

  const edges = data?.viewer?.recommendation.tags.edges

  return {
    data,
    loading,
    error,
    edges,
  }
}
