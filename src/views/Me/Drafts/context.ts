import { createCacheContext } from '~/components/Hook'
import { MeDraftFeedQuery } from '~/gql/graphql'

type Edges = NonNullable<
  NonNullable<MeDraftFeedQuery['viewer']>['drafts']['edges']
>

export const DraftsContext = createCacheContext<Edges>()
