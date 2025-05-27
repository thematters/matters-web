import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconAnalyticsNoSupporter from '@/public/static/images/analytics-no-supporter.svg'
import { Head, Layout, List, QueryError, SpinnerBlock } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { MeAnalyticsQuery } from '~/gql/graphql'

import EmptyAnalytics from './EmptyAnalytics'
import SelectPeriod from './SelectPeriod'
import styles from './styles.module.css'
import SupporterDigestFeed from './SupporterDigestFeed/index'

const ME_ANALYTICS = gql`
  query MeAnalytics($after: String, $filter: TopDonatorFilter) {
    viewer {
      id
      articles(input: { first: 0, after: $after }) {
        totalCount
      }
      analytics {
        topDonators(input: { first: 10, after: $after, filter: $filter }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...UserDigestMiniUser
            }
            donationCount
          }
        }
      }
    }
  }
  ${UserDigest.Mini.fragments.user}
`
const MyAnalytics = () => {
  const intl = useIntl()
  const [period, setPeriod] = useState<number>(7)

  const [now] = useState(Date.now())

  const rangeStart =
    period === 0
      ? null
      : new Date(now - period * 24 * 60 * 60 * 1000).toISOString()
  const rangeEnd = rangeStart === null ? null : new Date(now).toISOString()

  const { data, loading, error } = useQuery<MeAnalyticsQuery>(ME_ANALYTICS, {
    variables: {
      filter: {
        inRangeStart: rangeStart,
        inRangeEnd: rangeEnd,
      },
    },
  })

  const Header = () => (
    <>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="Top Supporters" id="/IMR+8" />
          </Layout.Header.Title>
        }
        right={
          <>
            <span />
            <SelectPeriod period={period} onChange={setPeriod} />
          </>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'Analytics',
          id: 'GZJpDf',
        })}
      />
    </>
  )

  if (loading) {
    return (
      <Layout.Main>
        <Header />

        <SpinnerBlock />
      </Layout.Main>
    )
  }

  if (error) {
    return (
      <Layout.Main>
        <Header />

        <QueryError error={error} />
      </Layout.Main>
    )
  }

  const edges = data?.viewer?.analytics.topDonators.edges
  const articleCount = data?.viewer?.articles.totalCount || 0

  if (articleCount === 0) {
    return (
      <Layout.Main>
        <Header />

        <Layout.Main.Spacing>
          <EmptyAnalytics />
        </Layout.Main.Spacing>
      </Layout.Main>
    )
  }

  return (
    <Layout.Main>
      <Header />

      <Layout.Main.Spacing hasVertical={false}>
        {edges?.length === 0 && (
          <section className={styles.noSupporter}>
            <section className={styles.noSupporterImg}>
              <IconAnalyticsNoSupporter />
            </section>
            <p>
              <FormattedMessage defaultMessage="No data yet." id="eTpiYa" />
            </p>
          </section>
        )}

        <List>
          {edges?.map(({ node, cursor, donationCount }, i) => (
            <List.Item key={node.id}>
              <SupporterDigestFeed
                user={node}
                index={i}
                donationCount={donationCount}
              />
            </List.Item>
          ))}
        </List>
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default MyAnalytics
