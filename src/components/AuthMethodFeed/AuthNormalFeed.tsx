import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OAUTH_STORAGE_CODE_VERIFIER,
  OAUTH_STORAGE_NONCE,
  OAUTH_STORAGE_PATH,
  OAUTH_STORAGE_STATE,
  PATHS,
} from '~/common/enums'
import { generateChallenge, randomString, storage } from '~/common/utils'
import {
  IconFacebook22,
  IconGoogle22,
  IconMail22,
  IconSpinner22,
  IconX22,
  useRoute,
} from '~/components'

import styles from './styles.module.css'

interface Props {
  gotoEmailSignup: () => void
  gotoEmailLogin: () => void
}

export const AuthNormalFeed = ({ gotoEmailSignup, gotoEmailLogin }: Props) => {
  const { router } = useRoute()
  const [loadingState, setLoadingState] = useState('')
  const isGoogleLoading = loadingState === 'Google'
  const isTwitterLoading = loadingState === 'Twitter'
  const isFacebookLoading = loadingState === 'Facebook'
  useEffect(() => {
    return setLoadingState('')
  }, [])

  const gotoGoogle = () => {
    setLoadingState('Google')
    const state = randomString(8)
    const nonce = randomString(8)
    storage.set(OAUTH_STORAGE_STATE, state)
    storage.set(OAUTH_STORAGE_NONCE, nonce)
    storage.set(OAUTH_STORAGE_PATH, window.location.href)
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const redirectUri = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/google-callback/`
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid%20email&redirect_uri=${redirectUri}&state=${state}&nonce=${nonce}`
    router.push(url)
  }

  const gotoTwitter = async () => {
    setLoadingState('Twitter')
    const state = randomString(8)
    const codeVerifier = crypto.randomUUID()
    const codeChallenge = await generateChallenge(codeVerifier)
    storage.set(OAUTH_STORAGE_STATE, state)
    storage.set(OAUTH_STORAGE_PATH, window.location.href)
    storage.set(OAUTH_STORAGE_CODE_VERIFIER, codeVerifier)
    const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID
    const redirectUri = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/twitter-callback/`
    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=users.read%20tweet.read&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`
    router.push(url)
  }

  const gotoFacebook = async () => {
    setLoadingState('Facebook')
    const state = randomString(8)
    const codeVerifier = crypto.randomUUID() + crypto.randomUUID()
    const codeChallenge = await generateChallenge(codeVerifier)
    storage.set(OAUTH_STORAGE_STATE, state)
    storage.set(OAUTH_STORAGE_PATH, window.location.href)
    storage.set(OAUTH_STORAGE_CODE_VERIFIER, codeVerifier)
    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID
    const redirectUri = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/facebook-callback/`
    const url = `https://www.facebook.com/v17.0/dialog/oauth?response_type=code&scope=openid&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`
    router.push(url)
  }

  return (
    <>
      <ul className={styles.feed}>
        <li className={styles.item} role="button" onClick={gotoEmailLogin}>
          <span className={styles.icon}>
            <IconMail22 size="mdM" />
          </span>
          <span className={styles.name}>
            <FormattedMessage defaultMessage="Email" />
          </span>
        </li>
        <li className={styles.item} role="button" onClick={gotoGoogle}>
          <span className={styles.icon}>
            <IconGoogle22 size="mdM" />
          </span>
          <span className={styles.name}>Google</span>
          {isGoogleLoading && (
            <span className={styles.right}>
              <IconSpinner22 color="grey" size="mdM" />
            </span>
          )}
        </li>
        <li className={styles.item} role="button" onClick={gotoTwitter}>
          <span className={styles.icon}>
            <IconX22 size="mdM" />
          </span>
          <span className={styles.name}>Twitter</span>
          {isTwitterLoading && (
            <span className={styles.right}>
              <IconSpinner22 color="grey" size="mdM" />
            </span>
          )}
        </li>
        <li className={styles.item} role="button" onClick={gotoFacebook}>
          <span className={styles.icon}>
            <IconFacebook22 size="mdM" />
          </span>
          <span className={styles.name}>Facebook</span>
          {isFacebookLoading && (
            <span className={styles.right}>
              <IconSpinner22 color="grey" size="mdM" />
            </span>
          )}
        </li>
      </ul>
      <section className={styles.info}>
        <section className={styles.title}>
          <span className={styles.left}>
            <FormattedMessage
              defaultMessage="No account?"
              description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
            />
          </span>

          <span
            className={styles.right}
            onClick={gotoEmailSignup}
            role="button"
          >
            <FormattedMessage
              defaultMessage="Sign up with email"
              description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
            />
          </span>
        </section>
        <section className={styles.policy}>
          <FormattedMessage
            defaultMessage="Continued use indicates your agreement to"
            description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
          />
          <a href={PATHS.TOS} target="_blank">
            <FormattedMessage
              defaultMessage="the User Agreement and Privacy Policy."
              description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
            />
          </a>
        </section>
      </section>
    </>
  )
}
