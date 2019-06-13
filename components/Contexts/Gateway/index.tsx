import fetch from 'isomorphic-unfetch'
import { createContext, useState } from 'react'

const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
const PUBLIC_GATEWAYS: string[] = [
  'https://d26g9c7mfuzstv.cloudfront.net/ipfs/',
  'https://ipfs.io/ipfs/',
  'https://gateway.ipfs.io/ipfs/',
  'https://ipfs.infura.io/ipfs/',
  'https://ipfs.jes.xxx/ipfs/',
  'https://siderus.io/ipfs/',
  'https://ipfs.eternum.io/ipfs/',
  'https://hardbin.com/ipfs/',
  'https://ipfs.wa.hle.rs/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://ipfs.sloppyta.co/ipfs/',
  'https://ipfs.busy.org/ipfs/',
  'https://ipfs.greyh.at/ipfs/',
  'https://gateway.serph.network/ipfs/'
]

export const GatewayContext = createContext({
  gateways: [],
  startCheck: () => null
} as {
  gateways: string[]
  startCheck: () => void
})

export const GatewayContextConsumer = GatewayContext.Consumer

export const GatewayContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [gateways, setGateways] = useState<string[]>([])

  const startCheck = () => {
    // check accessbility for a given hash and gateway
    const checkGateway = async (
      hash: string,
      gatewayUrl: string
    ): Promise<void> => {
      const testUrl = `${gatewayUrl}${hash}#x-ipfs-companion-no-redirect`
      try {
        const res = await fetch(testUrl)
        if (res && res.ok) {
          setGateways(prev => prev.concat([gatewayUrl]))
        }
      } catch (err) {
        console.log(`Gateway not alive, skipping: ${gatewayUrl}`)
      }
    }

    PUBLIC_GATEWAYS.map(url => checkGateway(TEST_HASH, url))
  }

  return (
    <GatewayContext.Provider
      value={{
        gateways,
        startCheck
      }}
    >
      {children}
    </GatewayContext.Provider>
  )
}
