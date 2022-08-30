import gql from 'graphql-tag'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

import { Translate, useMutation, ViewerContext } from '~/components'

import { ADD_TOAST, COOKIE_LANGUAGE, DEFAULT_LOCALE } from '~/common/enums'
import { getCookie, toUserLanguage } from '~/common/utils'

import { UserLanguage } from '@/__generated__/globalTypes'
import { UpdateLanguage } from './__generated__/UpdateLanguage'

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
    setLang: (lang: UserLanguage) => Promise<void>
  }
)

export const LanguageConsumer = LanguageContext.Consumer

export const LanguageProvider = ({
  headers,
  children,
}: {
  headers?: any
  children: React.ReactNode
}) => {
  const [updateLanguage] = useMutation<UpdateLanguage>(UPDATE_VIEWER_LANGUAGE)

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
  let cookieLang = getCookie(headers?.cookie, COOKIE_LANGUAGE)
  if (typeof window !== 'undefined') {
    const cookieLanguage = Cookie.get(COOKIE_LANGUAGE)
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
  fallbackLang = fallbackLang || UserLanguage.zh_hant

  const initLocalLang = (viewerLang ||
    cookieLang ||
    routerLang ||
    fallbackLang) as UserLanguage
  const [localLang, setLocalLang] = useState(initLocalLang)

  const setLang = async (language: UserLanguage) => {
    setLocalLang(language)

    if (!viewer.isAuthed) {
      Cookie.set(COOKIE_LANGUAGE, language, {
        domain: window.location.hostname,
        expires: 90,
        secure: false,
        sameSite: 'Lax',
      })
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
        setLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
