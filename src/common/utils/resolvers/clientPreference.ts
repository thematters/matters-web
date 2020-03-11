export default (_: any) => {
  return {
    id: 'local',
    feedSortType: 'hottest',
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
