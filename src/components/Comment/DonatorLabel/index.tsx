import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

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
      <FormattedMessage
        defaultMessage="Supporter"
        id="ZYvVYX"
        description="src/components/Comment/DonatorLabel/index.tsx"
      />
    </span>
  )
}

DonatorLabel.fragments = fragments

export default DonatorLabel
