import { FC, useContext, useState } from 'react'

import { Button } from '~/components/Button'
import { UserNameChangeConfirmForm } from '~/components/Form/UserNameChangeForm'
import { LanguageContext, Translate } from '~/components/Language'
import ModalComplete from '~/components/Modal/Complete'
import ModalContent from '~/components/Modal/Content'

import { translate } from '~/common/utils'

import styles from './styles.css'

/**
 * This component is a modal for changing user name.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.UserNameModal close={close} />
 * ```
 *
 */

type Step = 'ask' | 'confirm' | 'complete'

const UserNameModal: FC<ModalInstanceProps> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

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
          <ModalContent>
            {translate({
              zh_hant: '您的 Matters ID 僅能永久修改一次，確定要繼續嗎？',
              zh_hans: '您的 Matters ID 仅能永久修改一次，确定要继续吗？',
              lang
            })}
          </ModalContent>
          <div className="ask-buttons">
            <Button
              type="button"
              bgColor="transparent"
              size="xlarge"
              onClick={close}
            >
              {translate({ zh_hant: '取消', zh_hans: '取消', lang })}
            </Button>
            <Button
              type="button"
              bgColor="transparent"
              className="u-link-green"
              size="xlarge"
              onClick={askCallback}
            >
              {translate({ zh_hant: '確定', zh_hans: '确定', lang })}
            </Button>
          </div>
        </>
      )}
      {step !== 'ask' && (
        <ModalContent>
          {step === 'confirm' && (
            <UserNameChangeConfirmForm submitCallback={confirmCallback} />
          )}
          {step === 'complete' && (
            <ModalComplete
              message={
                <Translate
                  zh_hant="Matters ID 修改成功"
                  zh_hans="Matters ID 修改成功"
                />
              }
            />
          )}
        </ModalContent>
      )}
      <style jsx>{styles}</style>
    </>
  )
}

export default UserNameModal
