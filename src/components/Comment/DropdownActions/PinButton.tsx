import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

import { PinButtonComment } from './__generated__/PinButtonComment'
import { PinComment } from './__generated__/PinComment'
import { UnpinComment } from './__generated__/UnpinComment'

const PIN_COMMENT = gql`
  mutation PinComment($id: ID!) {
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
  mutation UnpinComment($id: ID!) {
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
  <TextIcon icon={<Icon.UnPin />} spacing="tight">
    <Translate zh_hant={TEXT.zh_hant.unpin} zh_hans={TEXT.zh_hans.unpin} />
  </TextIcon>
)

const TextIconPin = () => (
  <TextIcon icon={<Icon.PinToTop />} spacing="tight">
    <Translate zh_hant={TEXT.zh_hant.pin} zh_hans={TEXT.zh_hans.pin} />
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
  const [unpinComment] = useMutation<UnpinComment>(UNPIN_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unpinComment: {
        id: comment.id,
        pinned: false,
        article: {
          ...comment.article
        },
        __typename: 'Comment'
      }
    }
  })
  const [pinComment] = useMutation<PinComment>(PIN_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      pinComment: {
        id: comment.id,
        pinned: true,
        article: {
          ...comment.article
        },
        __typename: 'Comment'
      }
    }
  })

  if (comment.pinned) {
    return (
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
    )
  }

  return (
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
  )
}

PinButton.fragments = fragments

export default PinButton
