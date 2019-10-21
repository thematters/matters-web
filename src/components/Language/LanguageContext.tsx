import gql from 'graphql-tag'
import _get from 'lodash/get'
import { createContext, useContext, useState } from 'react'
import { useMutation } from 'react-apollo'

import { ViewerContext } from '~/components/Viewer'

import { DEFAULT_LANG } from '~/common/enums'
import { langConvert } from '~/common/utils'

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

export const LanguageContext = createContext({} as {
  lang: Language
  setLang: (lang: Language) => void
})

export const LanguageConsumer = LanguageContext.Consumer

export const LanguageProvider = ({
  children,
  defaultLang = DEFAULT_LANG
}: {
  children: React.ReactNode
  defaultLang?: Language
}) => {
  const [updateLanguage] = useMutation<UpdateLanguage>(UPDATE_VIEWER_LANGUAGE)
  const viewer = useContext(ViewerContext)
  const viewerLanguage = viewer.settings.language
  const [lang, setLang] = useState<Language>(viewerLanguage || defaultLang)

  return (
    <LanguageContext.Provider
      value={{
        lang: viewerLanguage || lang,
        setLang: targetLang => {
          if (viewer.isAuthed) {
            try {
              updateLanguage({
                variables: { input: { language: targetLang } },
                optimisticResponse: {
                  updateUserInfo: {
                    id: viewer.id,
                    settings: {
                      language: targetLang as any,
                      __typename: 'UserSettings'
                    },
                    __typename: 'User'
                  }
                }
              })
            } catch (e) {
              //
            }
          }

          setLang(targetLang)

          if (process.browser) {
            document.documentElement.setAttribute(
              'lang',
              langConvert.sys2html(targetLang)
            )
          }
        }
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
