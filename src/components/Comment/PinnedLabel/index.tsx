import gql from 'graphql-tag'

import { Label } from '~/components/Label'
import { Translate } from '~/components/Language'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

import { PinnedLabelComment } from './__generated__/PinnedLabelComment'

const fragments = {
  comment: gql`
    fragment PinnedLabelComment on Comment {
      id
      pinned
    }
  `
}
const PinnedLabel = ({ comment }: { comment: PinnedLabelComment }) => {
  if (!comment.pinned) {
    return null
  }

  return (
    <span className="label">
      <Label size="sm">
        <Translate
          zh_hant={TEXT.zh_hant.authorRecommend}
          zh_hans={TEXT.zh_hant.authorRecommend}
        />
      </Label>

      <style jsx>{styles}</style>
    </span>
  )
}

PinnedLabel.fragments = fragments

export default PinnedLabel
