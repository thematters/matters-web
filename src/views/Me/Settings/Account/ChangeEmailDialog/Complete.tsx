import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

interface CompleteProps {
  closeDialog: () => void
}

const Complete = ({ closeDialog }: CompleteProps) => (
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
          zh_hant={TEXT.zh_hant.successChangeEmail}
          zh_hans={TEXT.zh_hans.successChangeEmail}
        />
      }
    />

    <Dialog.Footer>
      <Dialog.Footer.Button
        bgColor="grey-lighter"
        textColor="black"
        onClick={closeDialog}
      >
        <Translate zh_hant={TEXT.zh_hant.close} zh_hans={TEXT.zh_hans.close} />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default Complete
