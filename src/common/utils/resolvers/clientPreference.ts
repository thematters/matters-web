const clientPreferenceResolver = (_: any) => {
  return {
    __typename: 'ClientPreference',
    id: 'local',
    feedSortType: 'hottest',
    followFeedType: 'article',
    readCivicLikerDialog: false,
    wall: true,
    push: {
      enabled: false,
      supported: false,
      __typename: 'Push',
    },
    routeHistory: [],
    onboardingTasks: {
      enabled: false,
      __typename: 'OnboardingTasks',
    },
    circleBanner: true,
    language: '',
  }
}

export default clientPreferenceResolver
