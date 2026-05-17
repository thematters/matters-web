export const COMMUNITY_WATCH_RECORD_URL = 'https://community-watch.matters.town'

export const toCommunityWatchRecordUrl = (uuid: string) =>
  `${COMMUNITY_WATCH_RECORD_URL}/records/${uuid}/`
