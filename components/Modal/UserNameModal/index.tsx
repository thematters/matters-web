import { FC, useState } from 'react'

import { UserNameChangeConfirmForm } from '~/components/Form/UserNameChangeForm'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import ModalComplete from '~/components/Modal/Complete'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

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

const UserNameModal: FC<ModalInstanceProps> = ({ close }) => {
  const [step, setStep] = useState<Step>('ask')

  const askCallback = (event: any) => {
    event.stopPropagation()
    setStep('confirm')
  }

  const confirmCallback = () => setStep('complete')

  return (
    <>
      {step === 'ask' && (
        <>
          <Modal.Content>
            <Translate
              zh_hant="您的 Matters ID 僅能永久修改一次，確定要繼續嗎？"
              zh_hans="您的 Matters ID 仅能永久修改一次，确定要继续吗？"
            />
          </Modal.Content>
          <div className="buttons">
            <button type="button" className="cancel" onClick={close}>
              <Translate
                zh_hant={TEXT.zh_hant.cancel}
                zh_hans={TEXT.zh_hans.cancel}
              />
            </button>
            <button type="button" className="confirm" onClick={askCallback}>
              <Translate
                zh_hant={TEXT.zh_hant.confirm}
                zh_hans={TEXT.zh_hans.confirm}
              />
            </button>
          </div>
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
      <style jsx>{styles}</style>
    </>
  )
}

export default UserNameModal
