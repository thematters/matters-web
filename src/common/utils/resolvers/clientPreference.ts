const clientPreferenceResolver = (_: any) => {
  return {
    __typename: 'ClientPreference',
    id: 'local',
    feedSortType: 'hottest',
    followFeedType: 'article',
    viewMode: 'comfortable',
    readCivicLikerDialog: false,
    wall: true,
    push: {
      enabled: false,
      supported: false,
      __typename: 'Push',
    },
    routeHistory: [],
    onboardingTasks: {
      enabled: true,
      __typename: 'OnboardingTasks',
    },
  }
}

export default clientPreferenceResolver
