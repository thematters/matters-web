import { FormattedMessage } from 'react-intl'

import { redirectToTarget } from '~/common/utils'
import { Dialog, Translate } from '~/components'

const Complete: React.FC = () => {
  return (
    <>
      <Dialog.Header title="setupLikeCoin" />

      <Dialog.Message>
        <p>
          <Translate
            zh_hant="你的專屬 Liker ID 已就位！"
            zh_hans="你的专属 Liker ID 已就位！"
            en="Your Liker ID is ready!"
          />
        </p>
      </Dialog.Message>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={<FormattedMessage defaultMessage="Done" />}
            onClick={() => {
              redirectToTarget({
                fallback: 'current',
              })
            }}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Done" />}
            onClick={() => {
              redirectToTarget({
                fallback: 'current',
              })
            }}
          />
        }
      />
    </>
  )
}

export default Complete
