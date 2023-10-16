// https://testing-library.com/docs/react-testing-library/setup#custom-render
// https://formatjs.io/docs/guides/testing/#react-testing-library

import { ApolloProvider } from '@apollo/react-common'
import { render, RenderOptions } from '@testing-library/react'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import React, { ReactElement } from 'react'
import { IntlProvider } from 'react-intl'

import {
  FeaturesProvider,
  LanguageProvider,
  MediaContextProvider,
} from '~/components'

// src/components/Root/index.tsx
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  // src/common/utils/withApollo.ts
  const client = new ApolloClient({
    link: ApolloLink.empty(),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <LanguageProvider headers={undefined}>
        <FeaturesProvider official={undefined}>
          <MediaContextProvider>
            <IntlProvider locale="en" messages={undefined}>
              {children}
            </IntlProvider>
          </MediaContextProvider>
        </FeaturesProvider>
      </LanguageProvider>
    </ApolloProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: AllProviders,
    ...options,
  })

// re-export & override render method
export * from '@testing-library/react'
export { customRender as render }
