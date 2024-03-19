import { Billboard as BaseBillboard } from '~/components'

import styles from './styles.module.css'

const Billboard = () => {
  const tokenId = process.env.NEXT_PUBLIC_BILLBOARD_TOKEN_ID
  return (
    <section className={styles.container}>
      <BaseBillboard tokenId={tokenId} type="home_hottest" />
    </section>
  )
}

export default Billboard
