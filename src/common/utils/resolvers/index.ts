import clientInfo from './clientInfo'
import clientPreference from './clientPreference'
import commentDraft from './commentDraft'
import gatewayUrls from './gatewayUrls'

export default {
  Query: {
    commentDraft,
    clientPreference,
    clientInfo
  },
  Official: {
    gatewayUrls
  }
}
