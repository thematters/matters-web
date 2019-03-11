import fetch from 'isomorphic-unfetch'
import { createContext, useEffect, useState } from 'react'

const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
const PUBLIC_GATEWAYS: string[] = [
  'https://ipfs.io/ipfs/',
  'https://gateway.ipfs.io/ipfs/',
  'https://ipfs.infura.io/ipfs/',
  'https://rx14.co.uk/ipfs/',
  'https://xmine128.tk/ipfs/',
  'https://upload.global/ipfs/',
  'https://ipfs.jes.xxx/ipfs/',
  'https://catalunya.network/ipfs/',
  'https://siderus.io/ipfs/',
  'https://ipfs.eternum.io/ipfs/',
  'https://hardbin.com/ipfs/',
  'https://ipfs.macholibre.org/ipfs/',
  'https://ipfs.works/ipfs/',
  'https://ipfs.wa.hle.rs/ipfs/',
  'https://api.wisdom.sh/ipfs/',
  'https://gateway.blocksec.com/ipfs/',
  'https://ipfs.renehsz.com/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://ipns.co/',
  'https://ipfs.netw0rk.io/ipfs/',
  'https://gateway.swedneck.xyz/ipfs/',
  'https://ipfs.mrh.io/ipfs/',
  'https://gateway.originprotocol.com/ipfs/',
  'https://ipfs.dapps.earth/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://ipfs.doolta.com/ipfs/',
  'https://ipfs.sloppyta.co/ipfs/',
  'https://ipfs.busy.org/ipfs/',
  'https://ipfs.greyh.at/ipfs/',
  'https://gateway.serph.network/ipfs/'
]

export const GatewayContext = createContext({ gateways: [] } as {
  gateways: string[]
})

export const GatewayContextConsumer = GatewayContext.Consumer

export const GatewayContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [gateways, setGateways] = useState<string[]>([])

  useEffect(() => {
    // check accessbility for a given hash and gateway
    const checkGateway = async (
      hash: string,
      gatewayUrl: string
    ): Promise<void> => {
      const testUrl = `${gatewayUrl}${hash}#x-ipfs-companion-no-redirect`
      try {
        const { ok } = await fetch(testUrl)
        if (ok) {
          setGateways(prev => prev.concat([gatewayUrl]))
        }
      } catch (err) {
        console.log(`Fail to fetch gateway ${gatewayUrl}`)
      }
    }

    PUBLIC_GATEWAYS.map(url => checkGateway(TEST_HASH, url))
  }, [])

  return (
    <GatewayContext.Provider
      value={{
        gateways
      }}
    >
      {children}
    </GatewayContext.Provider>
  )
}
