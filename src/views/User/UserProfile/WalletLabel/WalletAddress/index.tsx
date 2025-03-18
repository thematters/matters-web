import { FormattedMessage, useIntl } from 'react-intl'
import { getAddress } from 'viem'

import { ReactComponent as IconCopy } from '@/public/static/icons/24px/copy.svg'
import { truncate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  CopyToClipboard,
  Icon,
  TextIcon,
  TextIconProps,
} from '~/components'

type WalletAddressProps = {
  address: string
  ensName?: string | null
}

const WalletAddress: React.FC<WalletAddressProps> = ({ address, ensName }) => {
  const intl = useIntl()
  const buttonProps: ButtonProps = {
    spacing: [4, 12],
    bgColor: 'greenLighter',
    bgActiveColor: 'greyLighter',
  }
  const textIconProps: TextIconProps = {
    spacing: 8,
    placement: 'left',
    color: 'green',
    size: 16,
  }

  return (
    <CopyToClipboard
      text={ensName || address}
      successMessage={
        <FormattedMessage defaultMessage="Address copied" id="+aMAeT" />
      }
    >
      {({ copyToClipboard }) => (
        <Button
          {...buttonProps}
          aria-label={intl.formatMessage({
            defaultMessage: 'Copy',
            id: '4l6vz1',
          })}
          onClick={copyToClipboard}
        >
          <TextIcon
            {...textIconProps}
            icon={<Icon icon={IconCopy} size={14} />}
          >
            {ensName || truncate(getAddress(address))}
          </TextIcon>
        </Button>
      )}
    </CopyToClipboard>
  )
}

export default WalletAddress
