import { Billboard as BaseBillboard } from '~/components'

const Billboard = () => {
  const tokenId = process.env.NEXT_PUBLIC_BILLBOARD_TOKEN_ID
  return <BaseBillboard tokenId={tokenId} type="events_sidebar" />
}

export default Billboard
