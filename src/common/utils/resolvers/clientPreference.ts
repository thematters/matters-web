const clientPreferenceResolver = (_: any) => {
  return {
    __typename: 'ClientPreference',
    id: 'local',
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
    announcement: 0,
    language: '',
  }
}

export default clientPreferenceResolver
