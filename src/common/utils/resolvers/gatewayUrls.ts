import fetch from 'isomorphic-unfetch'

import { timeout } from '~/common/utils'

const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
const PUBLIC_GATEWAYS: string[] = [
  'https://d26g9c7mfuzstv.cloudfront.net/ipfs/:hash',
  'https://ipfs.io/ipfs/:hash',
  'https://:hash.ipfs.dweb.link',
  'https://gateway.ipfs.io/ipfs/:hash',
  'https://ipfs.infura.io/ipfs/:hash',
  'https://ninetailed.ninja/ipfs/:hash',
  'https://10.via0.com/ipfs/:hash',
  'https://ipfs.eternum.io/ipfs/:hash',
  'https://hardbin.com/ipfs/:hash',
  'https://cloudflare-ipfs.com/ipfs/:hash',
  'https://:hash.ipfs.cf-ipfs.com',
  'https://ipns.co/:hash',
  'https://gateway.pinata.cloud/ipfs/:hash',
  'https://ipfs.sloppyta.co/ipfs/:hash',
  'https://jorropo.ovh/ipfs/:hash',
  'https://gateway.temporal.cloud/ipfs/:hash',
  'https://ipfs.privacytools.io/ipfs/:hash',
  'https://ipfs.jeroendeneef.com/ipfs/:hash',
  'https://permaweb.io/ipfs/:hash',
  'https://ipfs.stibarc.com/ipfs/:hash',
  'https://ipfs.best-practice.se/ipfs/:hash',
  'https://:hash.ipfs.2read.net',
  'https://ipfs.2read.net/ipfs/:hash',
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

export default async () => {
  const checkers = await Promise.all(
    PUBLIC_GATEWAYS.map((url) =>
      checkGateway(TEST_HASH, url).then((alive: boolean) => ({ url, alive }))
    )
  )
  return checkers.filter(({ alive }) => alive).map(({ url }) => url)
}
