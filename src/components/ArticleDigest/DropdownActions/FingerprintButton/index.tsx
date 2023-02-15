import { FormattedMessage } from 'react-intl'

import { IconIPFS24, Menu, TextIcon } from '~/components'

interface FingerprintButtonProps {
  openDialog: () => void
}

const FingerprintButton = ({ openDialog }: FingerprintButtonProps) => {
  return (
    <Menu.Item onClick={openDialog} ariaHasPopup="dialog">
      <TextIcon icon={<IconIPFS24 size="md" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="IPFS" description="src/components/ArticleDigest/DropdownActions/FingerprintButton/index.tsx" />
      </TextIcon>
    </Menu.Item>
  )
}

export default FingerprintButton
