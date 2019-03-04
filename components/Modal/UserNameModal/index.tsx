import { FC, useContext, useState } from 'react'

import { Button } from '~/components/Button'
import { UserNameChangeConfirmForm } from '~/components/Form/UserNameChangeForm'
import { LanguageContext } from '~/components/Language'
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

  const Ask = () => (
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
      <style jsx>{styles}</style>
    </>
  )

  const Complete = () => (
    <>
      <div className="complete">
        <div className="message">
          {translate({
            zh_hant: 'Matters ID 修改成功',
            zh_hans: 'Matters ID 修改成功',
            lang
          })}
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      {step === 'ask' && <Ask />}
      {step !== 'ask' && (
        <ModalContent>
          {step === 'confirm' && (
            <UserNameChangeConfirmForm submitCallback={confirmCallback} />
          )}
          {step === 'complete' && <Complete />}
        </ModalContent>
      )}
      <style jsx>{styles}</style>
    </>
  )
}

export default UserNameModal
