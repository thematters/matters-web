import { ApolloProvider } from '@apollo/react-hooks'
import { getDataFromTree } from '@apollo/react-ssr'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { NextPageContext } from 'next'
import { AppProps } from 'next/app'

import withApollo from '~/common/utils/withApollo'
import { ErrorBoundary } from '~/components'
import { ClientUpdater } from '~/components/ClientUpdater'
import { GlobalStyles } from '~/components/GlobalStyles'
import Root from '~/components/Root'

const InnerApp = ({
  Component,
  pageProps,
  apollo,
  headers,
  messages,
}: AppProps & {
  apollo: ApolloClient<InMemoryCache>
  headers?: any
  messages?: any
}) => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={apollo}>
        <GlobalStyles />
        <Root client={apollo} headers={headers} messages={messages}>
          <Component {...pageProps} />
          <ClientUpdater />
        </Root>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

async function loadI18nMessages(locale: string) {
  try {
    return import(`@/compiled-lang/${locale}.json`).then(
      (module) => module.default
    )
  } catch (error) {
    throw new Error(
      'Could not load compiled language files. Please run "npm run i18n:compile" first"'
    )
  }
}

InnerApp.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  if (!ctx) {
    return { headers: {} }
  }
  const en = await loadI18nMessages('en')
  const zh_hans = await loadI18nMessages('zh-hans')
  const zh_hant = await loadI18nMessages('zh-hant')
  return {
    headers: ctx?.req?.headers,
    messages: {
      en,
      zh_hans,
      zh_hant,
    },
  }
}

const MattersApp = withApollo(InnerApp as any, { getDataFromTree })

export default MattersApp
