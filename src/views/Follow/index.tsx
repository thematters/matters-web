import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
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
    <Layout.Main>
      <Head
        title={intl.formatMessage({ defaultMessage: 'Follow', id: 'ieGrWo' })}
      />

      <Media at="sm">
        <Layout.Header
          left={
            <Layout.Header.Title>
              <FormattedMessage defaultMessage="Following" id="cPIKU2" />
            </Layout.Header.Title>
          }
        />
      </Media>
      <Media greaterThan="sm">
        <Spacer size="sp16" />
      </Media>

      <Layout.Main.Spacing hasVertical={false}>
        <Tabs tab={tab} setTab={setTab} />
        <Spacer size="sp8" />
        <BaseFollow tab={tab} />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Follow
