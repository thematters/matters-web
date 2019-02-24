import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Icon } from '~/components'

import ICON_BOOKMARK_REGULAR_INACTIVE from '~/static/icons/bookmark-regular-inactive.svg?sprite'
import ICON_BOOKMARK_SM_INACTIVE from '~/static/icons/bookmark-small-inactive.svg?sprite'

import { BookmarkArticle } from './__generated__/BookmarkArticle'

const SUBSCRIBE_ARTICLE = gql`
  mutation SubscribeArticle($id: ID!) {
    subscribeArticle(input: { id: $id }) {
      id
      subscribed
    }
  }
`

const Subscribe = ({
  article,
  size
}: {
  article: BookmarkArticle
  size: 'small' | 'default'
}) => (
  <Mutation
    mutation={SUBSCRIBE_ARTICLE}
    variables={{ id: article.id }}
    optimisticResponse={{
      subscribeArticle: {
        id: article.id,
        subscribed: true,
        __typename: 'Article'
      }
    }}
  >
    {(subscribe, { data }) => (
      <button type="button" aria-label="收藏" onClick={() => subscribe()}>
        <Icon
          size={size}
          className="u-motion-icon-hover"
          id={
            size === 'small'
              ? ICON_BOOKMARK_SM_INACTIVE.id
              : ICON_BOOKMARK_REGULAR_INACTIVE.id
          }
          viewBox={
            size === 'small'
              ? ICON_BOOKMARK_SM_INACTIVE.viewBox
              : ICON_BOOKMARK_REGULAR_INACTIVE.viewBox
          }
        />
      </button>
    )}
  </Mutation>
)

export default Subscribe
