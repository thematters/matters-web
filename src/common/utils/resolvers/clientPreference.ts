export default (_: any) => {
  return {
    id: 'local',
    feedSortType: 'hottest',
    readCivicLikerModal: false,
    wall: true,
    push: {
      enabled: false,
      supported: false,
      __typename: 'Push'
    },
    __typename: 'ClientPreference'
  }
}
