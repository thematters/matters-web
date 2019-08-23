import { withFormik } from 'formik'
import gql from 'graphql-tag'
import Router from 'next/router'
import { FC, useContext } from 'react'

import { Mutation } from '~/components/GQL'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext } from '~/components/Language'
import { Term } from '~/components/Term'

import { TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

/**
 * This component is for term of use modal.
 *
 * Usage:
 *
 * ```jsx
 *   <TermModal close={close} />
 * ```
 */

const UPDATE_AGREE_ON = gql`
  mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      info {
        agreeOn
      }
    }
  }
`

const USER_LOGOUT = gql`
  mutation UserLogout {
    userLogout
  }
`

const TermModal: FC<ModalInstanceProps> = ({ close }) => {
  const { lang } = useContext(LanguageContext)

  const disagree = (action: any) => {
    if (action) {
      action()
        .then(() => {
          close()
          Router.replace('/')
        })
        .catch(() => {
          // TODO: Handle error
        })
    }
  }

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
            <Term />
          </div>
        </div>
        <div className="buttons">
          <Mutation mutation={USER_LOGOUT}>
            {logout => (
              <button
                type="button"
                className="disagree"
                onClick={() => disagree(logout)}
              >
                {translate({
                  zh_hant: TEXT.zh_hant.disagree,
                  zh_hans: TEXT.zh_hans.disagree,
                  lang
                })}
              </button>
            )}
          </Mutation>
          <button type="submit" className="agree" disabled={props.isSubmitting}>
            {props.isSubmitting && <IconSpinner />}
            {!props.isSubmitting &&
              translate({
                zh_hant: TEXT.zh_hant.agreeAndContinue,
                zh_hans: TEXT.zh_hans.agreeAndContinue,
                lang
              })}
          </button>
        </div>
      </form>
      <style jsx>{styles}</style>
    </>
  )

  const TermForm: any = withFormik({
    handleSubmit: (values, { props, setSubmitting }: any) => {
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }
      submitAction({ variables: { input: { agreeOn: true } } })
        .then((result: any) => {
          close()
        })
        .catch((result: any) => {
          // TODO: Handle error
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <Mutation mutation={UPDATE_AGREE_ON}>
      {update => <TermForm submitAction={update} />}
    </Mutation>
  )
}

export default TermModal
