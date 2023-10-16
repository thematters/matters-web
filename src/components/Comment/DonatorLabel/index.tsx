import gql from 'graphql-tag'

import { Translate } from '~/components'
import { DonatorLabelCommentFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  comment: gql`
    fragment DonatorLabelComment on Comment {
      id
      fromDonator
    }
  `,
}

const DonatorLabel = ({
  comment,
}: {
  comment: DonatorLabelCommentFragment
}) => {
  if (!comment.fromDonator) {
    return null
  }

  return (
    <span className={styles.label}>
      <Translate zh_hant="支持者" zh_hans="支持者" en="Supporter" />
    </span>
  )
}

DonatorLabel.fragments = fragments

export default DonatorLabel
