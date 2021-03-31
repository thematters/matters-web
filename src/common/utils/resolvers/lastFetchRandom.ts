const lastFetchRandomResolver = (_: any) => {
  return {
    __typename: 'LastFetchRandom',
    id: 'local',
    sidebarTags: null,
    feedTags: null,
    sidebarAuthors: null,
    feedAuthors: null,
  }
}

export default lastFetchRandomResolver
