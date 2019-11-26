import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'
import ICON_COLLAPSE from '~/static/icons/collapse.svg?sprite'

import { CollapseComment } from './__generated__/CollapseComment'
import styles from './styles.css'

const COLLAPSE_COMMENT = gql`
  mutation CollapseComment($id: ID!) {
    updateCommentsState(input: { ids: [$id], state: collapsed }) {
      id
      state
    }
  }
`

const CollapseButton: React.FC<{
  commentId: string
  hideDropdown: () => void
}> = ({ commentId, hideDropdown }) => {
  const [collapseComment] = useMutation<CollapseComment>(COLLAPSE_COMMENT, {
    variables: { id: commentId },
    optimisticResponse: {
      updateCommentsState: [
        {
          id: commentId,
          state: 'collapsed' as any,
          __typename: 'Comment'
        }
      ]
    }
  })

  return (
    <button
      type="button"
      onClick={() => {
        collapseComment()
        hideDropdown()
      }}
    >
      <TextIcon
        icon={
          <Icon
            id={ICON_COLLAPSE.id}
            viewBox={ICON_COLLAPSE.viewBox}
            size="small"
          />
        }
        spacing="tight"
      >
        <Translate
          zh_hant={TEXT.zh_hant.collapseComment}
          zh_hans={TEXT.zh_hant.collapseComment}
        />
      </TextIcon>

      <style jsx>{styles}</style>
    </button>
  )
}

export default CollapseButton
