import gql from 'graphql-tag'

import Author from './Author'

export const fragments = {
  article: gql`
    fragment AuthorSidebarArticle on Article {
      id
      ...AuthorSidebarAuthorArticle
    }
    ${Author.fragments.article}
  `,
}
