import fetch from 'isomorphic-unfetch'

import { timeout } from '~/common/utils'

const TEST_IPNS_KEY =
  'k51qzi5uqu5dm0ukjn4ol48gmzf8upkp7zi1zcxoab1y1f1kdaenxdg4qyjge6'
const PUBLIC_GATEWAYS: string[] = [
  'https://ipfs.io/ipns/:hash/rss.xml',
  'https://gateway.ipfs.io/ipns/:hash/rss.xml',
  'https://dweb.link/ipns/:hash/rss.xml',
  'https://crustwebsites.net/ipns/:hash/rss.xml',
  'https://gateway.originprotocol.com/ipns/:hash/rss.xml',
  'https://cloudflare-ipfs.com/ipns/:hash/rss.xml',
  'https://ipfs.telos.miami/ipns/:hash/rss.xml',
  'https://ipfs.fleek.co/ipns/:hash/rss.xml',
  'https://cf-ipfs.com/ipns/:hash/rss.xml',
  'https://ipfs.eth.aragon.network/ipns/:hash/rss.xml',
  'https://ipfs.kaleido.art/ipns/:hash/rss.xml',
  'https://gateway.pinata.cloud/ipns/:hash/rss.xml',
  'https://ipfs.tribecap.co/ipns/:hash/rss.xml',
  'https://ipfs.azurewebsites.net/ipns/:hash/rss.xml',
  'https://ipfs.kxv.io/ipns/:hash/rss.xml',
  'https://infura-ipfs.io/ipns/:hash/rss.xml',
  'https://ipfs.decoo.io/ipns/:hash/rss.xml',
  'https://ipfs.eternum.io/ipns/:hash/rss.xml',
  'https://hardbin.com/ipns/:hash/rss.xml',
  'https://jorropo.net/ipns/:hash/rss.xml',
  'https://ipfs.adatools.io/ipns/:hash/rss.xml',
  'https://ravencoinipfs-gateway.com/ipns/:hash/rss.xml',
  'https://robotizing.net/ipns/:hash/rss.xml',
  'https://hub.textile.io/ipns/:hash/rss.xml',
  'https://ipfs.infura.io/ipns/:hash/rss.xml',
  'https://ipfs.trusti.id/ipns/:hash/rss.xml',
  'https://ipfs.yt/ipns/:hash/rss.xml',
  'https://storry.tv/ipns/:hash/rss.xml',
  'https://astyanax.io/ipns/:hash/rss.xml',
  'https://ipfs.1-2.dev/ipns/:hash/rss.xml',
  'https://ipfs.mihir.ch/ipns/:hash/rss.xml',
  'https://10.via0.com/ipns/:hash/rss.xml',
  'https://dweb.eu.org/ipns/:hash/rss.xml',
  'https://permaweb.eu.org/ipns/:hash/rss.xml',
  'https://video.oneloveipfs.com/ipns/:hash/rss.xml',
  'https://ipfs.overpi.com/ipns/:hash/rss.xml',
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

const rssFeedGatewayUrlsResolver = async () => {
  const checkers = await Promise.all(
    PUBLIC_GATEWAYS.map((url) =>
      checkGateway(TEST_IPNS_KEY, url).then((alive: boolean) => ({
        url,
        alive,
      }))
    )
  )

  const rssFeedGatewayUrls = checkers
    .filter(({ alive }) => alive)
    .map(({ url }) => url)

  // meson network use 302 redirect, so we have to push it in mannually
  rssFeedGatewayUrls.unshift(
    'https://pz-matters.meson.network/ipns/:hash/rss.xml'
  )

  return rssFeedGatewayUrls
}

export default rssFeedGatewayUrlsResolver
