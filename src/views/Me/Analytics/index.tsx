import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import {
  Card,
  Head,
  IconDonateBg24,
  Layout,
  List,
  QueryError,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'

import EmptyAnalytics from './EmptyAnalytics'
import SelectPeriod from './SelectPeriod'
import styles from './styles.css'
import SupporterDigestFeed from './SupporterDigestFeed/index'

import { MeAnalytics } from './__generated__/MeAnalytics'

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
              displayName
              avatar
              userName
            }
            donationCount
          }
        }
      }
    }
  }
`
const BaseAnalytics = () => {
  const { data, loading, error } = useQuery<MeAnalytics>(ME_ANALYTICS)
  const [period, setPeriod] = useState<number>(7)

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const edges = data?.viewer?.analytics.topDonators.edges
  const pageInfo = data?.viewer?.analytics.topDonators.pageInfo

  const articlerCount = data?.viewer?.articles.totalCount

  if (!edges || edges.length <= 0 || !pageInfo || articlerCount === 0) {
    return <EmptyAnalytics />
  }

  return (
    <section className="container">
      <Card spacing={['loose', 'base']} bgColor="white" borderRadius="base">
        <section className="title">
          <TextIcon
            icon={<IconDonateBg24 size="md" />}
            weight="md"
            color="black"
            size="md"
          >
            <Translate id="supporterRankingList" />
          </TextIcon>
          <section className="filter">
            <SelectPeriod period={period} onChange={setPeriod} />
          </section>
        </section>

        <List>
          {edges.map(({ node, cursor, donationCount }, i) => (
            <List.Item key={cursor}>
              <SupporterDigestFeed
                user={node}
                index={i}
                donationCount={donationCount}
              />
            </List.Item>
          ))}
        </List>
      </Card>
      <style jsx>{styles}</style>
    </section>
  )
}

const MyAnalytics = () => (
  <Layout.Main bgColor="grey-lighter">
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="myAnalytics" />}
    />
    <Head title={{ id: 'myAnalytics' }} />
    <BaseAnalytics />
  </Layout.Main>
)

export default MyAnalytics
