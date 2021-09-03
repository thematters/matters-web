import { Layout, useRoute } from '~/components'

const Topics = () => {
  const { getQuery } = useRoute()
  const id = getQuery('topicId')

  return <Layout.Main>Topics: {id}</Layout.Main>
}

export default Topics
