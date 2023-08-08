import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  // numAbbr,
  translate,
} from '~/common/utils'
import {
  Button,
  IconDownVote16,
  IconDownVoted16,
  LanguageContext,
  TextIcon,
  useMutation,
} from '~/components'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT,
} from '~/components/GQL/mutations/voteComment'
import {
  DownvoteCommentPrivateFragment,
  DownvoteCommentPublicFragment,
  UnvoteCommentMutation,
  VoteCommentMutation,
} from '~/gql/graphql'

interface DownvoteButtonProps {
  comment: DownvoteCommentPublicFragment &
    Partial<DownvoteCommentPrivateFragment>
  onClick?: () => void
  disabled?: boolean
  inCard: boolean
}

const fragments = {
  comment: {
    public: gql`
      fragment DownvoteCommentPublic on Comment {
        id
        upvotes
        downvotes
      }
    `,
    private: gql`
      fragment DownvoteCommentPrivate on Comment {
        id
        myVote
      }
    `,
  },
}

const DownvoteButton = ({
  comment,
  onClick,
  disabled,
  inCard,
}: DownvoteButtonProps) => {
  const { lang } = useContext(LanguageContext)

  const [unvote] = useMutation<UnvoteCommentMutation>(UNVOTE_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unvoteComment: {
        id: comment.id,
        upvotes: comment.upvotes,
        downvotes: 0,
        myVote: null,
        __typename: 'Comment',
      },
    },
  })
  const [downvote] = useMutation<VoteCommentMutation>(VOTE_COMMENT, {
    variables: { id: comment.id, vote: 'down' },
    optimisticResponse: {
      voteComment: {
        id: comment.id,
        upvotes:
          comment.myVote === 'up' ? comment.upvotes - 1 : comment.upvotes,
        downvotes: 0,
        myVote: 'down' as any,
        __typename: 'Comment',
      },
    },
  })

  if (comment.myVote === 'down') {
    return (
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
        onClick={() => {
          onClick ? onClick() : unvote()
        }}
        disabled={disabled}
        aria-label={translate({
          zh_hant: '取消點踩',
          zh_hans: '取消点踩',
          en: 'Undo Downvote',
          lang,
        })}
      >
        <TextIcon icon={<IconDownVoted16 />} color="green" weight="md">
          {/* comment.downvotes > 0 ? numAbbr(comment.downvotes) : undefined */}
        </TextIcon>
      </Button>
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgActiveColor={inCard ? 'greyLighterActive' : 'greyLighter'}
      onClick={() => {
        onClick ? onClick() : downvote()
      }}
      disabled={disabled}
      aria-label={translate({
        zh_hant: '點踩',
        zh_hans: '点踩',
        en: 'Downvote',
        lang,
      })}
    >
      <TextIcon icon={<IconDownVote16 color="grey" />} color="grey" weight="md">
        {/* comment.downvotes > 0 ? numAbbr(comment.downvotes) : undefined */}
      </TextIcon>
    </Button>
  )
}

DownvoteButton.fragments = fragments

export default DownvoteButton
