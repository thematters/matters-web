import { ethers } from 'ethers'
import { useContext } from 'react'
import { chain, useEnsName } from 'wagmi'

import {
  Button,
  // CopyButton,
  CopyToClipboard,
  // IconExternalLink16,
  IconCopy16,
  LanguageContext,
  TextIcon,
} from '~/components'

import { maskAddress, translate } from '~/common/utils'

import styles from './styles.css'

type WalletAddressProps = {
  address: string
}

const WalletAddress: React.FC<WalletAddressProps> = ({ address }) => {
  const { lang } = useContext(LanguageContext)
  const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: isProd ? chain.mainnet.id : chain.goerli.id,
  })

  return (
    <section className="address">
      <CopyToClipboard text={ensName || address}>
        <Button
          // htmlHref={etherscanUrl}
          // htmlTarget="_blank"
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
