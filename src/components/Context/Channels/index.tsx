import { createContext, ReactNode, useContext } from 'react'

import { useRoute } from '~/components'
import { ChannelsQuery } from '~/gql/graphql'

interface ChannelsContextType {
  channels: any[]
  isInWritingChallengeChannel: boolean
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(
  undefined
)

export const ChannelsProvider = ({
  children,
  channels,
}: {
  children: ReactNode
  channels: ChannelsQuery['channels']
}) => {
  const { isPathStartWith } = useRoute()

  const writingChallenges = channels?.filter(
    (channel) => channel.__typename === 'WritingChallenge'
  )

  const isInWritingChallengeChannel = writingChallenges?.some((challenge) =>
    isPathStartWith(`/e/${challenge.shortHash}`, true)
  )

  return (
    <ChannelsContext.Provider
      value={{
        channels,
        isInWritingChallengeChannel,
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
