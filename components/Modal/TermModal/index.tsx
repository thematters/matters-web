import { withFormik } from 'formik'
import { FC, useContext } from 'react'

import { Icon, LanguageContext, Title } from '~/components'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import styles from './styles.css'

interface Props {
  close: any
}

const TermModal: FC<Props> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

  const Header = () => (
    <>
      <div className="header">
        <Title type="modal">
          {translate({
            zh_hant: TEXT.zh_hant.term,
            zh_hans: TEXT.zh_hans.term,
            lang
          })}
        </Title>
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
          <span className="hint">
            {translate(
              {
                zh_hant: TEXT.zh_hant.termHint,
                zh_hans: TEXT.zh_hans.termHint
              },
              lang
            )}
          </span>
          <div className="description">
            {/* TODO: Content of term */}
            <br />
            <br />
          </div>
        </div>
        <div className="buttons">
          <div className="button disagree">
            {translate(
              {
                zh_hant: TEXT.zh_hant.disagree,
                zh_hans: TEXT.zh_hans.disagree
              },
              lang
            )}
          </div>
          <div className="button agree">
            {translate(
              {
                zh_hant: TEXT.zh_hant.agreeAndContinue,
                zh_hans: TEXT.zh_hans.agreeAndContinue
              },
              lang
            )}
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
