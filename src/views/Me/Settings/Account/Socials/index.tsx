import { useApolloClient } from '@apollo/react-hooks'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OAUTH_STORAGE_BIND_STATE,
  OAUTH_STORAGE_BIND_STATE_FAILURE,
  OAUTH_STORAGE_BIND_STATE_SUCCESS,
  OAUTH_STORAGE_BIND_STATE_UNAVAILABLE,
} from '~/common/enums'
import {
  facebookOauthUrl,
  googleOauthUrl,
  isSafari,
  sleep,
  storage,
  twitterOauthUrl,
} from '~/common/utils'
import {
  IconClose20,
  IconFacebook22,
  IconGoogle22,
  IconSpinner16,
  IconX22,
  RemoveSocialLoginDialog,
  TableView,
  TextIcon,
  toast,
  useRoute,
  ViewerContext,
} from '~/components'
import { OAUTH_REQUEST_TOKEN } from '~/components/GQL/queries/oauthRequestToken'
import { SocialAccountType } from '~/gql/graphql'

import { SettingsButton } from '../../Button'

const Socials = () => {
  const viewer = useContext(ViewerContext)
  const client = useApolloClient()

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
    try {
      const response = await client.query({
        query: OAUTH_REQUEST_TOKEN,
        fetchPolicy: 'network-only',
      })
      const oauthRequestToken = response.data.oauthRequestToken
      if (!oauthRequestToken) {
        throw new Error('failed to get oauth request token')
      }
      const url = await twitterOauthUrl(oauthType, oauthRequestToken)
      router.push(url)
    } catch (error) {
      await sleep(3 * 1000)
      gotoTwitter()
    }
  }

  const gotoFacebook = async () => {
    setLoadingState('Facebook')
    const url = await facebookOauthUrl(oauthType)
    router.push(url)
  }

  useEffect(() => {
    const bindResult = storage.remove(OAUTH_STORAGE_BIND_STATE)
    if (!bindResult) {
      return
    }
    const state = bindResult.state
    const delay = isSafari() ? 2 * 1000 : 0
    if (state === OAUTH_STORAGE_BIND_STATE_SUCCESS) {
      setTimeout(() => {
        toast.success({
          message: (
            <FormattedMessage
              defaultMessage="Connected to {type}"
              id="C3NKBg"
              description="src/views/Me/Settings/Settings/Socials/index.tsx"
              values={{
                type: bindResult.type,
              }}
            />
          ),
        })
      }, delay)
      return
    }

    if (state === OAUTH_STORAGE_BIND_STATE_FAILURE) {
      setTimeout(() => {
        toast.error({
          message: (
            <FormattedMessage
              defaultMessage="This {type} account is connected to a Matters account. Sign in to that account to disconnect it then try again"
              id="D+N1Q6"
              description="src/views/Me/Settings/Settings/Socials/index.tsx"
              values={{
                type: bindResult.type,
              }}
            />
          ),
        })
      }, delay)
      return
    }

    if (state === OAUTH_STORAGE_BIND_STATE_UNAVAILABLE) {
      setTimeout(() => {
        toast.error({
          message: (
            <FormattedMessage
              defaultMessage="Unavailable"
              id="rADhX5"
              description="FORBIDDEN_BY_STATE"
            />
          ),
        })
      }, delay)
      return
    }
  }, [])

  // FIXME: For canary release purpose,
  // we don't allow user to remove facebook login
  // unless the user has least two login methods
  const canEmailLogin = !!viewer.info.email
  const canWalletLogin = !!viewer.info.ethAddress
  const nonFacebookSocials = viewer.info.socialAccounts.filter(
    (s) => s.type !== SocialAccountType.Facebook
  )
  const canRemoveNonFacebookLogins =
    +canEmailLogin + +canWalletLogin + nonFacebookSocials.length > 1

  return (
    <>
      {/* Google */}
      <RemoveSocialLoginDialog type={SocialAccountType.Google}>
        {({ openDialog }) => {
          return (
            <TableView.Cell
              title={
                <TextIcon icon={<IconGoogle22 size="mdM" />} spacing="tight">
                  Google
                </TextIcon>
              }
              rightText={googleId}
              rightIcon={
                googleId && canRemoveNonFacebookLogins ? (
                  <IconClose20 size="mdS" color="greyDarker" />
                ) : undefined
              }
              onClick={
                googleId && canRemoveNonFacebookLogins
                  ? () => openDialog()
                  : undefined
              }
              right={
                googleId ? undefined : (
                  <>
                    {!isGoogleLoading && (
                      <SettingsButton onClick={gotoGoogle}>
                        <FormattedMessage
                          defaultMessage="Connect"
                          id="+vVZ/G"
                        />
                      </SettingsButton>
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
            <TableView.Cell
              title={
                <TextIcon icon={<IconX22 size="mdM" />} spacing="tight">
                  Twitter
                </TextIcon>
              }
              rightText={twitterId ? `@${twitterId}` : undefined}
              rightIcon={
                twitterId && canRemoveNonFacebookLogins ? (
                  <IconClose20 size="mdS" color="greyDarker" />
                ) : undefined
              }
              onClick={
                twitterId && canRemoveNonFacebookLogins
                  ? () => openDialog()
                  : undefined
              }
              right={
                twitterId ? undefined : (
                  <>
                    {!isTwitterLoading && (
                      <SettingsButton onClick={gotoTwitter}>
                        <FormattedMessage
                          defaultMessage="Connect"
                          id="+vVZ/G"
                        />
                      </SettingsButton>
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
            <TableView.Cell
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
                      <SettingsButton onClick={gotoFacebook}>
                        <FormattedMessage
                          defaultMessage="Connect"
                          id="+vVZ/G"
                        />
                      </SettingsButton>
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
