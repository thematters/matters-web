import { ApolloProvider } from '@apollo/react-hooks'
import { getDataFromTree } from '@apollo/react-ssr'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { NextPageContext } from 'next'
import { AppProps } from 'next/app'
import { useContext } from 'react'
import { IntlProvider } from 'react-intl'

import withApollo from '~/common/utils/withApollo'
import { ErrorBoundary, LanguageContext } from '~/components'
import { ClientUpdater } from '~/components/ClientUpdater'
import { GlobalStyles } from '~/components/GlobalStyles'
import Root from '~/components/Root'

import type { MessageConfig } from '../common/utils/loadIntlMessages'

const InnerApp = ({
  Component,
  pageProps,
  apollo,
  headers,
}: AppProps<{ intlMessages: MessageConfig }> & {
  apollo: ApolloClient<InMemoryCache>
  headers?: any
}) => {
  const { lang } = useContext(LanguageContext)

  return (
    <ErrorBoundary>
      <ApolloProvider client={apollo}>
        <GlobalStyles />
        <Root client={apollo} headers={headers}>
          <IntlProvider locale={lang} messages={pageProps.intlMessages}>
            <Component {...pageProps} />
          </IntlProvider>
          <ClientUpdater />
        </Root>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

InnerApp.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  if (!ctx) {
    return { headers: {} }
  }

  return { headers: ctx?.req?.headers }
}

const MattersApp = withApollo(InnerApp as any, { getDataFromTree })

export default MattersApp
