import gql from 'graphql-tag'

import Author from './Author'
import { FromAuthor } from './FromAuthor'

export const fragments = {
  article: gql`
    fragment AuthorSidebarArticle on Article {
      id
      relatedArticles(input: { first: 0 }) {
        totalCount
      }
      ...AuthorSidebarAuthorArticle
      ...AuthorSidebarFromAuthor
    }
    ${Author.fragments.article}
    ${FromAuthor.fragments.article}
  `,
}
