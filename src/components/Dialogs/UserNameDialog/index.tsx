import { useState } from 'react'

import { Dialog, Translate, UserNameChangeConfirmForm } from '~/components'

import { TEXT } from '~/common/enums'

type Step = 'ask' | 'confirm' | 'complete'

interface UserNameDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const UserNameDialog = ({ children }: UserNameDialogProps) => {
  const [step, setStep] = useState<Step>('ask')
  const [showDialog, setShowDialog] = useState(false)
  const open = () => {
    setStep('ask')
    setShowDialog(true)
  }
  const close = () => {
    setShowDialog(false)
  }

  const confirmCallback = () => setStep('complete')
  const showHeader = step !== 'ask' && step !== 'complete'
  const Title = (
    <Translate
      zh_hant={TEXT.zh_hant.changeUserName}
      zh_hans={TEXT.zh_hans.changeUserName}
    />
  )

  return (
    <>
      {children({ open })}

      <Dialog
        title={Title}
        showHeader={showHeader}
        isOpen={showDialog}
        onDismiss={close}
        size={showHeader ? 'lg' : 'sm'}
      >
        {step === 'ask' && (
          <>
            <Dialog.Message
              headline={Title}
              description={
                <Translate
                  zh_hant="您的 Matters ID 僅能永久修改一次，確定要繼續嗎？"
                  zh_hans="您的 Matters ID 仅能永久修改一次，确定要继续吗？"
                />
              }
            />

            <Dialog.Footer>
              <Dialog.Footer.Button
                onClick={() => {
                  setStep('confirm')
                }}
              >
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
        )}
        {step === 'confirm' && (
          <UserNameChangeConfirmForm submitCallback={confirmCallback} />
        )}
        {step === 'complete' && (
          <>
            <Dialog.Message
              headline={Title}
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
                <Translate
                  zh_hant={TEXT.zh_hant.cancel}
                  zh_hans={TEXT.zh_hans.cancel}
                />
              </Dialog.Footer.Button>
            </Dialog.Footer>
          </>
        )}
      </Dialog>
    </>
  )
}
