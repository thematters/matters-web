import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon } from '~/components'

// import ICON_LIKE_ACTIVE from '~/static/icons/like-active.svg?sprite'
import ICON_LIKE_INACTIVE from '~/static/icons/like-inactive.svg?sprite'

import { UpvoteComment } from './__generated__/UpvoteComment'

const fragments = {
  comment: gql`
    fragment UpvoteComment on Comment {
      upvotes
      myVote
    }
  `
}

const UpvoteButton = ({ comment }: { comment: UpvoteComment }) => (
  <TextIcon
    icon={
      <Icon
        id={ICON_LIKE_INACTIVE.id}
        viewBox={ICON_LIKE_INACTIVE.viewBox}
        size="small"
      />
    }
    color="grey"
    weight="medium"
    text={comment.upvotes}
    size="sm"
    spacing="xxxtight"
  />
)

UpvoteButton.fragments = fragments

export default UpvoteButton
