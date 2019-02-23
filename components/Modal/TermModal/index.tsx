// External modules
import classNames from 'classnames'
import { withFormik } from 'formik'
import { FC, useContext, useEffect, useState } from 'react'

// Internal modules
import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'
import { Button, Icon, LanguageContext, Modal, Title } from '~/components'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'
import styles from './styles.css'

interface Props {
  close: any
}

const TermModal: FC<Props> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

  const interpret = (text: string, language: string) => {
    return translate(
      {
        zh_hant: TEXT.zh_hant[text],
        zh_hans: TEXT.zh_hans[text]
      },
      language
    )
  }

  const Header = () => (
    <>
      <div className="header">
        <Title type="modal">{interpret('term', lang)}</Title>
        <button onClick={close}>
          <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} />
        </button>
      </div>
      <style jsx>{styles}</style>
    </>
  )

  const BaseForm = ({ handleSubmit }) => (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="term">
          <span className="hint">{interpret('termHint', lang)}</span>
          <div className="description">
            {/* TODO: Content of term */}
            <br />
            <br />
          </div>
        </div>
        <div className="buttons">
          <div className="button disagree">{interpret('disagree', lang)}</div>
          <div className="button agree">
            {interpret('agreeAndContinue', lang)}
          </div>
        </div>
      </form>
      <style jsx>{styles}</style>
    </>
  )

  const TermForm = withFormik({
    handleSubmit: async (valuse, { setSubmitting }) => {
      // TODO: Add mutation
    }
  })(BaseForm)

  return (
    <>
      <div className="container">
        <Header />
        <div className="container-wrapper">
          <div className="content">
            <TermForm />
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default TermModal
