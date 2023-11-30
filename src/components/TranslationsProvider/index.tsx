import dynamic from 'next/dynamic'
import { useContext, useEffect, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'

import { loadTranslations, toLocale } from '~/common/utils'
import { LanguageContext } from '~/components'
import { UserLanguage } from '~/gql/graphql'

const DynamicTranslationsZhHantProvider = dynamic(() => import('./ZhHant'), {
  ssr: true,
})
const DynamicTranslationsZhHansProvider = dynamic(() => import('./ZhHans'), {
  ssr: true,
})
const DynamicTranslationsEnProvider = dynamic(() => import('./En'), {
  ssr: true,
})

const translationsProvider = {
  [UserLanguage.ZhHant]: DynamicTranslationsZhHantProvider,
  [UserLanguage.ZhHans]: DynamicTranslationsZhHansProvider,
  [UserLanguage.En]: DynamicTranslationsEnProvider,
}

export const TranslationsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { lang } = useContext(LanguageContext)
  const ssrLang = useMemo(() => lang, []) // cached lang for SSR

  const [messages, setMessages] = useState()
  const loadMessages = async () => {
    const msgs = await loadTranslations(lang)
    setMessages(msgs)
  }

  useEffect(() => {
    loadMessages()
  }, [lang])

  // [SSR] dynamic load compiled translations based on current language
  const TranslationsProvider = translationsProvider[ssrLang]

  return (
    <TranslationsProvider>
      {({ messages: ssrMessages }) => (
        <IntlProvider
          locale={toLocale(ssrLang)}
          messages={ssrLang != lang ? messages : ssrMessages}
          defaultRichTextElements={{
            b: (chunks) => <b>{chunks}</b>,
            br: () => <br />,
          }}
        >
          {children}
        </IntlProvider>
      )}
    </TranslationsProvider>
  )
}
