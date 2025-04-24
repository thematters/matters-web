import gql from 'graphql-tag'
import type { IncomingHttpHeaders } from 'http'
import { createContext, useContext, useEffect, useState } from 'react'

import { COOKIE_LANGUAGE } from '~/common/enums'
import {
  getCookie,
  getIsomorphicCookie,
  setCookies,
  toLocale,
  toUserLanguage,
} from '~/common/utils'
import { toast, useMutation, useRoute, ViewerContext } from '~/components'
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

export const LanguageProvider = ({
  headers,
  children,
}: {
  headers?: IncomingHttpHeaders
  children: React.ReactNode
}) => {
  const [updateLanguage] = useMutation<UpdateLanguageMutation>(
    UPDATE_VIEWER_LANGUAGE
  )

  // read from authed viewer object
  const viewer = useContext(ViewerContext)
  const viewerLang = viewer.isAuthed ? viewer.settings.language : ''

  // read from URL subpath
  const { routerLang } = useRoute()

  // read from cookie (both server-side and client-side)
  let cookieLang = getIsomorphicCookie(headers?.cookie || '', COOKIE_LANGUAGE)
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
    const acceptLanguage = ((headers && headers['accept-language']) || '')
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

  const setLang = async (language: UserLanguage) => {
    // update local cookie
    setCookies({ [COOKIE_LANGUAGE]: language })

    // update local cache
    setLocalLang(language)

    // update <html lang> attribute
    const html = document.querySelector('html')
    if (html) {
      html.setAttribute('lang', toLocale(language))
    }

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
      toast.error({
        // FIXME: cannot use <FormattedMessage> here cuz it's outer of <TranslationProvider>
        message:
          language === UserLanguage.En
            ? 'Failed to edit, please try again.'
            : language === UserLanguage.ZhHans
              ? '修改失败，请稍候重试'
              : '修改失敗，請稍候重試',
      })
    }
  }

  // FIXME: set <html data-lang> attribute
  // since we use `__defaultLocale` as the default locale to <html lang>
  useEffect(() => {
    document.documentElement.setAttribute('data-lang', toLocale(localLang))
  }, [localLang])

  return (
    <LanguageContext.Provider
      value={{
        lang: localLang,
        cookieLang,
        setLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
