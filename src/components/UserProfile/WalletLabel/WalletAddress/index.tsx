import { ethers } from 'ethers'
import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  CopyToClipboard,
  IconCopy16,
  IconExternalLink16,
  LanguageContext,
  TextIcon,
  TextIconProps,
} from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'
import { maskAddress, translate } from '~/common/utils'

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
  const { lang } = useContext(LanguageContext)
  const buttonProps: ButtonProps = {
    spacing: ['xxtight', 'tight'],
    bgColor: 'green-lighter',
    bgActiveColor: 'grey-lighter',
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
        htmlHref={`${EXTERNAL_LINKS.CLOUDFLARE_GATEWAY_LINK}${ensName}`}
        htmlTarget="_blank"
      >
        <TextIcon {...textIconProps} icon={<IconExternalLink16 />}>
          {ensName}
        </TextIcon>
      </Button>
    )
  }

  return (
    <CopyToClipboard text={ensName || address}>
      <Button {...buttonProps} aria-label={translate({ id: 'copy', lang })}>
        <TextIcon {...textIconProps} icon={<IconCopy16 size="sm" />}>
          {ensName || maskAddress(ethers.utils.getAddress(address))}
        </TextIcon>
      </Button>
    </CopyToClipboard>
  )
}

export default WalletAddress
