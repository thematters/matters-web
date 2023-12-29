import gql from 'graphql-tag'
import { useContext } from 'react'

import { ButtonProps, IconSize, ViewerContext } from '~/components'
import { BookmarkArticlePrivateFragment } from '~/gql/graphql'

import Subscribe from './Subscribe'
import Unsubscribe from './Unsubscribe'

export type BookmarkButtonProps = {
  article: Partial<BookmarkArticlePrivateFragment>
  iconSize?: Extract<IconSize, 'mdS' | 'md'>
  inCard?: boolean
  showText?: boolean
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
  showText,
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
        showText={showText}
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
        showText={showText}
        {...buttonProps}
      />
    )
  }
}

BookmarkButton.fragments = fragments
