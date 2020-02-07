import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST, TEXT } from '~/common/enums'

import styles from './styles.css'

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

const CollapseButton = ({
  comment,
  hideDropdown
}: {
  comment: CollapseButtonComment
  hideDropdown: () => void
}) => {
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
      <button
        type="button"
        onClick={() => {
          uncollapseComment()
          hideDropdown()
        }}
      >
        <TextIcon icon={<Icon.Expand />} spacing="tight">
          <Translate
            zh_hant={TEXT.zh_hant.uncollapseComment}
            zh_hans={TEXT.zh_hant.uncollapseComment}
          />
        </TextIcon>

        <style jsx>{styles}</style>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        collapseComment()
        hideDropdown()
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate
                  zh_hant={TEXT.zh_hant.collapseCommentSuccess}
                  zh_hans={TEXT.zh_hans.collapseCommentSuccess}
                />
              )
            }
          })
        )
      }}
    >
      <TextIcon icon={<Icon.Collapse />} spacing="tight">
        <Translate
          zh_hant={TEXT.zh_hant.collapseComment}
          zh_hans={TEXT.zh_hant.collapseComment}
        />
      </TextIcon>

      <style jsx>{styles}</style>
    </button>
  )
}

CollapseButton.fragments = fragments

export default CollapseButton
