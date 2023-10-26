import { useIntl } from 'react-intl'

import { IconIPFS24, Menu } from '~/components'

interface FingerprintButtonProps {
  openDialog: () => void
}

const FingerprintButton = ({ openDialog }: FingerprintButtonProps) => {
  const intl = useIntl()

  return (
    <Menu.Item
      text={intl.formatMessage({
        defaultMessage: 'IPFS',
        id: 'HDjV1k',
        description:
          'src/components/ArticleDigest/DropdownActions/FingerprintButton/index.tsx',
      })}
      icon={<IconIPFS24 size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default FingerprintButton
