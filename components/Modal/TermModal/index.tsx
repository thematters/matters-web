import { withFormik } from 'formik'
import { FC } from 'react'

import styles from './styles.css'

/**
 * This component is for term of use modal.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.TermModal close={close} interpret={intepret} />
 * ```
 */

interface Props {
  close: () => {}
  interpret: (text: string) => string
}

const TermModal: FC<Props> = ({ close, interpret }) => {
  const BaseForm = (props: { [key: string]: any }) => (
    <>
      <form className="form" onSubmit={props.handleSubmit}>
        <div className="term">
          <span className="hint">{interpret('termHint')}</span>
          <div className="context">
            {/* TODO: Content of term */}
            <br />
            <br />
          </div>
        </div>
        <div className="buttons">
          <div className="button disagree">{interpret('disagree')}</div>
          <button
            type="submit"
            className="button agree"
            disabled={props.isSubmitting}
          >
            {interpret('agreeAndContinue')}
          </button>
        </div>
      </form>
      <style jsx>{styles}</style>
    </>
  )

  const TermForm = withFormik({
    handleSubmit: async (values, { setSubmitting }) => {
      // TODO: Add mutation
      console.log(values) // For passing linting
      setSubmitting(false)
      close()
    }
  })(BaseForm)

  return <TermForm />
}

export default TermModal
