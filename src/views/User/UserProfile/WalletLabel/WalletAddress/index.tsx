import { FormattedMessage, useIntl } from 'react-intl'
import { getAddress } from 'viem'

import { ReactComponent as IconCopy } from '@/public/static/icons/24px/copy.svg'
import { ReactComponent as IconExternal } from '@/public/static/icons/24px/external.svg'
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
        <TextIcon {...textIconProps} icon={<Icon icon={IconExternal} />}>
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
            icon={<Icon icon={IconCopy} size="sm" />}
          >
            {ensName || truncate(getAddress(address))}
          </TextIcon>
        </Button>
      )}
    </CopyToClipboard>
  )
}

export default WalletAddress
