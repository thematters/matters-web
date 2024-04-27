import { useIntl } from 'react-intl'

import { ReactComponent as IconIPFS } from '@/public/static/icons/24px/ipfs.svg'
import { Icon, Menu } from '~/components'

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
      icon={<Icon icon={IconIPFS} size="mdS" />}
      onClick={openDialog}
      ariaHasPopup="dialog"
    />
  )
}

export default FingerprintButton
