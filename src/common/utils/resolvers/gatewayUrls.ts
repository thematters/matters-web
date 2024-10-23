// const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
const PUBLIC_GATEWAYS: string[] = [
  'https://gw3.io/ipfs/:hash',
  'https://cloudflare-ipfs.com/ipfs/:hash',
  'https://ipfs.io/ipfs/:hash',
  'https://4everland.io/ipfs/:hash',
]

// check accessbility for a given hash and gateway
// const checkGateway = async (
//   hash: string,
//   gatewayUrl: string
// ): Promise<boolean> => {
//   const testUrl = `${gatewayUrl.replace(
//     ':hash',
//     hash
//   )}#x-ipfs-companion-no-redirect`

//   try {
//     const res = await fetch(testUrl)
//     if (res && res.ok) {
//       return true
//     }
//     return false
//   } catch (err) {
//     console.log(`Gateway not alive, skipping: ${gatewayUrl}`)
//     return false
//   }
// }

// const gatewayUrlsResolver = async () => {
//   const gatwayUrls: string[] = []

//   // push in faster public gateway first
//   await Promise.all(
//     PUBLIC_GATEWAYS.map((url) =>
//       checkGateway(TEST_HASH, url).then(
//         (alive: boolean) => alive && gatwayUrls.push(url)
//       )
//     )
//   )

//   // meson network use 302 redirect, so we have to push it in mannually
//   gatwayUrls.concat(['https://pz-matters.meson.network/ipfs/:hash'])

//   return gatwayUrls
// }

const gatewayUrlsResolver = () => PUBLIC_GATEWAYS

export default gatewayUrlsResolver
