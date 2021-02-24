import gql from 'graphql-tag'

import { Translate } from '~/components'

import styles from './styles.css'

import { PinnedLabelComment } from './__generated__/PinnedLabelComment'

const fragments = {
  comment: gql`
    fragment PinnedLabelComment on Comment {
      id
      pinned
    }
  `,
}

const PinnedLabel = ({ comment }: { comment: PinnedLabelComment }) => {
  if (!comment.pinned) {
    return null
  }

  return (
    <span className="label">
      <Translate zh_hant="作者精選" zh_hans="作者精选" en="Featured" />

      <style jsx>{styles}</style>
    </span>
  )
}

PinnedLabel.fragments = fragments

export default PinnedLabel
