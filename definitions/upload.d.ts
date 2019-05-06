type Upload = (input: {
  file?: any
  url?: string
}) => Promise<{
  id: string
  path: string
}>
