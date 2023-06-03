import { Translate } from '~/components'

import styles from './styles.module.css'

const LinkENSIntro = ({ ensName = '' }: { ensName?: string | null }) => (
  <p>
    <Translate zh_hans="将" zh_hant="將" en="Link" />
    <span className={styles['highlight']}>&nbsp;{ensName}&nbsp;</span>
    <Translate id="toYourIPNSPage" />
  </p>
)

export default LinkENSIntro
