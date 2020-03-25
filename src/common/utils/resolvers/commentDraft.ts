export default (root: any, { input: { id } }: { input: { id: string } }) => {
  return {
    id,
    content: root?.commentDraft?.content || '',
    __typename: 'CommentDraft',
  }
}
