import clientPreference from './clientPreference'
import gatewayUrls from './gatewayUrls'
import lastFetchRandom from './lastFetchRandom'

export const resolvers = {
  Query: {
    clientPreference,
    lastFetchRandom,
  },
  Official: {
    gatewayUrls,
  },
}
