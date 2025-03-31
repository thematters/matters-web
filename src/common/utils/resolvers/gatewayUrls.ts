// const TEST_HASH = 'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
const PUBLIC_GATEWAYS: string[] = [
  'https://:cidv1.ipfs.w3s.link',
  'https://ipfs-gateway.matters.town/ipfs/:hash',
  'https://ipfs.io/ipfs/:hash',
  'https://cloudflare-ipfs.com/ipfs/:hash',
]

const gatewayUrlsResolver = () => PUBLIC_GATEWAYS

export default gatewayUrlsResolver
