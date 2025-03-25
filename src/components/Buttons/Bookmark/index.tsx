import gql from 'graphql-tag'
import { useContext } from 'react'

import { ButtonProps, IconSize, ViewerContext } from '~/components'
import { BookmarkArticlePrivateFragment } from '~/gql/graphql'

import Bookmark from './Bookmark'
import Unbookmark from './Unbookmark'

export type BookmarkButtonProps = {
  article: Partial<BookmarkArticlePrivateFragment>
  iconSize?: Extract<IconSize, 20 | 24>
  inCard?: boolean
} & ButtonProps

const fragments = {
  article: {
    private: gql`
      fragment BookmarkArticlePrivate on Article {
        id
        bookmarked
      }
    `,
  },
}

export const BookmarkButton = ({
  article,
  iconSize,
  inCard,
  ...buttonProps
}: BookmarkButtonProps) => {
  const viewer = useContext(ViewerContext)

  if (!article.id) {
    return null
  }

  if (article.bookmarked) {
    return (
      <Unbookmark
        articleId={article.id}
        iconSize={iconSize}
        disabled={viewer.isArchived}
        inCard={inCard}
        {...buttonProps}
      />
    )
  } else {
    return (
      <Bookmark
        articleId={article.id}
        iconSize={iconSize}
        disabled={viewer.isArchived}
        inCard={inCard}
        {...buttonProps}
      />
    )
  }
}

BookmarkButton.fragments = fragments
