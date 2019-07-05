export default (_: any, { input: { id } }: { input: { id: string } }) => {
  return {
    id,
    content: '',
    __typename: 'CommentDraft'
  }
}
