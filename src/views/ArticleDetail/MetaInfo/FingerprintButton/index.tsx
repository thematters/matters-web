import { FormattedMessage } from 'react-intl'

import { Button, FingerprintDialog, IconIPFS24, TextIcon } from '~/components'
import { FingerprintArticleFragment } from '~/gql/graphql'

interface FingerprintButtonProps {
  article: FingerprintArticleFragment
}

const FingerprintButton = ({ article }: FingerprintButtonProps) => {
  return (
    <FingerprintDialog article={article}>
      {({ openDialog }) => (
        <Button
          onClick={openDialog}
          spacing={['xxtight', 'xtight']}
          bgColor="greenLighter"
          aria-haspopup="dialog"
        >
          <TextIcon
            icon={<IconIPFS24 color="green" />}
            size="xs"
            spacing="xxtight"
            color="green"
          >
            <FormattedMessage defaultMessage="IPFS" id="tio9Gt" />{' '}
          </TextIcon>
        </Button>
      )}
    </FingerprintDialog>
  )
}

FingerprintButton.fragments = FingerprintDialog.fragments

export default FingerprintButton
