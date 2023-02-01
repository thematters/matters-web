import { ApolloProvider } from '@apollo/react-hooks'
import { getDataFromTree } from '@apollo/react-ssr'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { NextPageContext } from 'next'
import { AppProps } from 'next/app'
import { useContext, useMemo } from 'react'
import { IntlProvider } from 'react-intl'

import English from "~/common/content/compiled-locales/en.json"
import ZhHant from "~/common/content/compiled-locales/zh-Hant.json"
import withApollo from '~/common/utils/withApollo'
import { ErrorBoundary, LanguageContext } from '~/components'
import { ClientUpdater } from '~/components/ClientUpdater'
import { GlobalStyles } from '~/components/GlobalStyles'
import Root from '~/components/Root'

const InnerApp = ({
  Component,
  pageProps,
  apollo,
  headers,
}: AppProps & {
  apollo: ApolloClient<InMemoryCache>
  headers?: any
}) => {
  const { lang } = useContext(LanguageContext)
  const messages = useMemo(() => {
    switch (lang) {
      case "zh_hant":
        return ZhHant;
      case "en":
        return English;
      default:
        return English;
    }
  }, [lang]);

  return (
    <ErrorBoundary>
      <ApolloProvider client={apollo}>
        <GlobalStyles />
        <IntlProvider locale={lang} messages={messages}>
          <Root client={apollo} headers={headers}>
            <Component {...pageProps} />
            <ClientUpdater />
          </Root>  </IntlProvider >
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
