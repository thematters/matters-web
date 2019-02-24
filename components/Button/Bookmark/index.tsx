import gql from 'graphql-tag'

import { BookmarkArticle } from './__generated__/BookmarkArticle'
import Subscribe from './Subscribe'
import Unsubscribe from './Unsubscribe'

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
