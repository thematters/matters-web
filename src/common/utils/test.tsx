// https://testing-library.com/docs/react-testing-library/setup#custom-render
// https://formatjs.io/docs/guides/testing/#react-testing-library

import { ApolloClient, ApolloLink, ApolloProvider } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import React, { ReactElement, useContext } from 'react'
import { IntlProvider } from 'react-intl'
import { WagmiConfig } from 'wagmi'

import TRANSLATIONS_EN from '@/compiled-lang/en.json'
import TRANSLATIONS_ZH_HANS from '@/compiled-lang/zh-Hans.json'
import TRANSLATIONS_ZH_HANT from '@/compiled-lang/zh-Hant.json'
import { wagmiConfig } from '~/common/utils'
import {
  FeaturesProvider,
  LanguageContext,
  LanguageProvider,
  MediaContextProvider,
  Toaster,
  ViewerProvider,
} from '~/components'
import GlobalDialogs from '~/components/GlobalDialogs'
import { UserLanguage } from '~/gql/graphql'
import { MOCK_USER } from '~/stories/mocks'

import { toLocale } from './locale'

const TranslationsProvider = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useContext(LanguageContext)
  const translations = {
    [UserLanguage.ZhHant]: TRANSLATIONS_ZH_HANT,
    [UserLanguage.ZhHans]: TRANSLATIONS_ZH_HANS,
    [UserLanguage.En]: TRANSLATIONS_EN,
  }

  return (
    <IntlProvider locale={toLocale(lang)} messages={translations[lang]}>
      {children}
    </IntlProvider>
  )
}

// src/components/Root/index.tsx
const wrapper = ({ children }: { children: React.ReactNode }) => {
  // src/common/utils/withApollo.ts
  const client = new ApolloClient({
    link: ApolloLink.empty(),
    cache: new InMemoryCache(),
  })

  return (
    <MemoryRouterProvider>
      <ApolloProvider client={client}>
        <WagmiConfig config={wagmiConfig}>
          <ViewerProvider viewer={MOCK_USER}>
            <LanguageProvider headers={undefined}>
              <FeaturesProvider official={undefined}>
                <MediaContextProvider>
                  <TranslationsProvider>
                    {children}

                    <Toaster />
                    <GlobalDialogs />
                  </TranslationsProvider>
                </MediaContextProvider>
              </FeaturesProvider>
            </LanguageProvider>
          </ViewerProvider>
        </WagmiConfig>
      </ApolloProvider>
    </MemoryRouterProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper, ...options })

// re-export & override render method
export * from '@testing-library/react'
export { customRender as render, wrapper }
