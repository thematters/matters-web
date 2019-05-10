import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon, TextIcon, Translate } from '~/components'
import { Mutation } from '~/components/GQL'
import ARTICLE_COMMENTS from '~/components/GQL/queries/articleComments'

import { TEXT } from '~/common/enums'
import ICON_PIN_TO_TOP from '~/static/icons/pin-to-top.svg?sprite'
import ICON_UNPIN from '~/static/icons/unpin.svg?sprite'

import { PinButtonComment } from './__generated__/PinButtonComment'
import styles from './styles.css'

const PIN_COMMENT = gql`
  mutation pinComment($id: ID!) {
    pinComment(input: { id: $id }) {
      id
      pinned
      article {
        id
        pinCommentLimit
        pinCommentLeft
      }
    }
  }
`

const UNPIN_COMMENT = gql`
  mutation unpinComment($id: ID!) {
    unpinComment(input: { id: $id }) {
      id
      pinned
      article {
        id
        pinCommentLimit
        pinCommentLeft
      }
    }
  }
`

const fragments = {
  comment: gql`
    fragment PinButtonComment on Comment {
      id
      pinned
      article {
        id
        mediaHash
        pinCommentLimit
        pinCommentLeft
      }
    }
  `
}

const TextIconUnpin = () => (
  <TextIcon
    icon={<Icon id={ICON_UNPIN.id} viewBox={ICON_UNPIN.viewBox} size="small" />}
    spacing="tight"
  >
    <Translate
      zh_hant={TEXT.zh_hant.cancelPin}
      zh_hans={TEXT.zh_hans.cancelPin}
    />
  </TextIcon>
)

const TextIconPin = () => (
  <TextIcon
    icon={
      <Icon
        id={ICON_PIN_TO_TOP.id}
        viewBox={ICON_PIN_TO_TOP.viewBox}
        size="small"
      />
    }
    spacing="tight"
  >
    <Translate zh_hant={TEXT.zh_hant.pin} zh_hans={TEXT.zh_hans.pin} />
  </TextIcon>
)

const PinButton = ({
  comment,
  hideDropdown,
  refetch
}: {
  comment: PinButtonComment
  hideDropdown: () => void
  refetch?: boolean
}) => {
  const canPin = comment.article.pinCommentLeft > 0
  const { mediaHash } = comment.article
  const refetchQueries =
    refetch && mediaHash
      ? [
          {
            query: ARTICLE_COMMENTS,
            variables: { mediaHash }
          }
        ]
      : []

  if (comment.pinned) {
    return (
      <Mutation
        mutation={UNPIN_COMMENT}
        variables={{ id: comment.id }}
        optimisticResponse={{
          unpinComment: {
            id: comment.id,
            pinned: false,
            __typename: 'Comment'
          }
        }}
        refetchQueries={refetchQueries}
      >
        {unpinComment => (
          <button
            type="button"
            onClick={() => {
              unpinComment()
              hideDropdown()
            }}
          >
            <TextIconUnpin />
            <style jsx>{styles}</style>
          </button>
        )}
      </Mutation>
    )
  }

  return (
    <Mutation
      mutation={PIN_COMMENT}
      variables={{ id: comment.id }}
      optimisticResponse={{
        pinComment: {
          id: comment.id,
          pinned: true,
          __typename: 'Comment'
        }
      }}
      refetchQueries={refetchQueries}
    >
      {pinComment => (
        <button
          type="button"
          onClick={() => {
            pinComment()
            hideDropdown()
          }}
          disabled={!canPin}
        >
          <TextIconPin />
          <style jsx>{styles}</style>
        </button>
      )}
    </Mutation>
  )
}

PinButton.fragments = fragments

export default PinButton
