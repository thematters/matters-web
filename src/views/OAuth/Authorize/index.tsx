import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
// import queryString from 'query-string'
import { useContext } from 'react'

import {
  Dialog,
  LanguageContext,
  Layout,
  Spinner,
  Throw404,
  Translate,
  UserDigest,
  useRoute,
  ViewerContext,
} from '~/components'

import { PATHS } from '~/common/enums'
import { appendTarget, toReadableScope } from '~/common/utils'

import { Box } from '../Box'
import styles from './styles.css'

import { OAuthClientInfo } from './__generated__/OAuthClientInfo'

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
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const actionUrl = `${OAUTH_AUTHORIZE_ENDPOINT}${window.location.search}`
  const clientId = getQuery('client_id')
  const state = getQuery('state')
  const requestScopes = getQuery('scope')
  const redirectUri = getQuery('redirect_uri')

  const { data, loading } = useQuery<OAuthClientInfo>(OAUTH_CLIENT_INFO, {
    variables: { id: clientId },
  })

  if (!clientId) {
    return <Throw404 />
  }

  if (loading) {
    return (
      <Box>
        <Spinner />
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

  return (
    <Box
      avatar={avatar}
      title={
        <>
          <a
            className="u-link-green"
            href={website || undefined}
            target="_blank"
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

        <section className="content">
          <ul>
            <li>
              <Translate
                zh_hant="讀取你的公開資料"
                zh_hans="读取你的公开资料"
                en="view your public profile"
              />
            </li>
            {validScopes &&
              validScopes.map((s: any) => {
                const readableScope = toReadableScope({
                  scope: s,
                  lang,
                })

                if (!readableScope) {
                  return null
                }

                return <li key={s}>{readableScope}</li>
              })}
          </ul>

          <hr />

          <section className="current-account">
            <UserDigest.Mini
              user={viewer}
              avatarSize="xs"
              hasUserName
              hasAvatar
              hasDisplayName
            />
          </section>

          <p className="switch-account">
            <span>
              <Translate zh_hant="不是你？" zh_hans="不是你？" en="Not you?" />
            </span>

            <Link {...appendTarget(PATHS.LOGIN, true)}>
              <a className="u-link-green">
                <Translate
                  zh_hant="切換帳戶"
                  zh_hans="切换帐户"
                  en="switch account"
                />
              </a>
            </Link>
          </p>
        </section>

        <Dialog.Footer>
          {name === 'LikeCoin' && !viewer.liker.likerId ? (
            <Dialog.Footer.Button href={PATHS.ME_SETTINGS}>
              <Translate
                zh_hant="請先設置 Liker ID"
                zh_hans="请先设置 Liker ID"
                en="Please setup Liker ID first"
              />
            </Dialog.Footer.Button>
          ) : (
            <Dialog.Footer.Button type="submit">
              <Translate id="agree" />
            </Dialog.Footer.Button>
          )}
        </Dialog.Footer>
      </form>

      <style jsx>{styles}</style>
    </Box>
  )
}

const OAuthAuthorize = () => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.Title id="oauthAuthorize" />} />

    <Layout.Spacing>
      <BaseOAuthAuthorize />
    </Layout.Spacing>
  </Layout.Main>
)

export default OAuthAuthorize
