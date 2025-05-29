import { useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconGoogle2 from '@/public/static/icons/24px/google2.svg'
import IconMail from '@/public/static/icons/24px/mail.svg'
import IconX2 from '@/public/static/icons/24px/x2.svg'
import { PATHS } from '~/common/enums'
import { googleOauthUrl, sleep, twitterOauthUrl } from '~/common/utils'
import { Icon, Spinner, useRoute } from '~/components'

import { OAUTH_REQUEST_TOKEN } from '../GQL/queries/oauthRequestToken'
import styles from './styles.module.css'

interface Props {
  gotoEmailSignup: () => void
  gotoEmailLogin: () => void
}

export const AuthNormalFeed = ({ gotoEmailSignup, gotoEmailLogin }: Props) => {
  const client = useApolloClient()
  const { router } = useRoute()
  const [loadingState, setLoadingState] = useState('')
  const isGoogleLoading = loadingState === 'Google'
  const isTwitterLoading = loadingState === 'Twitter'

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
    } catch {
      await sleep(3 * 1000)
      gotoTwitter()
    }
  }

  return (
    <>
      <ul className={styles.feed}>
        <li className={styles.item} role="button" onClick={gotoEmailLogin}>
          <span className={styles.icon}>
            <Icon icon={IconMail} size={22} />
          </span>
          <span className={styles.name}>
            <FormattedMessage defaultMessage="Email" id="sy+pv5" />
          </span>
        </li>
        <li className={styles.item} role="button" onClick={gotoGoogle}>
          <span className={styles.icon}>
            <Icon icon={IconGoogle2} size={22} />
          </span>
          <span className={styles.name}>Google</span>
          {isGoogleLoading && (
            <span className={styles.right}>
              <Spinner color="grey" size={22} />
            </span>
          )}
        </li>
        <li className={styles.item} role="button" onClick={gotoTwitter}>
          <span className={styles.icon}>
            <Icon icon={IconX2} size={22} />
          </span>
          <span className={styles.name}>X</span>
          {isTwitterLoading && (
            <span className={styles.right}>
              <Spinner color="grey" size={22} />
            </span>
          )}
        </li>
      </ul>
      <section className={styles.info}>
        <section className={styles.title}>
          <span className={styles.left}>
            <FormattedMessage
              defaultMessage="No account?"
              id="L34EMG"
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
              id="jBx/nm"
              description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
            />
          </span>
        </section>
        <section className={styles.policy}>
          <FormattedMessage
            defaultMessage="Continued use indicates your agreement to"
            id="3phEFL"
            description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
          />
          <a href={PATHS.TOS} target="_blank">
            <FormattedMessage
              defaultMessage="the User Agreement and Privacy Policy."
              id="zOZ77e"
              description="src/components/Forms/SelectAuthMethodForm/NormalFeed.tsx"
            />
          </a>
        </section>
      </section>
    </>
  )
}
