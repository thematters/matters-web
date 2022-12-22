import { ethers } from 'ethers'
import Link from 'next/link'
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

  if (hasLinkedIPNS) {
    return (
      <section className="address">
        <Link href={`${EXTERNAL_LINKS.CLOUDFLARE_GATEWAY_LINK}${ensName}`}>
          <a target="_blank">
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
                size="md"
              >
                {ensName}
              </TextIcon>
            </Button>
          </a>
        </Link>
        <style jsx>{styles}</style>
      </section>
    )
  }
  return (
    <section className="address">
      <CopyToClipboard text={ensName || address}>
        <Button
          spacing={['xxtight', 'tight']}
          bgColor="green-lighter"
          bgActiveColor="grey-lighter"
          aria-label={translate({ id: 'copy', lang })}
        >
          <TextIcon
            icon={<IconCopy16 size="sm" />}
            spacing="xtight"
            textPlacement="left"
            color="green"
            size="md"
          >
            {ensName || maskAddress(ethers.utils.getAddress(address))}
          </TextIcon>
        </Button>
      </CopyToClipboard>
      <style jsx>{styles}</style>
    </section>
  )
}

export default WalletAddress
