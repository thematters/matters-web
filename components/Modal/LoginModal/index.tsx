import classNames from 'classnames'
import { FC } from 'react'

import { Form } from '~/components/Form'
import { Icon } from '~/components/Icon'

import ICON_ARROW from '~/static/icons/arrow-right-green.svg?sprite'

import styles from './styles.css'

/**
 * This component is for login modal.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.LoginModal close={close} interpret={interpret} />
 * ```
 *
 */

interface Props {
  close: () => {}
  interpret: (text: string) => string
}

const LoginModal: FC<Props> = ({ close, interpret }) => {
  const contentClass = classNames(
    'l-col-4',
    'l-col-sm-6',
    'l-col-md-6',
    'l-col-lg-8',
    'content'
  )

  const Footer = () => (
    <>
      <div className="footer">
        {interpret('hasNoAccount')}？
        <span className="link">
          {interpret('register')}
          <Icon
            style={{ width: 16, hieght: 10, marginLeft: '0.25rem' }}
            id={ICON_ARROW.id}
            viewBox={ICON_ARROW.viewBox}
          />
        </span>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  return (
    <>
      <div className="container">
        <div className={contentClass}>
          <Form.LoginForm purpose="modal" submitCallback={close} />
          <hr className="divider" />
          <Footer />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default LoginModal
