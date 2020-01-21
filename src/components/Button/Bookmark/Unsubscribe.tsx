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
  size: 'xs' | 'sm' | 'md'
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
      onClick={e => {
        unsubscribe()
        e.stopPropagation()
      }}
      disabled={disabled}
    >
      {size === 'md' ? (
        <Icon.BookmarkRegularActive size="md" />
      ) : (
        <Icon.BookmarkSmallActive size={size === 'xs' ? 'xs' : undefined} />
      )}
    </button>
  )
}

export default Unsubscribe
