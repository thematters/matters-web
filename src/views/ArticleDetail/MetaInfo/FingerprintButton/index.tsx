import { FormattedMessage } from 'react-intl'

import { Button, FingerprintDialog, toast } from '~/components'
import { FingerprintArticleFragment } from '~/gql/graphql'

interface FingerprintButtonProps {
  article: FingerprintArticleFragment
}

const FingerprintButton = ({ article }: FingerprintButtonProps) => {
  return (
    <Button
      textColor="black"
      textActiveColor="greyDarker"
      onClick={() => {
        // TODO: redirect to IPFS page
        toast.success({
          message: '功能即將開放，敬請期待！',
        })
      }}
    >
      <FormattedMessage defaultMessage="IPFS" id="tio9Gt" />
    </Button>
  )
}

FingerprintButton.fragments = FingerprintDialog.fragments

export default FingerprintButton
