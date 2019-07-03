import fetch from 'isomorphic-unfetch'

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

// check accessbility for a given hash and gateway
const checkGateway = async (
  hash: string,
  gatewayUrl: string
): Promise<boolean> => {
  const testUrl = `${gatewayUrl}${hash}#x-ipfs-companion-no-redirect`

  try {
    const res = await fetch(testUrl)
    if (res && res.ok) {
      return true
    }
    return false
  } catch (err) {
    console.log(`Gateway not alive, skipping: ${gatewayUrl}`)
    return false
  }
}

export default async () => {
  const checkers = await Promise.all(
    PUBLIC_GATEWAYS.map(url =>
      checkGateway(TEST_HASH, url).then((alive: boolean) => ({ url, alive }))
    )
  )
  return checkers.filter(({ alive }) => alive).map(({ url }) => url)
}
