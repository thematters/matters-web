import { STORE_KEY_VIEW_MODE } from '~/common/enums'

export default (_: any) => {
  let viewMode = 'default'

  if (process.browser) {
    viewMode = localStorage.getItem(STORE_KEY_VIEW_MODE) || viewMode
  }

  console.log({ viewMode })

  return {
    id: 'local',
    feedSortType: 'hottest',
    viewMode: 'default',
    readCivicLikerDialog: false,
    wall: true,
    push: {
      enabled: false,
      supported: false,
      __typename: 'Push'
    },
    routeHistory: [],
    __typename: 'ClientPreference'
  }
}
