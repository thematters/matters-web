import gql from 'graphql-tag'
import { useContext } from 'react'

import { IconSize, ViewerContext } from '~/components'
import { BookmarkArticlePrivateFragment } from '~/gql/graphql'

import Subscribe from './Subscribe'
import Unsubscribe from './Unsubscribe'

interface BookmarkButtonProps {
  article: Partial<BookmarkArticlePrivateFragment>
  size?: Extract<IconSize, 'mdS' | 'md'>
  inCard?: boolean
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
