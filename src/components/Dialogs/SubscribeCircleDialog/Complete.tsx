import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Dialog } from '~/components'
import { DigestRichCirclePublicFragment } from '~/gql/graphql'

interface CompleteProps {
  circle: DigestRichCirclePublicFragment
}

const Complete: React.FC<CompleteProps> = ({ circle }) => {
  return (
    <>
      <Dialog.Header
        title={
          <FormattedMessage
            defaultMessage="Circle successfully subscribed."
            id="/5jk3i"
          />
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message align="left" smUpAlign="left">
          <p>
            <FormattedMessage
              defaultMessage="Congratulations! Now you can browse all works within the cirlce for free and chat with everyone."
              id="Q1PHUd"
            />
          </p>
          <br />
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={<FormattedMessage defaultMessage="View Circle" id="ob+HDS" />}
            htmlHref={toPath({ page: 'circleDetail', circle }).href}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="View Circle" id="ob+HDS" />}
            htmlHref={toPath({ page: 'circleDetail', circle }).href}
          />
        }
      />
    </>
  )
}

export default Complete
