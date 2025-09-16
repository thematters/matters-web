import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  Announcements,
  Head,
  Layout,
  Media,
  Spacer,
  SpinnerBlock,
  useMutation,
  ViewerContext,
} from '~/components'
import { MeFollowQuery, ReadFollowingFeedMutation } from '~/gql/graphql'

import Feed from './Feed'
import styles from './styles.module.css'
import { TABS, Tabs } from './Tabs'
const READ_FOLLOWING = gql`
  mutation ReadFollowingFeed {
    logRecord(input: { type: ReadFollowingFeed })
  }
`

const ME_FOLLOW = gql`
  query MeFollow {
    viewer {
      id
      following {
        users(input: { first: 0 }) {
          totalCount
        }
      }
    }
  }
`

type BaseFollowProps = {
  tab: TABS
}

const BaseFollow = ({ tab }: BaseFollowProps) => {
  const viewer = useContext(ViewerContext)
  const [readFollowing] = useMutation<ReadFollowingFeedMutation>(
    READ_FOLLOWING,
    {
      update: (cache) => {
        cache.modify({
          id: cache.identify(viewer),
          fields: {
            status: (existingStatus) => ({
              ...existingStatus,
              unreadFollowing: false,
            }),
          },
        })
      },
    }
  )
  const { data, loading } = useQuery<MeFollowQuery>(ME_FOLLOW)

  useEffect(() => {
    if (viewer.isAuthed) {
      readFollowing()
    }
  }, [])

  if (loading) {
    return <SpinnerBlock />
  }

  if (!data) {
    return null
  }

  return <Feed tab={tab} />
}

const Follow = () => {
  const intl = useIntl()
  const [tab, setTab] = useState<TABS>('All')

  return (
    <Layout.Main
      aside={
        <>
          <Spacer size="sp44" />
          <Announcements />
        </>
      }
    >
      <Head
        title={intl.formatMessage({ defaultMessage: 'Follow', id: 'ieGrWo' })}
      />
      <Media lessThan="lg">
        <Spacer size="sp20" />
        <Announcements />
      </Media>
      <section className={styles.headers}>
        <section className={styles.title}>
          <FormattedMessage defaultMessage="Following" id="cPIKU2" />
        </section>
        <section className={styles.tabs}>
          <Tabs tab={tab} setTab={setTab} />
        </section>
      </section>
      <BaseFollow tab={tab} />
    </Layout.Main>
  )
}

export default Follow
