import { getAddress } from '@ethersproject/address'
import { AlchemyProvider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'

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

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

const WalletAddress: React.FC<WalletAddressProps> = ({ address }) => {
  // const etherscanUrl = `https://etherscan.io/address/${address}`

  const provider = new AlchemyProvider(
    isProd ? 'mainnet' : 'rinkeby',
    process.env.NEXT_PUBLIC_ALCHEMY_KEY
  )

  const [ensName, setEnsName] = useState('')

  const getENSName = async () => {
    const name = await provider.lookupAddress(address)

    if (name) {
      setEnsName(name)
    }
  }

  useEffect(() => {
    getENSName()
  }, [])

  return (
    <section className="address">
      <CopyToClipboard text={address}>
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
            {ensName || maskAddress(getAddress(address))}
          </TextIcon>
        </Button>
      </CopyToClipboard>
      <style jsx>{styles}</style>
    </section>
  )
}

export default WalletAddress
