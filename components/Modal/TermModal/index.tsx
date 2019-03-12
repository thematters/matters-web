import { withFormik } from 'formik'
import gql from 'graphql-tag'
import Router from 'next/router'
import { FC, useContext } from 'react'
import { Mutation } from 'react-apollo'

import { LanguageContext } from '~/components/Language'

import termStyles from '~/common/styles/utils/content.article.css'
import Privacy from '~/common/texts/privacy'
import ToS from '~/common/texts/tos'
import { translate } from '~/common/utils'

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

const MUTATION_UPDATE_AGREE_ON = gql`
  mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      info {
        agreeOn
      }
    }
  }
`

const MUTATION_USER_LOGOUT = gql`
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

  const Term = () => (
    <>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: translate({
            ...ToS,
            lang
          })
        }}
      />
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: translate({
            ...Privacy,
            lang
          })
        }}
      />
      <style jsx>{termStyles}</style>
    </>
  )

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
          <Mutation mutation={MUTATION_USER_LOGOUT}>
            {logout => (
              <div className="button disagree" onClick={() => disagree(logout)}>
                {translate({
                  zh_hant: '我不同意',
                  zh_hans: '我不同意',
                  lang
                })}
              </div>
            )}
          </Mutation>
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
    <Mutation mutation={MUTATION_UPDATE_AGREE_ON}>
      {update => <TermForm submitAction={update} />}
    </Mutation>
  )
}

export default TermModal
