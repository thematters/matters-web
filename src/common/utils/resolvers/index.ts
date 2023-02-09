import clientPreference from './clientPreference'
import commentDraft from './commentDraft'
import gatewayUrls from './gatewayUrls'
import lastFetchRandom from './lastFetchRandom'

export const resolvers = {
  Query: {
    commentDraft,
    clientPreference,
    lastFetchRandom,
  },
  Official: {
    gatewayUrls,
  },
}
