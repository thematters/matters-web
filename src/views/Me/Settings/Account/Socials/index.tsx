import { useApolloClient } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconGoogle2 from '@/public/static/icons/24px/google2.svg'
import IconTimes from '@/public/static/icons/24px/times.svg'
import IconX2 from '@/public/static/icons/24px/x2.svg'
import {
  OAUTH_STORAGE_BIND_STATE,
  OAUTH_STORAGE_BIND_STATE_FAILURE,
  OAUTH_STORAGE_BIND_STATE_SUCCESS,
  OAUTH_STORAGE_BIND_STATE_UNAVAILABLE,
} from '~/common/enums'
import {
  googleOauthUrl,
  isSafari,
  sleep,
  storage,
  twitterOauthUrl,
} from '~/common/utils'
import {
  Icon,
  RemoveSocialLoginDialog,
  Spinner,
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
  const twitterId = viewer.info.socialAccounts.find(
    (s) => s.type === SocialAccountType.Twitter
  )?.userName

  const { router } = useRoute()
  const [loadingState, setLoadingState] = useState('')
  const isGoogleLoading = loadingState === 'Google'
  const isTwitterLoading = loadingState === 'Twitter'

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

  useEffect(() => {
    const bindResult = storage.remove<{
      type: SocialAccountType
      state:
        | typeof OAUTH_STORAGE_BIND_STATE_SUCCESS
        | typeof OAUTH_STORAGE_BIND_STATE_FAILURE
        | typeof OAUTH_STORAGE_BIND_STATE_UNAVAILABLE
    }>(OAUTH_STORAGE_BIND_STATE)
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

  return (
    <>
      {/* Google */}
      <RemoveSocialLoginDialog type={SocialAccountType.Google}>
        {({ openDialog }) => {
          return (
            <TableView.Cell
              title={
                <TextIcon
                  icon={<Icon icon={IconGoogle2} size={22} />}
                  spacing={12}
                >
                  Google
                </TextIcon>
              }
              rightText={googleId}
              rightIcon={
                googleId ? (
                  <Icon icon={IconTimes} size={20} color="greyDarker" />
                ) : undefined
              }
              onClick={googleId ? () => openDialog() : undefined}
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
                    {isGoogleLoading && <Spinner color="greyLight" size={20} />}
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
                <TextIcon icon={<Icon icon={IconX2} size={22} />} spacing={12}>
                  X
                </TextIcon>
              }
              rightText={twitterId ? `@${twitterId}` : undefined}
              rightIcon={
                twitterId ? (
                  <Icon icon={IconTimes} size={20} color="greyDarker" />
                ) : undefined
              }
              onClick={twitterId ? () => openDialog() : undefined}
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
                      <Spinner color="greyLight" size={20} />
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
