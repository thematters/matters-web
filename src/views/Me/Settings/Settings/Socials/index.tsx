import { useContext, useLayoutEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OAUTH_STORAGE_BIND_STATE,
  OAUTH_STORAGE_BIND_STATE_FAILURE,
  OAUTH_STORAGE_BIND_STATE_SUCCESS,
} from '~/common/enums'
import {
  facebookOauthUrl,
  googleOauthUrl,
  storage,
  twitterOauthUrl,
} from '~/common/utils'
import {
  Button,
  Form,
  IconClose20,
  IconFacebook22,
  IconGoogle22,
  IconSpinner16,
  IconX22,
  RemoveSocialLoginDialog,
  TextIcon,
  toast,
  useRoute,
  ViewerContext,
} from '~/components'
import { SocialAccountType } from '~/gql/graphql'

const Socials = () => {
  const viewer = useContext(ViewerContext)

  const googleId = viewer.info.socialAccounts.find(
    (s) => s.type === SocialAccountType.Google
  )?.email
  const facebookId = viewer.info.socialAccounts.find(
    (s) => s.type === SocialAccountType.Facebook
  )?.userName
  const twitterId = viewer.info.socialAccounts.find(
    (s) => s.type === SocialAccountType.Twitter
  )?.userName

  const { router } = useRoute()
  const [loadingState, setLoadingState] = useState('')
  const isGoogleLoading = loadingState === 'Google'
  const isTwitterLoading = loadingState === 'Twitter'
  const isFacebookLoading = loadingState === 'Facebook'

  const oauthType = 'bind'

  const gotoGoogle = async () => {
    setLoadingState('Google')
    const url = await googleOauthUrl(oauthType)
    router.push(url)
  }

  const gotoTwitter = async () => {
    setLoadingState('Twitter')
    const url = await twitterOauthUrl(oauthType)
    router.push(url)
  }

  const gotoFacebook = async () => {
    setLoadingState('Facebook')
    const url = await facebookOauthUrl(oauthType)
    router.push(url)
  }

  useLayoutEffect(() => {
    const bindResult = storage.remove(OAUTH_STORAGE_BIND_STATE)
    if (!bindResult) {
      return
    }
    const state = bindResult.state
    if (state === OAUTH_STORAGE_BIND_STATE_SUCCESS) {
      setTimeout(() => {
        toast.success({
          message: (
            <FormattedMessage
              defaultMessage="Connected to {type}"
              description="src/views/Me/Settings/Settings/Socials/index.tsx"
              values={{
                type: bindResult.type,
              }}
            />
          ),
        })
      })
      return
    }

    if (state === OAUTH_STORAGE_BIND_STATE_FAILURE) {
      setTimeout(() => {
        toast.error({
          message: (
            <FormattedMessage
              defaultMessage="This {type} account is connected to a Matters account. Sign in to that account to disconnect it then try again"
              description="src/views/Me/Settings/Settings/Socials/index.tsx"
              values={{
                type: bindResult.type,
              }}
            />
          ),
        })
      })
      return
    }
  }, [])

  return (
    <>
      {/* Google */}
      <RemoveSocialLoginDialog type={SocialAccountType.Google}>
        {({ openDialog }) => {
          return (
            <Form.List.Item
              title={
                <TextIcon icon={<IconGoogle22 size="mdM" />} spacing="tight">
                  Google
                </TextIcon>
              }
              rightText={googleId}
              rightIcon={
                googleId ? (
                  <IconClose20 size="mdS" color="greyDarker" />
                ) : undefined
              }
              onClick={googleId ? () => openDialog() : undefined}
              right={
                googleId ? undefined : (
                  <>
                    {!isGoogleLoading && (
                      <Button
                        size={[null, '1.5rem']}
                        spacing={[0, 'tight']}
                        textColor="green"
                        borderColor="green"
                        onClick={gotoGoogle}
                      >
                        <FormattedMessage defaultMessage="Connect" />
                      </Button>
                    )}
                    {isGoogleLoading && (
                      <IconSpinner16 color="greyLight" size="mdS" />
                    )}
                  </>
                )
              }
            />
          )
        }}
      </RemoveSocialLoginDialog>

      {/* Twitter */}
      <RemoveSocialLoginDialog type={SocialAccountType.Twitter}>
        {({ openDialog }) => {
          return (
            <Form.List.Item
              title={
                <TextIcon icon={<IconX22 size="mdM" />} spacing="tight">
                  Twitter
                </TextIcon>
              }
              rightText={twitterId ? `@${twitterId}` : undefined}
              rightIcon={
                twitterId ? (
                  <IconClose20 size="mdS" color="greyDarker" />
                ) : undefined
              }
              onClick={twitterId ? () => openDialog() : undefined}
              right={
                twitterId ? undefined : (
                  <>
                    {!isTwitterLoading && (
                      <Button
                        size={[null, '1.5rem']}
                        spacing={[0, 'tight']}
                        textColor="green"
                        borderColor="green"
                        onClick={gotoTwitter}
                      >
                        <FormattedMessage defaultMessage="Connect" />
                      </Button>
                    )}
                    {isTwitterLoading && (
                      <IconSpinner16 color="greyLight" size="mdS" />
                    )}
                  </>
                )
              }
            />
          )
        }}
      </RemoveSocialLoginDialog>

      {/* Facebook */}
      <RemoveSocialLoginDialog type={SocialAccountType.Facebook}>
        {({ openDialog }) => {
          return (
            <Form.List.Item
              title={
                <TextIcon icon={<IconFacebook22 size="mdM" />} spacing="tight">
                  Facebook
                </TextIcon>
              }
              rightText={facebookId ? `@${facebookId}` : undefined}
              rightIcon={
                facebookId ? (
                  <IconClose20 size="mdS" color="greyDarker" />
                ) : undefined
              }
              onClick={facebookId ? () => openDialog() : undefined}
              right={
                facebookId ? undefined : (
                  <>
                    {!isFacebookLoading && (
                      <Button
                        size={[null, '1.5rem']}
                        spacing={[0, 'tight']}
                        textColor="green"
                        borderColor="green"
                        onClick={gotoFacebook}
                      >
                        <FormattedMessage defaultMessage="Connect" />
                      </Button>
                    )}
                    {isFacebookLoading && (
                      <IconSpinner16 color="greyLight" size="mdS" />
                    )}
                  </>
                )
              }
            />
          )
        }}
      </RemoveSocialLoginDialog>
    </>
  )
}

export default Socials
