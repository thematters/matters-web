import clientInfo from './clientInfo'
import clientPreference from './clientPreference'
import commentDraft from './commentDraft'
import fetchRecord from './fetchRecord'
import gatewayUrls from './gatewayUrls'

export default {
  Query: {
    commentDraft,
    clientPreference,
    clientInfo,
    fetchRecord,
  },
  Official: {
    gatewayUrls,
  },
}
