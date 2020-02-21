import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

interface AskProps {
  title: React.ReactNode
  nextStep: () => void
  close: () => void
}

const Ask = ({ title, nextStep, close }: AskProps) => (
  <>
    <Dialog.Message
      headline={title}
      description={
        <Translate
          zh_hant="您的 Matters ID 僅能永久修改一次，確定要繼續嗎？"
          zh_hans="您的 Matters ID 仅能永久修改一次，确定要继续吗？"
        />
      }
    />

    <Dialog.Footer>
      <Dialog.Footer.Button onClick={nextStep}>
        <Translate
          zh_hant={TEXT.zh_hant.confirm}
          zh_hans={TEXT.zh_hans.confirm}
        />
      </Dialog.Footer.Button>

      <Dialog.Footer.Button
        bgColor="grey-lighter"
        textColor="black"
        onClick={close}
      >
        <Translate
          zh_hant={TEXT.zh_hant.cancel}
          zh_hans={TEXT.zh_hans.cancel}
        />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default Ask
