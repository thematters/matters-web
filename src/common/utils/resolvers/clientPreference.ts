const clientPreferenceResolver = (_: any) => {
  return {
    __typename: 'ClientPreference',
    id: 'local',
    wall: true,
    routeHistory: [],
    circleBanner: true,
  }
}

export default clientPreferenceResolver
