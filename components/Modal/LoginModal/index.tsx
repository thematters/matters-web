import { FC } from 'react'

import LoginForm from '~/components/Form/LoginForm'

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

const LoginModal: FC<ModalInstanceProps> = ({ close }) => {
  return <LoginForm purpose="modal" submitCallback={close} />
}

export default LoginModal
