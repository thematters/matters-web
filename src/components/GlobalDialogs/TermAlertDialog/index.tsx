import { useFormik } from 'formik'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { ADD_TOAST, COOKIE_TOKEN_NAME, COOKIE_USER_GROUP } from '~/common/enums'
import { removeCookies } from '~/common/utils'
import {
  Dialog,
  Term,
  Translate,
  useDialogSwitch,
  useMutation,
  ViewerContext,
} from '~/components'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import {
  UpdateUserInfoAgreeOnMutation,
  UserLogoutMutation,
} from '~/gql/graphql'

import styles from './styles.module.css'

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
  const router = useRouter()
  const [logout] = useMutation<UserLogoutMutation>(USER_LOGOUT, undefined, {
    showToast: false,
  })
  const [update] = useMutation<UpdateUserInfoAgreeOnMutation>(UPDATE_AGREE_ON)

  const { handleSubmit, isSubmitting } = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await update({ variables: { input: { agreeOn: true } } })
        setSubmitting(false)
        closeDialog()
      } catch (error) {
        setSubmitting(false)
      }
    },
  })

  const onLogout = async () => {
    try {
      await logout()
      removeCookies([COOKIE_TOKEN_NAME, COOKIE_USER_GROUP])

      closeDialog()

      router.replace('/')
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="failureLogout" />,
          },
        })
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="termAndPrivacy" closeDialog={closeDialog} />

      <Dialog.Content spacing={['base', 'base']}>
        <p className={styles['hint']}>
          <Translate
            zh_hant="我們的用戶協議和隱私政策發生了更改，請閱讀並同意後繼續使用。"
            zh_hans="我们的用户协议和隐私政策发生了更改，请阅读并同意后继续使用。"
            en="Our Terms and Privacy Policy has changed. To continue, please read and agree to it."
          />
        </p>

        <div className={styles['context']}>
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
    </form>
  )
}

const TermAlertDialog = () => {
  const viewer = useContext(ViewerContext)
  const disagreedToS = viewer.info.agreeOn === null
  const { show, closeDialog } = useDialogSwitch(disagreedToS)

  return (
    <Dialog isOpen={show} onDismiss={closeDialog}>
      <TermContent closeDialog={closeDialog} />
    </Dialog>
  )
}

export default TermAlertDialog
