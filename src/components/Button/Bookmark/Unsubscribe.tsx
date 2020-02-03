import gql from 'graphql-tag'

import { Button, Icon, IconSize } from '~/components'
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
  size?: Extract<IconSize, 'md-s'>
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
    <Button
      spacing={['xtight', 'xtight']}
      bgHoverColor="grey-lighter"
      aria-label="取消收藏"
      onClick={(e: React.MouseEvent) => {
        unsubscribe()
        e.stopPropagation()
      }}
      disabled={disabled}
    >
      <Icon.BookmarkActive color="black" size={size} />
    </Button>
  )
}

export default Unsubscribe
