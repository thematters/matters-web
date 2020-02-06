import gql from 'graphql-tag'

import { Icon, Menu, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'

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
  const onPin = () => {
    pinComment()
    hideDropdown()
  }
  const onUnPin = () => {
    unpinComment()
    hideDropdown()
  }

  if (comment.pinned) {
    return (
      <Menu.Item onClick={onUnPin}>
        <TextIcon
          icon={<Icon.UnPinMedium size="md" />}
          size="md"
          spacing="base"
        >
          <Translate
            zh_hant={TEXT.zh_hant.unpin}
            zh_hans={TEXT.zh_hans.unpin}
          />
        </TextIcon>
      </Menu.Item>
    )
  }

  return (
    <Menu.Item onClick={canPin ? onPin : undefined}>
      <TextIcon icon={<Icon.PinMedium size="md" />} size="md" spacing="base">
        <Translate zh_hant={TEXT.zh_hant.pin} zh_hans={TEXT.zh_hans.pin} />
      </TextIcon>
    </Menu.Item>
  )
}

PinButton.fragments = fragments

export default PinButton
