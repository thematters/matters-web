import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Head, Layout, useRoute } from '~/components'

import Feed, { FeedType } from './Feed'
import styles from './styles.module.css'

const BaseTags = () => {
  const { getQuery } = useRoute()
  const qsType = getQuery('type') as FeedType

  const [feed] = useState<FeedType>(qsType || 'recommended')

  return (
    <section className={styles.tags}>
      <Feed type={feed} />
    </section>
  )
}

const Tags = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Head
        title={intl.formatMessage({
          defaultMessage: 'Topics',
          id: 'kc79d3',
        })}
      />

      <Layout.Header
        right={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Topics" id="kc79d3" />
          </Layout.Header.Title>
        }
      />

      <BaseTags />
    </Layout.Main>
  )
}

export default Tags
