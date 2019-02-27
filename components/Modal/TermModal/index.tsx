import { withFormik } from 'formik'
import { FC, useContext } from 'react'

import { LanguageContext, Translate } from '~/components/Language'
import { PageHeader } from '~/components/PageHeader'

import termStyles from '~/common/styles/utils/content.article.css'
import { translate } from '~/common/utils'
import content from '~/pages/Misc/ToS/content'

import styles from './styles.css'

/**
 * This component is for term of use modal.
 *
 * Usage:
 *
 * ```jsx
 *   <Modal.TermModal close={close} />
 * ```
 */

interface Props {
  close: () => {}
}

const Term = ({ lang }: any) => (
  <>
    <PageHeader
      pageTitle={<Translate zh_hant="用戶協議" zh_hans="用户协议" />}
    />
    <div
      className="content"
      dangerouslySetInnerHTML={{
        __html: translate({
          ...content,
          lang
        })
      }}
    />
    <style jsx>{termStyles}</style>
  </>
)

const TermModal: FC<Props> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

  const BaseForm = (props: any) => (
    <>
      <form className="form" onSubmit={props.handleSubmit}>
        <div className="term">
          <span className="hint">
            {translate({
              zh_hant:
                '我們的用戶協議和隱私政策發生了更改，請閱讀並同意後繼續使用',
              zh_hans:
                '我们的用户协议和隐私政策发生了更改，请阅读并同意后继续使用',
              lang
            })}
            。
          </span>
          <div className="context">
            <Term lang={lang} />
          </div>
        </div>
        <div className="buttons">
          <div className="button disagree">
            {translate({
              zh_hant: '我不同意',
              zh_hans: '我不同意',
              lang
            })}
          </div>
          <button
            type="submit"
            className="button agree"
            disabled={props.isSubmitting}
          >
            {translate({
              zh_hant: '同意並繼續',
              zh_hans: '同意并继续',
              lang
            })}
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
