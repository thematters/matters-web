import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon } from '~/components'

import ICON_DISLIKE_INACTIVE from '~/static/icons/dislike-inactive.svg?sprite'

import { DownvoteComment } from './__generated__/DownvoteComment'

const fragments = {
  comment: gql`
    fragment DownvoteComment on Comment {
      downvotes
      myVote
    }
  `
}

const DownvoteButton = ({ comment }: { comment: DownvoteComment }) => (
  <TextIcon
    icon={
      <Icon
        id={ICON_DISLIKE_INACTIVE.id}
        viewBox={ICON_DISLIKE_INACTIVE.viewBox}
        size="small"
      />
    }
  />
)

DownvoteButton.fragments = fragments

export default DownvoteButton
