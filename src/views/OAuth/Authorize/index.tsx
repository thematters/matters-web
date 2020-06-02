import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useContext } from 'react'

import {
  Dialog,
  LanguageContext,
  Layout,
  Spinner,
  Throw404,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'

import { PATHS } from '~/common/enums'
import { appendTarget, getQuery, toReadableScope } from '~/common/utils'

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

const OAuthAuthorize = () => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const actionUrl = `${OAUTH_AUTHORIZE_ENDPOINT}?${queryString.stringify(
    router.query
  )}`
  const clientId = getQuery({ router, key: 'client_id' })
  const state = getQuery({ router, key: 'state' })
  const scope = getQuery({ router, key: 'scope' })
  const redirectUri = getQuery({ router, key: 'redirect_uri' })

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

  if (!data || !data.oauthClient || !data.oauthClient.id) {
    return <Throw404 />
  }

  const { avatar, website, name, scope: scopes } = data.oauthClient

  return (
    <Box
      avatar={avatar}
      title={
        <>
          <a className="u-link-green" href={website} target="_blank">
            {name}
          </a>
          <Translate
            zh_hant=" 正在申請訪問你的 Matters 帳戶數據："
            zh_hans=" 正在申请访问你的 Matters 帐户数据："
          />
        </>
      }
      titleAlign="left"
    >
      <form action={actionUrl} method="post">
        <input type="hidden" name="client_id" value={clientId} />
        {state && <input type="hidden" name="state" value={state} />}
        {scope && <input type="hidden" name="scope" value={scope} />}
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
              />
            </li>
            {scopes &&
              scopes.map((s: any) => {
                const readableScope = toReadableScope({
                  scope: s,
                  lang,
                })

                if (!readableScope) {
                  return null
                }

                return <li key={scope}>{readableScope}</li>
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
              <Translate zh_hant="不是你？" zh_hans="不是你？" />
            </span>
            {/* FIXME: only render at CSR to get correct `appendTarget` */}
            {process.browser && (
              <Link {...appendTarget(PATHS.LOGIN, true)}>
                <a className="u-link-green">
                  <Translate zh_hant="切換帳戶" zh_hans="切换帐户" />
                </a>
              </Link>
            )}
          </p>
        </section>

        <Dialog.Footer>
          {name === 'LikeCoin' && !viewer.liker.likerId ? (
            <Dialog.Footer.Button href={PATHS.ME_SETTINGS}>
              <Translate
                zh_hant="請先設置 Liker ID"
                zh_hans="请先设置 Liker ID"
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

export default () => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.Title id="oauthAuthorize" />} />

    <Layout.Spacing>
      <OAuthAuthorize />
    </Layout.Spacing>
  </Layout.Main>
)
