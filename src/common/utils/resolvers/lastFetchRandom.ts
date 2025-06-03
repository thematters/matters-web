const lastFetchRandomResolver = () => {
  // time-based random for better homepage UX on SSR
  const minutes = new Date().getMinutes()
  const max = 10
  const random = minutes % max

  return {
    __typename: 'LastFetchRandom',
    id: 'local',
    sidebarTags: random,
    feedTags: random,
    sidebarAuthors: random,
    feedAuthors: random,
  }
}

export default lastFetchRandomResolver
