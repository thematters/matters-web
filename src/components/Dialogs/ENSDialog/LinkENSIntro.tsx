import { Translate } from '~/components'

import styles from './styles.css'

const LinkENSIntro = ({ ensName = '' }: { ensName?: string | null }) => (
  <p>
    <Translate zh_hans="将" zh_hant="將" en="Link" />
    <span className="highlight">&nbsp;{ensName}&nbsp;</span>
    <Translate id="toYourIPNSPage" />
    <style jsx>{styles}</style>
  </p>
)

export default LinkENSIntro
