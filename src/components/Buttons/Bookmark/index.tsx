import { gql } from '@apollo/client'
import { useContext } from 'react'

import { IconSize, ViewerContext } from '~/components'

import Subscribe from './Subscribe'
import Unsubscribe from './Unsubscribe'

import { BookmarkArticlePrivate } from './__generated__/BookmarkArticlePrivate'

interface BookmarkButtonProps {
  article: Partial<BookmarkArticlePrivate>
  size?: Extract<IconSize, 'md-s'>
  inCard: boolean
}

const fragments = {
  article: {
    private: gql`
      fragment BookmarkArticlePrivate on Article {
        id
        subscribed
      }
    `,
  },
}

export const BookmarkButton = ({
  article,
  size,
  inCard,
}: BookmarkButtonProps) => {
  const viewer = useContext(ViewerContext)

  if (article.subscribed) {
    return (
      <Unsubscribe
        articleId={article.id}
        size={size}
        disabled={viewer.isArchived}
        inCard={inCard}
      />
    )
  } else {
    return (
      <Subscribe
        articleId={article.id}
        size={size}
        disabled={viewer.isArchived}
        inCard={inCard}
      />
    )
  }
}

BookmarkButton.fragments = fragments
