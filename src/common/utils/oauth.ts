import _get from 'lodash/get'

import {
  CALLBACK_PROVIDERS,
  OAUTH_SCOPE_TREE,
  OAUTH_SESSSION_STORAGE_OAUTH_TOKEN,
  OAUTH_SESSSION_STORAGE_OAUTH_TYPE,
  OAUTH_TYPE,
  PATHS,
  REFERRAL_QUERY_REFERRAL_KEY,
} from '~/common/enums'

export const toReadableScope = ({
  scope,
  lang,
}: {
  scope: string
  lang: Language
}): string => {
  const scopes = scope.split(':')

  const scopeTexts = scopes
    .map((_, index) => {
      const normalizedScope = scopes.slice(0, index + 1).join('.')
      return _get(OAUTH_SCOPE_TREE, `${normalizedScope}._t.${lang}`)
    })
    .filter((t) => !!t)
  const text = scopeTexts.slice(-1)

  if (!text) {
    return scope
  }

  let prefix = ''
  if (scope.indexOf('query') >= 0) {
    prefix = {
      zh_hant: '讀取你的',
      zh_hans: '读取你的',
      en: 'Read your',
    }[lang]
  }

  return prefix + text
}

import {
  OAUTH_STORAGE_CODE_VERIFIER,
  OAUTH_STORAGE_NONCE,
  OAUTH_STORAGE_PATH,
  OAUTH_STORAGE_STATE,
} from '~/common/enums'
import {
  generateChallenge,
  randomString,
  sessionStorage as _sessionStorage,
  storage,
} from '~/common/utils'

export type OauthType = 'login' | 'bind'

export const generateSocialOauthParams = async (type: OauthType) => {
  const state = OAUTH_TYPE[type] + randomString(8)
  const nonce = randomString(8)
  const codeVerifier = crypto.randomUUID() + crypto.randomUUID()
  const codeChallenge = await generateChallenge(codeVerifier)
  storage.set(OAUTH_STORAGE_STATE, state)
  storage.set(OAUTH_STORAGE_NONCE, nonce)
  storage.set(OAUTH_STORAGE_PATH, window.location.href)
  storage.set(OAUTH_STORAGE_CODE_VERIFIER, codeVerifier)
  return { state, nonce, codeChallenge }
}

export const googleOauthUrl = async (type: OauthType) => {
  const { state, nonce } = await generateSocialOauthParams(type)
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const redirectUri = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/callback/${CALLBACK_PROVIDERS.Google}`
  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid%20email&redirect_uri=${redirectUri}&state=${state}&nonce=${nonce}&prompt=select_account`
  return url
}

export const twitterOauthUrl = async (type: OauthType, oauthToken: string) => {
  await generateSocialOauthParams(type)
  _sessionStorage.set(OAUTH_SESSSION_STORAGE_OAUTH_TOKEN, oauthToken)
  _sessionStorage.set(
    OAUTH_SESSSION_STORAGE_OAUTH_TYPE,
    type === 'bind' ? OAUTH_TYPE.bind : OAUTH_TYPE.login
  )
  const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
  return url
}

export const signupCallbackUrl = (email: string, referralCode?: string) => {
  return `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/callback/${
    CALLBACK_PROVIDERS.EmailSignup
  }?${new URLSearchParams({
    email,
    ...(referralCode ? { [REFERRAL_QUERY_REFERRAL_KEY]: referralCode } : null),
  }).toString()}`
}

export const signinCallbackUrl = (email: string) => {
  return `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/callback/${
    CALLBACK_PROVIDERS.EmailSignin
  }?email=${encodeURIComponent(email)}`
}

export const emailVerifyCallbackUrl = (email: string) => {
  const redirectPath = `/callback/${CALLBACK_PROVIDERS.EmailVerification}`
  const host = `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`
  const redirectUrl = `${host}${redirectPath}?email=${encodeURIComponent(
    email
  )}&target=${encodeURIComponent(host)}${encodeURIComponent(PATHS.ME_SETTINGS)}`
  return redirectUrl
}
