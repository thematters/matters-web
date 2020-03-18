import gql from 'graphql-tag'
import { useContext } from 'react'

import { IconSize, ViewerContext } from '~/components'

import Subscribe from './Subscribe'
import Unsubscribe from './Unsubscribe'

import { BookmarkArticle } from './__generated__/BookmarkArticle'

interface BookmarkButtonProps {
  article: BookmarkArticle
  size?: Extract<IconSize, 'md-s'>
  inCard: boolean
}

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
  size,
  inCard
}: BookmarkButtonProps) => {
  const viewer = useContext(ViewerContext)

  if (article.subscribed) {
    return (
      <Unsubscribe
        articleId={article.id}
        size={size}
        disabled={viewer.isArchived || viewer.isFrozen}
        inCard={inCard}
      />
    )
  } else {
    return (
      <Subscribe
        articleId={article.id}
        size={size}
        disabled={viewer.isArchived || viewer.isFrozen}
        inCard={inCard}
      />
    )
  }
}

BookmarkButton.fragments = fragments
