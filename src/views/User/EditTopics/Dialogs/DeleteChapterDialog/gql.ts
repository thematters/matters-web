import gql from 'graphql-tag'

export const DELETE_CHAPTER = gql`
  mutation DeleteChapter($id: ID!, $chapters: [ID!]) {
    putTopic(input: { id: $id, chapters: $chapters }) {
      id
      chapters {
        id
      }
    }
  }
`

export const fragments = {
  chapter: gql`
    fragment DeleteChapterDialogChapter on Chapter {
      id
      topic {
        id
        chapters {
          id
        }
      }
    }
  `,
}
