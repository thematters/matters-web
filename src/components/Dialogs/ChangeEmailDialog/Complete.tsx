import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

interface CompleteProps {
  close: () => void
}

const Complete = ({ close }: CompleteProps) => (
  <>
    <Dialog.Message
      headline={
        <Translate
          zh_hant={TEXT.zh_hant.changeEmail}
          zh_hans={TEXT.zh_hans.changeEmail}
        />
      }
      description={
        <Translate
          zh_hant={TEXT.zh_hant.changeEmailSuccess}
          zh_hans={TEXT.zh_hans.changeEmailSuccess}
        />
      }
    />

    <Dialog.Footer>
      <Dialog.Footer.Button
        bgColor="grey-lighter"
        textColor="black"
        onClick={close}
      >
        <Translate zh_hant={TEXT.zh_hant.close} zh_hans={TEXT.zh_hans.close} />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default Complete
