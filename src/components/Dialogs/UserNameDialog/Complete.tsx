import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

interface CompleteProps {
  title: React.ReactNode
  close: () => void
}

const Complete = ({ title, close }: CompleteProps) => (
  <>
    <Dialog.Message
      headline={title}
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
        onClick={close}
      >
        <Translate zh_hant={TEXT.zh_hant.close} zh_hans={TEXT.zh_hans.close} />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default Complete
