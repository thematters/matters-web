const clientPreferenceResolver = (_: any) => {
  return {
    __typename: 'ClientPreference',
    id: 'local',
    readCivicLikerDialog: false,
    wall: true,
    routeHistory: [],
    circleBanner: true,
  }
}

export default clientPreferenceResolver
