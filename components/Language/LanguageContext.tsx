import React, { ReactNode, useEffect, useState } from 'react'

const systemDefaultLang = 'zh_hant'

const LanguageContext = React.createContext({} as {
  lang: Language
  setLang: (lang: Language) => void
})

export const LanguageConsumer = LanguageContext.Consumer

export const LanguageProvider = ({
  children,
  defaultLang = systemDefaultLang
}: {
  children: ReactNode
  defaultLang?: Language
}) => {
  const [lang, setLang] = useState<Language>(defaultLang)

  // useEffect(() => {
  //   // retrive from local store
  //   if (
  //     !(typeof localStorage === 'undefined') &&
  //     localStorage.getItem('profile')
  //   ) {
  //     const profile = JSON.parse(localStorage.getItem('profile'))
  //     const langLocal = profile && profile.settings && profile.settings.language
  //     if (langLocal) {
  //       setLang(langLocal)
  //     }
  //   }
  // })

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
