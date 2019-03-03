import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Mutation } from 'react-apollo'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

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
    <Translate zh_hant="取消置頂" zh_hans="取消置顶" />
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
    <Translate zh_hant="置頂" zh_hans="置顶" />
  </TextIcon>
)

const PinButton = ({
  comment,
  hideDropdown
}: {
  comment: PinButtonComment
  hideDropdown: () => void
}) => {
  const canPin = comment.article.pinCommentLeft > 0

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
