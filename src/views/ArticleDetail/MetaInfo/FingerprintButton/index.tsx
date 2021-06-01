import {
  Button,
  FingerprintDialog,
  IconIPFS24,
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
      {({ openDialog }) => (
        <Button onClick={openDialog}>
          <TextIcon
            icon={<IconIPFS24 />}
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
