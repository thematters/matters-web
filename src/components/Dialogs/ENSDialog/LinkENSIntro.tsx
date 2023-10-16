import { Translate } from '~/components'

const LinkENSIntro = ({ ensName = '' }: { ensName?: string | null }) => (
  <p>
    <Translate zh_hans="将" zh_hant="將" en="Link" />
    <span className="u-highlight">&nbsp;{ensName}&nbsp;</span>
    <Translate id="toYourIPNSPage" />
  </p>
)

export default LinkENSIntro
