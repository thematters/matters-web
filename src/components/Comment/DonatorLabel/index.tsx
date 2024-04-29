import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { Label } from '~/components'
import { DonatorLabelCommentFragment } from '~/gql/graphql'

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
    <Label color="gold">
      <FormattedMessage
        defaultMessage="Supporter"
        id="ZYvVYX"
        description="src/components/Comment/DonatorLabel/index.tsx"
      />
    </Label>
  )
}

DonatorLabel.fragments = fragments

export default DonatorLabel
