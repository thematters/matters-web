const clientPreferenceResolver = (_: any) => {
  return {
    __typename: 'ClientPreference',
    id: 'local',
    readCivicLikerDialog: false,
    wall: true,
    routeHistory: [],
    onboardingTasks: {
      enabled: false,
      __typename: 'OnboardingTasks',
    },
    circleBanner: true,
  }
}

export default clientPreferenceResolver
