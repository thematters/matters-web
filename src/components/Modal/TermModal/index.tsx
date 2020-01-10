import { useFormik } from 'formik'
import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'

import { Icon, LanguageContext } from '~/components'
import { useMutation } from '~/components/GQL'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import { Term } from '~/components/Term'

import { TEXT } from '~/common/enums'
import { translate, unsubscribePush } from '~/common/utils'

import { Modal } from '..'
import styles from './styles.css'

import { UserLogout } from '~/components/GQL/mutations/__generated__/UserLogout'
import { UpdateUserInfoAgreeOn } from './__generated__/UpdateUserInfoAgreeOn'

/**
 * This component is for term of use modal.
 *
 * Usage:
 *
 * ```jsx
 *   <TermModal close={close} />
 * ```
 */

type FormProps = ModalInstanceProps

const UPDATE_AGREE_ON = gql`
  mutation UpdateUserInfoAgreeOn($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      info {
        agreeOn
      }
    }
  }
`

const TermModal: React.FC<FormProps> = formProps => {
  const [logout] = useMutation<UserLogout>(USER_LOGOUT)
  const [update] = useMutation<UpdateUserInfoAgreeOn>(UPDATE_AGREE_ON)
  const { lang } = useContext(LanguageContext)
  const { handleSubmit, isSubmitting } = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await update({ variables: { input: { agreeOn: true } } })
        formProps.close()
      } catch (error) {
        // TODO: Handle error
      }
      setSubmitting(false)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
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
        <Modal.FooterButton
          onClick={async () => {
            try {
              await logout()

              try {
                await unsubscribePush()
                // await clearPersistCache()
              } catch (e) {
                console.error('Failed to unsubscribePush after logged out')
              }

              formProps.close()

              Router.replace('/')
            } catch (e) {
              // TODO
            }
          }}
          bgColor="white"
        >
          {translate({
            zh_hant: TEXT.zh_hant.disagree,
            zh_hans: TEXT.zh_hans.disagree,
            lang
          })}
        </Modal.FooterButton>

        <Modal.FooterButton
          htmlType="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting && <Icon.Spinner size="md" />}
          {!isSubmitting &&
            translate({
              zh_hant: TEXT.zh_hant.agreeAndContinue,
              zh_hans: TEXT.zh_hans.agreeAndContinue,
              lang
            })}
        </Modal.FooterButton>
      </div>

      <style jsx>{styles}</style>
    </form>
  )
}

export default TermModal
