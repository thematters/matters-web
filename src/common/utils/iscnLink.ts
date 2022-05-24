// e.g. https://app.like.co/view/iscn:%2F%2Flikecoin-chain%2FbZs7dmhEk0voCV6vI_eWaHGD-cY32z6zt1scgzV9DVI%2F1

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const iscnLinkPrefix = isProd
  ? 'https://app.like.co/view'
  : 'https://app.rinkeby.like.co/view'

export function iscnLinkUrl(iscnId: string) {
  return `${iscnLinkPrefix}/${encodeURIComponent(iscnId)}`
}
