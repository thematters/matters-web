import classNames from 'classnames'
import { FC, useContext } from 'react'

import { Form } from '~/components/Form'
import { Icon } from '~/components/Icon'
import { LanguageContext } from '~/components/Language'

import { translate } from '~/common/utils'
import ICON_ARROW from '~/static/icons/arrow-right-green.svg?sprite'

import styles from './styles.css'

/**
 * This component is for sign up modal.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.SignUpModal close={close} />
 * ```
 *
 */

interface Props {
  close: () => {}
}

const SignUpModal: FC<Props> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

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
        {translate({
          zh_hant: '已有帳號',
          zh_hans: '已有帐号',
          lang
        })}
        ？
        <span className="link">
          {translate({
            zh_hant: '登入',
            zh_hans: '登入',
            lang
          })}
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
          <Form.SignUpForm purpose="modal" submitCallback={close} />
          <hr className="divider" />
          <Footer />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default SignUpModal
