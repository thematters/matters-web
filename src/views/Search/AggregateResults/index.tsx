import { usePullToRefresh } from '~/components'

import Articles from './Articles'
import Tags from './Tags'
import Users from './Users'

const AggregateResults = () => {
  usePullToRefresh.Register()

  return (
    <>
      <Tags />
      <Users />
      <Articles />
    </>
  )
}

export default AggregateResults
