import { ethers } from 'ethers'
import { useContext } from 'react'
import { chain, useEnsName } from 'wagmi'

import {
  Button,
  CopyToClipboard,
  IconCopy16,
  IconExternalLink16,
  LanguageContext,
  TextIcon,
} from '~/components'

import { EXTERNAL_LINKS } from '~/common/enums'
import { maskAddress, translate } from '~/common/utils'

import styles from './styles.css'

type WalletAddressProps = {
  address: string
  hasLinkedIPNS: boolean
}

const WalletAddress: React.FC<WalletAddressProps> = ({
  address,
  hasLinkedIPNS,
}) => {
  const { lang } = useContext(LanguageContext)
  const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: isProd ? chain.mainnet.id : chain.goerli.id,
  })
  return (
    <section className="address">
      {!hasLinkedIPNS && (
        <CopyToClipboard text={ensName || address}>
          <Button
            spacing={['xxtight', 'tight']}
            bgColor="green-lighter"
            bgActiveColor="grey-lighter"
            aria-label={translate({ id: 'copy', lang })}
          >
            {!hasLinkedIPNS && (
              <TextIcon
                icon={<IconCopy16 size="sm" />}
                spacing="xtight"
                textPlacement="left"
                color="green"
                size="md"
              >
                {ensName || maskAddress(ethers.utils.getAddress(address))}
              </TextIcon>
            )}
            {hasLinkedIPNS && (
              <TextIcon
                icon={<IconExternalLink16 />}
                color="green"
                spacing="xtight"
                textPlacement="left"
              >
                <a
                  href={`${EXTERNAL_LINKS.CLOUDFLARE_GATEWAY_LINK}${ensName}`}
                  target="_blank"
                  className="gateway-url"
                >
                  {ensName}
                </a>
              </TextIcon>
            )}
          </Button>
        </CopyToClipboard>
      )}
      {hasLinkedIPNS && (
        <Button
          spacing={['xxtight', 'tight']}
          bgColor="green-lighter"
          bgActiveColor="grey-lighter"
        >
          <TextIcon
            icon={<IconExternalLink16 />}
            color="green"
            spacing="xtight"
            textPlacement="left"
          >
            <a
              href={`${EXTERNAL_LINKS.CLOUDFLARE_GATEWAY_LINK}${ensName}`}
              target="_blank"
            >
              {ensName}
            </a>
          </TextIcon>
        </Button>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

export default WalletAddress
