import gql from 'graphql-tag'

import AddButton from './AddButton'

export const fragments = {
  chapter: gql`
    fragment ChapterHeadChapter on Chapter {
      id
      title
      articleCount
      ...AddButtonChapter
    }
    ${AddButton.fragments.chapter}
  `,
}
