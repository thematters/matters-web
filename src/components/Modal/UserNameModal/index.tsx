import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import { UserNameChangeConfirmForm } from '~/components/Form/UserNameChangeForm'
import ModalComplete from '~/components/Modal/Complete'

import { TEXT } from '~/common/enums'

/**
 * This component is a modal for changing user name.
 *
 * Usage:
 *
 * ```jsx
 *   <UserNameModal close={close} />
 * ```
 *
 */

type Step = 'ask' | 'confirm' | 'complete'

const UserNameModal: React.FC<ModalInstanceProps> = ({ close }) => {
  const [step, setStep] = useState<Step>('ask')

  const confirmCallback = () => setStep('complete')

  return (
    <>
      {step === 'ask' && (
        <>
          <Dialog.Content>
            <Translate
              zh_hant="您的 Matters ID 僅能永久修改一次，確定要繼續嗎？"
              zh_hans="您的 Matters ID 仅能永久修改一次，确定要继续吗？"
            />
          </Dialog.Content>
          <Dialog.Footer>
            <Dialog.Button
              bgColor="grey-lighter"
              textColor="black"
              onClick={close}
            >
              <Translate
                zh_hant={TEXT.zh_hant.cancel}
                zh_hans={TEXT.zh_hans.cancel}
              />
            </Dialog.Button>
            <Dialog.Button
              onClick={(event: any) => {
                event.stopPropagation()
                setStep('confirm')
              }}
            >
              <Translate
                zh_hant={TEXT.zh_hant.confirm}
                zh_hans={TEXT.zh_hans.confirm}
              />
            </Dialog.Button>
          </Dialog.Footer>
        </>
      )}

      {step !== 'ask' && (
        <>
          {step === 'confirm' && (
            <UserNameChangeConfirmForm submitCallback={confirmCallback} />
          )}
          {step === 'complete' && (
            <ModalComplete
              message={
                <Translate
                  zh_hant={TEXT.zh_hant.changeUserNameSuccess}
                  zh_hans={TEXT.zh_hans.changeUserNameSuccess}
                />
              }
            />
          )}
        </>
      )}
    </>
  )
}

export default UserNameModal
