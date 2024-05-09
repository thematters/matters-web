import { FormattedMessage } from 'react-intl'

const LinkENSIntro = ({ ensName = '' }: { ensName?: string | null }) => (
  <p>
    <FormattedMessage
      defaultMessage="Link {ensName} to your IPNS page"
      id="qPVFTS"
      values={{
        ensName: <span className="u-highlight">&nbsp;{ensName}&nbsp;</span>,
      }}
    />
  </p>
)

export default LinkENSIntro
