import { Button, FingerprintDialog, Translate } from '~/components'
import { FingerprintArticleFragment } from '~/gql/graphql'

interface FingerprintButtonProps {
  article: FingerprintArticleFragment
}

const FingerprintButton = ({ article }: FingerprintButtonProps) => {
  return (
    <Button textColor="black" textActiveColor="greyDarker">
      <Translate id="IPFSEntrance" />
    </Button>
  )
}

FingerprintButton.fragments = FingerprintDialog.fragments

export default FingerprintButton
