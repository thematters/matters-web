import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { appendTarget, toReadableScope } from '~/common/utils'
import {
  Dialog,
  LanguageContext,
  Layout,
  SpinnerBlock,
  Throw404,
  Translate,
  UserDigest,
  useRoute,
  ViewerContext,
} from '~/components'
import { OAuthClientInfoQuery } from '~/gql/graphql'

import { Box } from '../Box'
import styles from './styles.module.css'

const OAUTH_AUTHORIZE_ENDPOINT = `${process.env.NEXT_PUBLIC_OAUTH_URL}/authorize`

const OAUTH_CLIENT_INFO = gql`
  query OAuthClientInfo($id: ID!) {
    oauthClient(input: { id: $id }) {
      id
      name
      avatar
      website
      scope
    }
  }
`

const BaseOAuthAuthorize = () => {
  const { getQuery, router } = useRoute()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const actionUrl = `${OAUTH_AUTHORIZE_ENDPOINT}?${router.asPath.split('?')[1]}`
  const clientId = getQuery('client_id')
  const state = getQuery('state')
  const requestScopes = getQuery('scope')
  const redirectUri = getQuery('redirect_uri')

  const { data, loading } = useQuery<OAuthClientInfoQuery>(OAUTH_CLIENT_INFO, {
    variables: { id: clientId },
  })

  if (!clientId) {
    return <Throw404 />
  }

  if (loading) {
    return (
      <Box>
        <SpinnerBlock />
      </Box>
    )
  }

  if (!data?.oauthClient?.id) {
    return <Throw404 />
  }

  const { avatar, website, name, scope: clientScopes } = data.oauthClient
  const validScopes = requestScopes
    ? requestScopes.split(/[,\s]/).filter((s) => !!s)
    : clientScopes

  const isNoLiker = name === 'LikeCoin' && !viewer.liker.likerId

  return (
    <Box
      avatar={avatar}
      title={
        <>
          <a
            className="u-link-green"
            href={website || undefined}
            target="_blank"
            rel="noreferrer"
          >
            {name}
          </a>
          <Translate
            zh_hant=" 正在申請訪問你的 Matters 帳戶數據："
            zh_hans=" 正在申请访问你的 Matters 帐户数据："
            en=" has requested permission to access your Matters account:"
          />
        </>
      }
      titleAlign="left"
    >
      <form action={actionUrl} method="post">
        <input type="hidden" name="client_id" value={clientId} />
        {state && <input type="hidden" name="state" value={state} />}
        {requestScopes && (
          <input type="hidden" name="scope" value={requestScopes} />
        )}
        {redirectUri && (
          <input type="hidden" name="redirect_uri" value={redirectUri} />
        )}
        <input type="hidden" name="response_type" value="code" />

        <section className={styles.content}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Translate
                zh_hant="讀取你的公開資料"
                zh_hans="读取你的公开资料"
                en="view your public profile"
              />
            </li>
            {validScopes &&
              validScopes.map((s) => {
                const readableScope = toReadableScope({
                  scope: s,
                  lang,
                })

                if (!readableScope) {
                  return null
                }

                return (
                  <li key={s} className={styles.listItem}>
                    {readableScope}
                  </li>
                )
              })}
          </ul>

          <hr />

          <section className={styles.currentAccount}>
            <UserDigest.Mini
              user={viewer}
              avatarSize={16}
              hasUserName
              hasAvatar
              hasDisplayName
            />
          </section>

          <p className={styles.switchAccount}>
            <span>
              <Translate zh_hant="不是你？" zh_hans="不是你？" en="Not you?" />
            </span>

            <Link {...appendTarget(PATHS.LOGIN, true)} className="u-link-green">
              <Translate
                zh_hant="切換帳戶"
                zh_hans="切换帐户"
                en="switch account"
              />
            </Link>
          </p>
        </section>

        <Dialog.Footer
          btns={
            <Dialog.RoundedButton
              text={
                isNoLiker ? (
                  <Translate
                    zh_hant="請先設置 Liker ID"
                    zh_hans="请先设置 Liker ID"
                    en="Please setup Liker ID first"
                  />
                ) : (
                  <FormattedMessage defaultMessage="Agree" id="ISly67" />
                )
              }
              href={isNoLiker ? PATHS.ME_SETTINGS_MISC : undefined}
              type={isNoLiker ? 'button' : 'submit'}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                isNoLiker ? (
                  <Translate
                    zh_hant="請先設置 Liker ID"
                    zh_hans="请先设置 Liker ID"
                    en="Please setup Liker ID first"
                  />
                ) : (
                  <FormattedMessage defaultMessage="Agree" id="ISly67" />
                )
              }
              href={isNoLiker ? PATHS.ME_SETTINGS_MISC : undefined}
              type={isNoLiker ? 'button' : 'submit'}
            />
          }
        />
      </form>
    </Box>
  )
}

const OAuthAuthorize = () => (
  <Layout.Main>
    <Layout.Header
      left={
        <Layout.Header.Title>
          <FormattedMessage defaultMessage="OAuth authorize" id="Mgl1bT" />
        </Layout.Header.Title>
      }
    />

    <Layout.Main.Spacing>
      <BaseOAuthAuthorize />
    </Layout.Main.Spacing>
  </Layout.Main>
)

export default OAuthAuthorize
