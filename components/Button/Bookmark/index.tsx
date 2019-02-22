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

export const BookmarkButton = ({
  article,
  size = 'small'
}: {
  article: BookmarkArticle
  size?: 'small' | 'default'
}) => {
  if (article.subscribed) {
    return <Unsubscribe article={article} size={size} />
  } else {
    return <Subscribe article={article} size={size} />
  }
}

BookmarkButton.fragments = fragments
