import gql from 'graphql-tag'
import { useContext } from 'react'

import { IconSize, ViewerContext } from '~/components'

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
  size
}: {
  article: BookmarkArticle
  size?: Extract<IconSize, 'md-s'>
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
