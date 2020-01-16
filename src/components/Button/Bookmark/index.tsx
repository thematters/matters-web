import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components/Viewer'

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
  size = 'sm'
}: {
  article: BookmarkArticle
  size?: 'xs' | 'sm' | 'md'
}) => {
  const viewer = useContext(ViewerContext)

  if (article.subscribed) {
    return (
      <Unsubscribe
        article={article}
        size={size}
        disabled={viewer.isArchived || viewer.isFrozen}
      />
    )
  } else {
    return (
      <Subscribe
        article={article}
        size={size}
        disabled={viewer.isArchived || viewer.isFrozen}
      />
    )
  }
}

BookmarkButton.fragments = fragments
