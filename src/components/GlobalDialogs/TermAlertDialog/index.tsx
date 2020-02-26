import { useFormik } from 'formik'
import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext, useState } from 'react'

import {
  Dialog,
  LanguageContext,
  Term,
  Translate,
  ViewerContext
} from '~/components'
import { useMutation } from '~/components/GQL'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'

import { ADD_TOAST } from '~/common/enums'
import { parseFormSubmitErrors, unsubscribePush } from '~/common/utils'

import styles from './styles.css'

import { UserLogout } from '~/components/GQL/mutations/__generated__/UserLogout'
import { UpdateUserInfoAgreeOn } from './__generated__/UpdateUserInfoAgreeOn'

interface TermContentProps {
  closeDialog: () => void
}

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

const TermContent: React.FC<TermContentProps> = ({ closeDialog }) => {
  const [logout] = useMutation<UserLogout>(USER_LOGOUT)
  const [update] = useMutation<UpdateUserInfoAgreeOn>(UPDATE_AGREE_ON)
  const { lang } = useContext(LanguageContext)

  const { handleSubmit, isSubmitting } = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await update({ variables: { input: { agreeOn: true } } })
        closeDialog()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'red',
              content: messages[codes[0]]
            }
          })
        )
      }
      setSubmitting(false)
    }
  })

  const onLogout = async () => {
    try {
      await logout()

      try {
        await unsubscribePush()
        // await clearPersistCache()
      } catch (e) {
        console.error('Failed to unsubscribePush after logged out')
      }

      closeDialog()

      Router.replace('/')
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="failureLogout" />
          }
        })
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Dialog.Header
        title={<Translate id="termAndPrivacy" />}
        close={closeDialog}
      />

      <Dialog.Content>
        <p className="hint">
          <Translate
            zh_hant="我們的用戶協議和隱私政策發生了更改，請閱讀並同意後繼續使用。"
            zh_hans="我们的用户协议和隐私政策发生了更改，请阅读并同意后继续使用。"
          />
        </p>

        <div className="context">
          <Term />
        </div>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          <Translate id="agreeAndContinue" />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          bgColor="grey-lighter"
          textColor="black"
          onClick={onLogout}
        >
          <Translate id="disagree" />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </form>
  )
}

const TermAlertDialog = () => {
  const viewer = useContext(ViewerContext)
  const disagreedToS = viewer.info.agreeOn === null

  const close = () => setShowDialog(false)
  const [showDialog, setShowDialog] = useState(disagreedToS)

  return (
    <Dialog isOpen={showDialog} onDismiss={close}>
      <TermContent closeDialog={close} />
    </Dialog>
  )
}

export default TermAlertDialog
