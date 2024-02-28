import { FormattedMessage } from 'react-intl'

import { Button, FingerprintDialog, TextIcon, toast } from '~/components'
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
      <TextIcon size="xs">
        <FormattedMessage defaultMessage="IPFS" id="tio9Gt" />
      </TextIcon>
    </Button>
  )
}

FingerprintButton.fragments = FingerprintDialog.fragments

export default FingerprintButton
