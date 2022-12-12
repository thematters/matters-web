export type SearchType = 'article' | 'user' | 'tag' | undefined

export const getSearchType = (value: string): SearchType => {
  const types = ['article', 'user', 'tag']
  return types.includes(value) ? (value as SearchType) : undefined
}
