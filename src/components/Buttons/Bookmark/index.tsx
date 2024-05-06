import gql from 'graphql-tag'
import { useContext } from 'react'

import { ButtonProps, IconSize, ViewerContext } from '~/components'
import { BookmarkArticlePrivateFragment } from '~/gql/graphql'

import Subscribe from './Subscribe'
import Unsubscribe from './Unsubscribe'

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
        subscribed
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

  if (article.subscribed) {
    return (
      <Unsubscribe
        articleId={article.id}
        iconSize={iconSize}
        disabled={viewer.isArchived}
        inCard={inCard}
        {...buttonProps}
      />
    )
  } else {
    return (
      <Subscribe
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
