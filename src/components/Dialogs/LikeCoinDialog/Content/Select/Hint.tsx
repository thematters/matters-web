import { Translate } from '~/components'

import styles from './styles.module.css'

const Hint = () => (
  <p className={styles.hint}>
    <Translate
      zh_hant="我們會幫你生成 Liker ID，如果你已經有 Liker ID 也可以進行綁定。"
      zh_hans="我们会帮你生成 Liker ID，如果你已经有 Liker ID 也可以进行绑定。"
      en="Matters will generate a new Liker ID for you, or choose to connect your own Liker ID."
    />
  </p>
)

export default Hint
