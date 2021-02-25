import gql from 'graphql-tag'

import { IconPin24, TextIcon, Translate } from '~/components'

import styles from './styles.css'

import { PinnedLabelComment } from './__generated__/PinnedLabelComment'

const fragments = {
  comment: gql`
    fragment PinnedLabelComment on Comment {
      id
      pinned
      node {
        ... on Article {
          id
        }
        ... on Circle {
          id
        }
      }
    }
  `,
}

const PinnedLabel = ({ comment }: { comment: PinnedLabelComment }) => {
  if (!comment.pinned) {
    return null
  }

  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined

  if (circle) {
    return (
      <TextIcon icon={<IconPin24 />} size="sm" color="grey" weight="md">
        <Translate id="pinned" />
      </TextIcon>
    )
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
