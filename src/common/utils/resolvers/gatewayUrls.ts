import fetch from 'isomorphic-unfetch'

import { timeout } from '~/common/utils'

const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
const PUBLIC_GATEWAYS: string[] = [
  "https://matters-meson.net/api/cdn/10vbg9/ipfs/:hash",
  'https://ipfs.io/ipfs/:hash',
  'https://gateway.ipfs.io/ipfs/:hash',
  "https://dweb.link/ipfs/:hash",
  "https://crustwebsites.net/ipfs/:hash",
  "https://gateway.originprotocol.com/ipfs/:hash",
  'https://cloudflare-ipfs.com/ipfs/:hash',
  "https://ipfs.telos.miami/ipfs/:hash",
  "https://ipfs.fleek.co/ipfs/:hash",
  "https://cf-ipfs.com/ipfs/:hash",
  "https://ipfs.eth.aragon.network/ipfs/:hash",
  "https://ipfs.kaleido.art/ipfs/:hash",
  "https://gateway.pinata.cloud/ipfs/:hash",
  "https://ipfs.tribecap.co/ipfs/:hash",
  "https://ipfs.azurewebsites.net/ipfs/:hash",
  "https://ipfs.kxv.io/ipfs/:hash",
  "https://infura-ipfs.io/ipfs/:hash",
  "https://ipfs.decoo.io/ipfs/:hash",
  "https://ipfs.eternum.io/ipfs/:hash",
  "https://hardbin.com/ipfs/:hash",
  "https://jorropo.net/ipfs/:hash",
  "https://ipfs.adatools.io/ipfs/:hash",
  "https://ravencoinipfs-gateway.com/ipfs/:hash",
  "https://robotizing.net/ipfs/:hash",
  "https://hub.textile.io/ipfs/:hash",
  "https://ipfs.infura.io/ipfs/:hash",
  "https://ipfs.trusti.id/ipfs/:hash",
  "https://ipfs.yt/ipfs/:hash",
  "https://storry.tv/ipfs/:hash",
  "https://astyanax.io/ipfs/:hash",
  "https://ipfs.1-2.dev/ipfs/:hash",
  "https://ipfs.mihir.ch/ipfs/:hash",
  "https://10.via0.com/ipfs/:hash",
  "https://dweb.eu.org/ipfs/:hash",
  "https://permaweb.eu.org/ipfs/:hash",
  "https://video.oneloveipfs.com/ipfs/:hash",
  "https://ipfs.overpi.com/ipfs/:hash",
]

// check accessbility for a given hash and gateway
const checkGateway = async (
  hash: string,
  gatewayUrl: string
): Promise<boolean> => {
  const testUrl = `${gatewayUrl.replace(
    ':hash',
    hash
  )}#x-ipfs-companion-no-redirect`

  try {
    // const res = await fetch(testUrl)
    const res = (await timeout(
      2000,
      fetch(testUrl)
    )) as fetch.IsomorphicResponse
    if (res && res.ok) {
      return true
    }
    return false
  } catch (err) {
    console.log(`Gateway not alive, skipping: ${gatewayUrl}`)
    return false
  }
}

const gatewayUrlsResolver = async () => {
  const checkers = await Promise.all(
    PUBLIC_GATEWAYS.map((url) =>
      checkGateway(TEST_HASH, url).then((alive: boolean) => ({ url, alive }))
    )
  )
  return checkers.filter(({ alive }) => alive).map(({ url }) => url)
}

export default gatewayUrlsResolver
