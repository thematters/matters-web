import gql from 'graphql-tag'

export const fragments = {
  chapter: gql`
    fragment ChapterListChapter on Chapter {
      id
      title
      articleCount
    }
  `,
}
