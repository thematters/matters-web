const clientPreferenceResolver = (_: any) => {
  return {
    __typename: 'ClientPreference',
    id: 'local',
    wall: true,
    circleBanner: true,
  }
}

export default clientPreferenceResolver
