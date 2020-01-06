import gql from 'graphql-tag'

import { Icon } from '~/components'
import { useMutation } from '~/components/GQL'

import { BookmarkArticle } from './__generated__/BookmarkArticle'
import { UnsubscribeArticle } from './__generated__/UnsubscribeArticle'

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
  size: 'xs' | 'sm' | 'default'
  disabled?: boolean
}) => {
  const [unsubscribe] = useMutation<UnsubscribeArticle>(UNSUBSCRIBE_ARTICLE, {
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
      {size === 'default' ? (
        <Icon.BookmarkRegularActive size={size} />
      ) : (
        <Icon.BookmarkSmallActive size={size === 'xs' ? 'xxs' : size} />
      )}
    </button>
  )
}

export default Unsubscribe
