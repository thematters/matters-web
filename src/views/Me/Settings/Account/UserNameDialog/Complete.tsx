import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

interface CompleteProps {
  closeDialog: () => void
}

const Complete = ({ closeDialog }: CompleteProps) => (
  <>
    <Dialog.Header
      title={
        <Translate
          zh_hant={TEXT.zh_hant.changeUserName}
          zh_hans={TEXT.zh_hans.changeUserName}
        />
      }
      close={closeDialog}
      headerHidden
    />

    <Dialog.Message
      headline={
        <Translate
          zh_hant={TEXT.zh_hant.changeUserName}
          zh_hans={TEXT.zh_hans.changeUserName}
        />
      }
      description={
        <Translate
          zh_hant={TEXT.zh_hant.changeUserNameSuccess}
          zh_hans={TEXT.zh_hans.changeUserNameSuccess}
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
