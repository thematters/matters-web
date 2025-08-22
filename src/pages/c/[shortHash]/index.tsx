import { useRoute } from '~/components'
import { useChannels } from '~/components/Context'
import Home from '~/views/Home'

const Channel = () => {
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const { channels, isInCurationChannel } = useChannels()
  if (!isInCurationChannel) {
    return <Home showRecommendation={true} />
  }
  const channel = channels?.find((channel) => channel.shortHash === shortHash)
  const showRecommendation =
    channel?.__typename === 'CurationChannel' && channel?.showRecommendation
  return <Home showRecommendation={showRecommendation} />
}

export default Channel
