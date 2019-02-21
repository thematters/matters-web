// External modules
import gql from 'graphql-tag'

// Internal modules
import Subscribe from './Subscribe'
import Unsubscribe from './Unsubscribe'

import { BookmarkArticle } from './__generated__/BookmarkArticle'

const fragments = {
  article: gql`
    fragment BookmarkArticle on Article {
      id
      subscribed
    }
  `
}

export const BookmarkButton = ({ article }: { article: BookmarkArticle }) => {
  if (article.subscribed) {
    return <Unsubscribe article={article} />
  } else {
    return <Subscribe article={article} />
  }
}

BookmarkButton.fragments = fragments
