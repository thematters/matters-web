const fetchRecordResolver = (_: any) => {
  return {
    __typename: 'FetchRecord',
    id: 'local',
    sidebarTags: false,
    feedTags: false,
    sidebarAuthors: false,
    feedAuthors: false,
  }
}

export default fetchRecordResolver
