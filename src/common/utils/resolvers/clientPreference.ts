export default (_: any) => {
  return {
    id: 'local',
    feedSortType: 'hottest',
    viewMode: 'comfortable',
    readCivicLikerDialog: false,
    wall: true,
    push: {
      enabled: false,
      supported: false,
      __typename: 'Push',
    },
    routeHistory: [],
    followFeedType: 'article',
    __typename: 'ClientPreference',
  }
}
