import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon } from '~/components'
import { Mutation } from '~/components/GQL'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT
} from '~/components/GQL/mutations/voteComment'

import { numAbbr } from '~/common/utils'
import ICON_LIKE_ACTIVE from '~/static/icons/like-active.svg?sprite'
import ICON_LIKE_INACTIVE from '~/static/icons/like-inactive.svg?sprite'

import { UpvoteComment } from './__generated__/UpvoteComment'

const fragments = {
  comment: gql`
    fragment UpvoteComment on Comment {
      id
      upvotes
      downvotes
      myVote
    }
  `
}

const IconLikeInactive = () => (
  <Icon
    id={ICON_LIKE_INACTIVE.id}
    viewBox={ICON_LIKE_INACTIVE.viewBox}
    size="small"
  />
)
const IconLikeActive = () => (
  <Icon
    id={ICON_LIKE_ACTIVE.id}
    viewBox={ICON_LIKE_ACTIVE.viewBox}
    size="small"
  />
)

const UpvoteButton = ({
  comment,
  disabled
}: {
  comment: UpvoteComment
  disabled?: boolean
}) => {
  if (comment.myVote === 'up') {
    return (
      <Mutation
        mutation={UNVOTE_COMMENT}
        variables={{ id: comment.id }}
        optimisticResponse={{
          unvoteComment: {
            id: comment.id,
            myVote: null,
            __typename: 'Comment'
          }
        }}
      >
        {(unvote: any, { data }: any) => (
          <button type="button" onClick={() => unvote()} disabled={disabled}>
            <TextIcon
              icon={<IconLikeActive />}
              color="grey"
              weight="medium"
              text={numAbbr(comment.upvotes)}
              size="sm"
              spacing="xxxtight"
            />
          </button>
        )}
      </Mutation>
    )
  }

  return (
    <Mutation
      mutation={VOTE_COMMENT}
      variables={{ id: comment.id }}
      optimisticResponse={{
        voteComment: {
          id: comment.id,
          myVote: 'up',
          __typename: 'Comment'
        }
      }}
    >
      {(upvote: any, { data }: any) => (
        <button type="button" onClick={() => upvote()} disabled={disabled}>
          <TextIcon
            icon={<IconLikeInactive />}
            color="grey"
            weight="medium"
            text={numAbbr(comment.upvotes)}
            size="sm"
            spacing="xxxtight"
          />
        </button>
      )}
    </Mutation>
  )
}

UpvoteButton.fragments = fragments

export default UpvoteButton
