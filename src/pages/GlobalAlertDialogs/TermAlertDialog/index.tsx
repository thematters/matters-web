import { useFormik } from 'formik'
import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'

import {
  Button,
  Dialog,
  DialogInstanceProps,
  Icon,
  TextIcon,
  Translate
} from '~/components'
import { useMutation } from '~/components/GQL'
import USER_LOGOUT from '~/components/GQL/mutations/userLogout'
import { Term } from '~/components/Term'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import { unsubscribePush } from '~/common/utils'

import styles from './styles.css'

import { UserLogout } from '~/components/GQL/mutations/__generated__/UserLogout'
import { UpdateUserInfoAgreeOn } from './__generated__/UpdateUserInfoAgreeOn'

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

const TermContent: React.FC<DialogInstanceProps> = ({ close }) => {
  const [logout] = useMutation<UserLogout>(USER_LOGOUT)
  const [update] = useMutation<UpdateUserInfoAgreeOn>(UPDATE_AGREE_ON)
  const { handleSubmit, isSubmitting } = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await update({ variables: { input: { agreeOn: true } } })
        close()
      } catch (error) {
        // TODO: Handle error
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

      close()

      Router.replace('/')
    } catch (e) {
      // TODO
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <Button
          bgColor="grey-lighter"
          size={['100%', '3rem']}
          onClick={onLogout}
        >
          <TextIcon color="black">
            <Translate
              zh_hant={TEXT.zh_hant.disagree}
              zh_hans={TEXT.zh_hans.disagree}
            />
          </TextIcon>
        </Button>

        <Button
          type="submit"
          bgColor="green"
          size={['100%', '3rem']}
          disabled={isSubmitting}
        >
          <TextIcon
            color="white"
            icon={isSubmitting && <Icon.Spinner size="md" />}
          >
            {!isSubmitting && (
              <Translate
                zh_hant={TEXT.zh_hant.agreeAndContinue}
                zh_hans={TEXT.zh_hans.agreeAndContinue}
              />
            )}
          </TextIcon>
        </Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </form>
  )
}

const TermAlertDialog = () => {
  const viewer = useContext(ViewerContext)
  const disagreedToS = viewer.info?.agreeOn === null

  return (
    <Dialog
      title={TEXT.zh_hant.termAndPrivacy}
      defaultShowDialog={disagreedToS}
    >
      {({ close }: DialogInstanceProps) => <TermContent close={close} />}
    </Dialog>
  )
}

export default TermAlertDialog
