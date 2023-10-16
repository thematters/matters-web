import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import {
  facebookOauthUrl,
  googleOauthUrl,
  twitterOauthUrl,
} from '~/common/utils'
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

  const oauthType = 'login'

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
