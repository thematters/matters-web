import { ethers } from 'ethers'
import { useEnsName } from 'wagmi'

import {
  Button,
  // CopyButton,
  CopyToClipboard,
  // IconExternalLink16,
  IconCopy16,
  TextIcon,
} from '~/components'

import { maskAddress } from '~/common/utils'

import styles from './styles.css'

type WalletAddressProps = {
  address: string
}

const WalletAddress: React.FC<WalletAddressProps> = ({ address }) => {
  const { data: ensName } = useEnsName({ address: address as `0x${string}` })

  return (
    <section className="address">
      <CopyToClipboard text={ensName || address}>
        <Button
          // htmlHref={etherscanUrl}
          // htmlTarget="_blank"
          spacing={['xxtight', 'tight']}
          bgColor="green-lighter"
          bgActiveColor="grey-lighter"
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
