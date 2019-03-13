import { FC } from 'react'

import LoginForm from '~/components/Form/LoginForm'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { ModalSwitch } from '~/components/ModalManager'
import { TextIcon } from '~/components/TextIcon'

import ICON_ARROW from '~/static/icons/arrow-right-green.svg?sprite'

import styles from './styles.css'

/**
 * This component is for login modal.
 *
 * Usage:
 *
 * ```jsx
 *   <LoginModal close={close} />
 * ```
 *
 */

const SignUpModalSwitch = () => (
  <ModalSwitch modalId="signUpModal">
    {(open: any) => (
      <button type="button" onClick={open}>
        <TextIcon
          icon={
            <Icon
              style={{ width: 16, hieght: 10 }}
              id={ICON_ARROW.id}
              viewBox={ICON_ARROW.viewBox}
            />
          }
          color="green"
          size="md"
          textPlacement="left"
        >
          <Translate zh_hant="註冊" zh_hans="注册" />
        </TextIcon>
      </button>
    )}
  </ModalSwitch>
)

const Footer = () => (
  <footer>
    <Translate zh_hant="沒有帳號？" zh_hans="没有帐号？" />
    <SignUpModalSwitch />

    <style jsx>{styles}</style>
  </footer>
)

const LoginModal: FC<ModalInstanceProps> = ({ close }) => {
  return (
    <Modal.Content>
      <LoginForm purpose="modal" submitCallback={close} />
      <Footer />
    </Modal.Content>
  )
}

export default LoginModal
