import {
  Button,
  FingerprintDialog,
  IconIPFSMedium,
  TextIcon,
  Translate,
} from '~/components'

import { FingerprintArticle } from '~/components/Dialogs/FingerprintDialog/__generated__/FingerprintArticle'

interface FingerprintButtonProps {
  article: FingerprintArticle
}

const FingerprintButton = ({ article }: FingerprintButtonProps) => {
  return (
    <FingerprintDialog article={article}>
      {({ open }) => (
        <Button onClick={open}>
          <TextIcon
            icon={<IconIPFSMedium />}
            size="xs"
            spacing="xxtight"
            color="grey"
          >
            <Translate id="IPFSEntrance" />
          </TextIcon>
        </Button>
      )}
    </FingerprintDialog>
  )
}

FingerprintButton.fragments = FingerprintDialog.fragments

export default FingerprintButton
