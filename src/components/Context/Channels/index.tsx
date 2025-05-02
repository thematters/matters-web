import { createContext, ReactNode, useContext } from 'react'

import { LanguageContext, useRoute } from '~/components'
import { usePublicQuery } from '~/components/GQL'
import { CHANNELS } from '~/components/GQL/queries/channels'
import { ChannelsQuery } from '~/gql/graphql'

interface ChannelsContextType {
  channels: any[]
  isInWritingChallengeChannel: boolean
  loading: boolean
}

const ChannelsContext = createContext<ChannelsContextType | undefined>(
  undefined
)

export const ChannelsProvider = ({ children }: { children: ReactNode }) => {
  const { isPathStartWith } = useRoute()
  const { lang } = useContext(LanguageContext)
  const { data, loading } = usePublicQuery<ChannelsQuery>(CHANNELS, {
    variables: { userLanguage: lang },
  })

  const channels = data?.channels || []

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
        loading,
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
