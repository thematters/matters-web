export default (_: any) => {
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
