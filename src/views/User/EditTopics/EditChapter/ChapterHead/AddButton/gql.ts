import gql from 'graphql-tag'

export const ADD_CHAPTER_ARTICLES = gql`
  mutation AddChapterArticles($input: PutChapterInput!) {
    putChapter(input: $input) {
      id
    }
  }
`

export const fragments = {
  chapter: gql`
    fragment AddButtonChapter on Chapter {
      id
      articles {
        id
      }
    }
  `,
}
