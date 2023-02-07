import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'
import { IntlProvider } from 'react-intl'

import { ADD_TOAST, COOKIE_LANGUAGE, DEFAULT_LOCALE } from '~/common/enums'
import {
  getCookie,
  getIsomorphicCookie,
  setCookies,
  toUserLanguage,
} from '~/common/utils'
import { Translate, useMutation, ViewerContext } from '~/components'
import { UpdateLanguageMutation, UserLanguage } from '~/gql/graphql'

const UPDATE_VIEWER_LANGUAGE = gql`
  mutation UpdateLanguage($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      settings {
        language
      }
    }
  }
`

export const LanguageContext = createContext(
  {} as {
    lang: UserLanguage
    cookieLang: string
    setLang: (lang: UserLanguage) => Promise<void>
  }
)

export const LanguageConsumer = LanguageContext.Consumer

// TODO: extract it into utils
async function loadI18nMessages(locale: string) {
  try {
    return import(`@/compiled-lang/${locale}.json`).then(
      (module) => module.default
    )
  } catch (error) {
    throw new Error(
      'Could not load compiled language files. Please run "npm run i18n:compile" first"'
    )
  }
}

export const LanguageProvider = ({
  headers,
  children,
  messages: msgs,
}: {
  headers?: any
  children: React.ReactNode
  messages?: any
}) => {
  const [updateLanguage] = useMutation<UpdateLanguageMutation>(
    UPDATE_VIEWER_LANGUAGE
  )

  // read from authed viewer object
  const viewer = useContext(ViewerContext)
  const viewerLang = viewer.isAuthed ? viewer.settings.language : ''

  // read from URL subpath
  const router = useRouter()
  const routerLang =
    router.locale && router.locale !== DEFAULT_LOCALE
      ? toUserLanguage(router.locale)
      : ''

  // read from cookie (both server-side and client-side)
  let cookieLang = getIsomorphicCookie(headers?.cookie, COOKIE_LANGUAGE)
  if (typeof window !== 'undefined') {
    const cookieLanguage = getCookie(COOKIE_LANGUAGE)
    if (cookieLanguage) {
      cookieLang = cookieLanguage
    }
  }

  // fallback to browser preference (both server-side and client-side)
  let fallbackLang
  if (typeof window !== 'undefined') {
    fallbackLang = toUserLanguage(navigator.language)
  } else {
    const acceptLanguage = (headers['accept-language'] || '')
      .split(',')
      .map((l: string) => l.trim())[0]
    fallbackLang = toUserLanguage(acceptLanguage)
  }
  fallbackLang = fallbackLang || UserLanguage.ZhHans

  const initLocalLang = (viewerLang ||
    cookieLang ||
    routerLang ||
    fallbackLang) as UserLanguage
  const [localLang, setLocalLang] = useState(initLocalLang)
  const [messages, setMessages] = useState(
    (msgs || {})[localLang.replace('_', '-')] || {}
  )

  const setLang = async (language: UserLanguage) => {
    const msgs = await loadI18nMessages(language.replace('_', '-'))
    setMessages(msgs)
    // update local cookie
    setCookies({ [COOKIE_LANGUAGE]: language })
    // update local cache
    setLocalLang(language)
    // anonymous
    if (!viewer.isAuthed) {
      return
    }

    // logged-in user
    try {
      await updateLanguage({
        variables: { input: { language } },
        optimisticResponse: {
          updateUserInfo: {
            id: viewer.id,
            settings: {
              language,
              __typename: 'UserSettings',
            },
            __typename: 'User',
          },
        },
      })
    } catch (e) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="failureChange" />,
          },
        })
      )
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        lang: localLang,
        cookieLang,
        setLang,
      }}
    >
      <IntlProvider locale={localLang.replace('_', '-')} messages={messages}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}
