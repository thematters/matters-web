import { createContext, ReactNode, useContext } from 'react'

import { useRoute } from '~/components'
import { RootQueryPrivateQuery } from '~/gql/graphql'

interface ChannelsContextType {
  channels: RootQueryPrivateQuery['channels']
  isInWritingChallengeChannel: boolean
  isInCurationChannel: boolean
  isInTopicChannel: boolean
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(
  undefined
)

export const ChannelsProvider = ({
  children,
  channels,
}: {
  children: ReactNode
  channels: RootQueryPrivateQuery['channels']
}) => {
  const { isPathStartWith } = useRoute()

  const writingChallenges = channels?.filter(
    (channel) => channel.__typename === 'WritingChallenge'
  )

  const isInWritingChallengeChannel = writingChallenges?.some((challenge) =>
    isPathStartWith(`/e/${challenge.shortHash}`, true)
  )

  const curationChannels = channels?.filter(
    (channel) => channel.__typename === 'CurationChannel'
  )

  const isInCurationChannel = curationChannels?.some((channel) =>
    isPathStartWith(`/c/${channel.shortHash}`, true)
  )

  const topicChannels = channels?.filter(
    (channel) => channel.__typename === 'TopicChannel'
  )

  const isInTopicChannel = topicChannels?.some((channel) =>
    isPathStartWith(`/c/${channel.shortHash}`, true)
  )

  return (
    <ChannelsContext.Provider
      value={{
        channels,
        isInWritingChallengeChannel,
        isInCurationChannel,
        isInTopicChannel,
      }}
    >
      {children}
    </ChannelsContext.Provider>
  )
}

export const useChannels = () => {
  const context = useContext(ChannelsContext)
  if (context === undefined) {
    throw new Error('useChannels must be used within a ChannelsProvider')
  }
  return context
}
