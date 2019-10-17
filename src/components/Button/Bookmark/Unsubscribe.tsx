import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

import { Icon } from '~/components'

import ICON_BOOKMARK_REGULAR_ACTIVE from '~/static/icons/bookmark-regular-active.svg?sprite'
import ICON_BOOKMARK_SM_ACTIVE from '~/static/icons/bookmark-small-active.svg?sprite'

import { BookmarkArticle } from './__generated__/BookmarkArticle'

const UNSUBSCRIBE_ARTICLE = gql`
  mutation UnsubscribeArticle($id: ID!) {
    unsubscribeArticle(input: { id: $id }) {
      id
      subscribed
    }
  }
`

const Unsubscribe = ({
  article,
  size,
  disabled
}: {
  article: BookmarkArticle
  size: 'xsmall' | 'small' | 'default'
  disabled?: boolean
}) => {
  const [unsubscribe] = useMutation(UNSUBSCRIBE_ARTICLE, {
    variables: { id: article.id },
    optimisticResponse: {
      unsubscribeArticle: {
        id: article.id,
        subscribed: false,
        __typename: 'Article'
      }
    }
  })

  return (
    <button
      type="button"
      aria-label="收藏"
      onClick={() => unsubscribe()}
      disabled={disabled}
    >
      <Icon
        size={size}
        id={
          size === 'default'
            ? ICON_BOOKMARK_REGULAR_ACTIVE.id
            : ICON_BOOKMARK_SM_ACTIVE.id
        }
        viewBox={
          size === 'default'
            ? ICON_BOOKMARK_REGULAR_ACTIVE.viewBox
            : ICON_BOOKMARK_SM_ACTIVE.viewBox
        }
      />
    </button>
  )
}

export default Unsubscribe
