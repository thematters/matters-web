// External modules
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

// Internal modules
import { Icon } from '~/components'

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

const Unsubscribe = ({ article }: { article: BookmarkArticle }) => (
  <Mutation
    mutation={UNSUBSCRIBE_ARTICLE}
    variables={{ id: article.id }}
    optimisticResponse={{
      unsubscribeArticle: {
        id: article.id,
        subscribed: false,
        __typename: 'Article'
      }
    }}
  >
    {(unsubscribe, { data }) => (
      <button type="button" aria-label="收藏" onClick={() => unsubscribe()}>
        <Icon
          size="small"
          className="u-motion-icon-hover"
          id={ICON_BOOKMARK_SM_ACTIVE.id}
          viewBox={ICON_BOOKMARK_SM_ACTIVE.viewBox}
        />
      </button>
    )}
  </Mutation>
)

export default Unsubscribe
