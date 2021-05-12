import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { createContext, useContext } from 'react'

import { Translate, useMutation, ViewerContext } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { ADD_TOAST, STORAGE_KEY_LANGUAGE } from '~/common/enums'
import { langConvert, storage } from '~/common/utils'

import { UserLanguage } from '@/__generated__/globalTypes'
import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
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
    setLang: (lang: UserLanguage) => void
  }
)

export const LanguageConsumer = LanguageContext.Consumer

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: clientPreferenceData, client } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE,
    { variables: { id: 'local' } }
  )

  const [updateLanguage] = useMutation<UpdateLanguage>(UPDATE_VIEWER_LANGUAGE)
  const viewer = useContext(ViewerContext)

  const viewerLang = viewer?.settings?.language
  let storedLang

  if (process.browser) {
    storedLang = storage.get(STORAGE_KEY_LANGUAGE)
  }

  const localLang =
    clientPreferenceData?.clientPreference?.language || storedLang
  let lang = (viewer.isAuthed && viewerLang) || localLang

  // fallback to browser preference
  if (process.browser && !lang && navigator?.language) {
    lang = langConvert.bcp472sys(navigator.language)
  }

  const setLang = (targetLang: UserLanguage) => {
    storage.set(STORAGE_KEY_LANGUAGE, targetLang)

    client.writeData({
      id: 'ClientPreference:local',
      data: {
        language: targetLang,
      },
    })

    document.documentElement.setAttribute(
      'lang',
      langConvert.sys2html(targetLang)
    )
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang: async (targetLang) => {
          if (viewer.isAuthed) {
            try {
              await updateLanguage({
                variables: { input: { language: targetLang } },
                optimisticResponse: {
                  updateUserInfo: {
                    id: viewer.id,
                    settings: {
                      language: targetLang as any,
                      __typename: 'UserSettings',
                    },
                    __typename: 'User',
                  },
                },
              })

              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'green',
                    content: (
                      <Translate
                        zh_hant="介面語言已修改"
                        zh_hans="界面语言已修改"
                        en="Language changed"
                      />
                    ),
                  },
                })
              )
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

          setLang(targetLang)
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
