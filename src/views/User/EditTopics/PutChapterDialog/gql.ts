import gql from 'graphql-tag'

export const PUT_CHAPTER = gql`
  mutation PutChapter($input: PutChapterInput!) {
    putChapter(input: $input) {
      id
      title
      description
    }
  }
`

export const fragments = {
  chapter: gql`
    fragment PutChapterDialogChapter on Chapter {
      id
      title
      description
      topic {
        id
      }
    }
  `,
}
