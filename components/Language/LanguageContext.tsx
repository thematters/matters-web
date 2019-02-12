import React, { ReactNode, useEffect, useState } from 'react'

const defaultLang = 'zh_hant'

// set a default for ts typing
const LanguageContext = React.createContext({
  lang: defaultLang,
  /* tslint:disable */
  setLang: (lang: string) => {}
})

export const LanguageConsumer = LanguageContext.Consumer

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState(defaultLang)

  useEffect(() => {
    // retrive from local store
    // if (
    //   !(typeof localStorage === 'undefined') &&
    //   localStorage.getItem('profile')
    // ) {
    //   const profile = JSON.parse(localStorage.getItem('profile'))
    //   const langLocal = profile && profile.settings && profile.settings.language
    //   if (langLocal) {
    //     setLang(langLocal)
    //   }
    // }
  })

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
