import gql from 'graphql-tag'

import { Icon, Menu, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'

import { CollapseButtonComment } from './__generated__/CollapseButtonComment'
import { CollapseComment } from './__generated__/CollapseComment'

const COLLAPSE_COMMENT = gql`
  mutation CollapseComment($id: ID!, $state: CommentState!) {
    updateCommentsState(input: { ids: [$id], state: $state }) {
      id
      state
    }
  }
`

const fragments = {
  comment: gql`
    fragment CollapseButtonComment on Comment {
      id
      state
    }
  `
}

const CollapseButton = ({ comment }: { comment: CollapseButtonComment }) => {
  const [collapseComment] = useMutation<CollapseComment>(COLLAPSE_COMMENT, {
    variables: { id: comment.id, state: 'collapsed' },
    optimisticResponse: {
      updateCommentsState: [
        {
          id: comment.id,
          state: 'collapsed' as any,
          __typename: 'Comment'
        }
      ]
    }
  })
  const [uncollapseComment] = useMutation<CollapseComment>(COLLAPSE_COMMENT, {
    variables: { id: comment.id, state: 'active' },
    optimisticResponse: {
      updateCommentsState: [
        {
          id: comment.id,
          state: 'active' as any,
          __typename: 'Comment'
        }
      ]
    }
  })

  if (comment.state === 'collapsed') {
    return (
      <Menu.Item onClick={uncollapseComment}>
        <TextIcon icon={<Icon.Expand size="md" />} size="md" spacing="base">
          <Translate id="uncollapseComment" />
        </TextIcon>
      </Menu.Item>
    )
  }

  return (
    <Menu.Item
      onClick={() => {
        collapseComment()
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id="successCollapseComment" />
            }
          })
        )
      }}
    >
      <TextIcon icon={<Icon.Collapse size="md" />} size="md" spacing="base">
        <Translate id="collapseComment" />
      </TextIcon>
    </Menu.Item>
  )
}

CollapseButton.fragments = fragments

export default CollapseButton
