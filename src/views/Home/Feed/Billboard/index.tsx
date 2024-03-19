import { Billboard as BaseBillboard } from '~/components'

import styles from './styles.module.css'

const Billboard = () => {
  return (
    <section className={styles.container}>
      <BaseBillboard />
    </section>
  )
}

export default Billboard
