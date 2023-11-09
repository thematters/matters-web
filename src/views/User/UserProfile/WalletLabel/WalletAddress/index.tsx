import { FormattedMessage, useIntl } from 'react-intl'
import { getAddress } from 'viem'

import { maskAddress } from '~/common/utils'
import {
  Button,
  ButtonProps,
  CopyToClipboard,
  IconCopy16,
  IconExternalLink16,
  TextIcon,
  TextIconProps,
} from '~/components'

type WalletAddressProps = {
  address: string
  ensName?: string | null
  hasLinkedIPNS: boolean
}

const WalletAddress: React.FC<WalletAddressProps> = ({
  address,
  ensName,
  hasLinkedIPNS,
}) => {
  const intl = useIntl()
  const buttonProps: ButtonProps = {
    spacing: ['xxtight', 'tight'],
    bgColor: 'greenLighter',
    bgActiveColor: 'greyLighter',
  }
  const textIconProps: TextIconProps = {
    spacing: 'xtight',
    textPlacement: 'left',
    color: 'green',
    size: 'md',
  }

  if (ensName && hasLinkedIPNS) {
    return (
      <Button
        {...buttonProps}
        htmlHref={`https://${ensName}.limo`}
        htmlTarget="_blank"
      >
        <TextIcon {...textIconProps} icon={<IconExternalLink16 />}>
          {ensName}
        </TextIcon>
      </Button>
    )
  }

  return (
    <CopyToClipboard
      text={ensName || address}
      successMessage={
        <FormattedMessage defaultMessage="Address copied" id="+aMAeT" />
      }
    >
      <Button
        {...buttonProps}
        aria-label={intl.formatMessage({
          defaultMessage: 'Copy',
          id: '4l6vz1',
        })}
      >
        <TextIcon {...textIconProps} icon={<IconCopy16 size="sm" />}>
          {ensName || maskAddress(getAddress(address))}
        </TextIcon>
      </Button>
    </CopyToClipboard>
  )
}

export default WalletAddress
