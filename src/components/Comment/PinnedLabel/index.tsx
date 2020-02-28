import gql from 'graphql-tag'

import { Label, Translate } from '~/components'

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
    <Label size="sm">
      <Translate id="authorRecommend" />
    </Label>
  )
}

PinnedLabel.fragments = fragments

export default PinnedLabel
