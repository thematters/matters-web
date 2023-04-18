import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import { TEST_ID } from '~/common/enums'
import { numAbbr } from '~/common/utils'
import {
  Avatar,
  Button,
  Cover,
  Error,
  Expandable,
  FollowUserButton,
  IconRss32,
  Layout,
  RssFeedDialog,
  Spinner,
  Throw404,
  // Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import ShareButton from '~/components/Layout/Header/ShareButton'
import {
  AuthorRssFeedFragment,
  UserProfileUserPublicQuery,
} from '~/gql/graphql'

import {
  ArchitectBadge,
  CivicLikerBadge,
  GoldenMotorBadge,
  SeedBadge,
  TraveloggersBadge,
} from './Badges'
import CircleWidget from './CircleWidget'
import DropdownActions from './DropdownActions'
import { FollowersDialog } from './FollowersDialog'
import { FollowingDialog } from './FollowingDialog'
import { USER_PROFILE_PRIVATE, USER_PROFILE_PUBLIC } from './gql'
import styles from './styles.css'
import TraveloggersAvatar from './TraveloggersAvatar'

interface FingerprintButtonProps {
  user: AuthorRssFeedFragment
}

const DynamicWalletLabel = dynamic(() => import('./WalletLabel'), {
  ssr: false,
})

const RssFeedButton = ({ user }: FingerprintButtonProps) => {
  const intl = useIntl()
  return (
    <RssFeedDialog user={user}>
      {({ openDialog }) => (
        <Button
          onClick={openDialog}
          spacing={['xxtight', 'xtight']}
          aria-label={intl.formatMessage({
            defaultMessage: 'Content Feed',
            description: 'src/components/UserProfile/index.tsx',
          })}
          aria-haspopup="dialog"
        >
          <IconRss32 color="green" size="lg" />
        </Button>
      )}
    </RssFeedDialog>
  )
}

export const UserProfile = () => {
  const { getQuery } = useRoute()
  const viewer = useContext(ViewerContext)

  // public user data
  const userName = getQuery('name')
  const isMe = !userName || viewer.userName === userName
  const { data, loading, client } = usePublicQuery<UserProfileUserPublicQuery>(
    USER_PROFILE_PUBLIC,
    {
      variables: { userName },
    }
  )
  const user = data?.user

  // fetch private data
  useEffect(() => {
    if (!viewer.isAuthed || !user) {
      return
    }

    client.query({
      query: USER_PROFILE_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { userName },
    })
  }, [user?.id, viewer.id])

  /**
   * Render
   */
  const LayoutHeader = () => (
    <Layout.Header
      right={
        <>
          <span />
          {user && (
            <section className="buttons">
              <ShareButton
                tags={
                  [user.displayName, user.userName].filter(Boolean) as string[]
                }
              />
              <DropdownActions user={user} isMe={isMe} />
              <style jsx>{styles}</style>
            </section>
          )}
        </>
      }
      rightSpace
      mode="transparent-absolute"
    />
  )

  if (loading) {
    return (
      <>
        <LayoutHeader />
        <Spinner />
      </>
    )
  }

  if (!user) {
    return (
      <>
        <LayoutHeader />
        <Throw404 />
      </>
    )
  }

  if (user?.status?.state === 'archived') {
    return (
      <>
        <LayoutHeader />
        <Error
          statusCode={404}
          message={
            <FormattedMessage
              defaultMessage="This account is archived due to violation of community guidelines"
              description="src/components/UserProfile/index.tsx"
            />
          }
        />
      </>
    )
  }

  const badges = user.info.badges || []
  const circles = user.ownCircles || []
  const hasSeedBadge = badges.some((b) => b.type === 'seed')
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const hasGoldenMotorBadge = badges.some((b) => b.type === 'golden_motor')
  const hasTraveloggersBadge = !!user.info.cryptoWallet?.hasNFTs

  const profileCover = user.info.profileCover || ''
  const userState = user.status?.state as string
  const isCivicLiker = user.liker.civicLiker
  const isUserArchived = userState === 'archived'
  const isUserBanned = userState === 'banned'
  const isUserInactive = isUserArchived || isUserBanned

  /**
   * Inactive User
   */
  if (isUserInactive) {
    return (
      <>
        <LayoutHeader />
        <section className="user-profile">
          <Cover fallbackCover={IMAGE_COVER.src} />

          <header>
            <section className="avatar">
              <Avatar size="xxxl" />
            </section>
          </header>

          <section className="info">
            <section className="display-name">
              <h1 className="name">
                {isUserArchived && (
                  <FormattedMessage
                    defaultMessage="Account Archived"
                    description="src/components/UserProfile/index.tsx"
                  />
                )}
                {isUserBanned && (
                  <FormattedMessage
                    defaultMessage="Account Banned"
                    description="src/components/UserProfile/index.tsx"
                  />
                )}
              </h1>
            </section>
          </section>

          <style jsx>{styles}</style>
        </section>
      </>
    )
  }

  /**
   * Active or Onboarding User
   */
  return (
    <>
      <LayoutHeader />

      <section className="user-profile" data-test-id={TEST_ID.USER_PROFILE}>
        <Cover cover={profileCover} fallbackCover={IMAGE_COVER.src} />

        <header>
          <section className="avatar">
            {hasTraveloggersBadge ? (
              <TraveloggersAvatar user={user} isMe={isMe} />
            ) : (
              <Avatar size="xxxl" user={user} inProfile />
            )}
          </section>

          <section className="right">
            {!isMe && <FollowUserButton user={user} size="lg" />}

            {user?.articles.totalCount > 0 && user?.info.ipnsKey && (
              <RssFeedButton user={user} />
            )}
          </section>
        </header>

        <section className="info">
          <section className="display-name">
            <h1
              className="name"
              data-test-id={TEST_ID.USER_PROFILE_DISPLAY_NAME}
            >
              {user.displayName}
            </h1>
            {hasTraveloggersBadge && <TraveloggersBadge />}
            {hasSeedBadge && <SeedBadge />}
            {hasGoldenMotorBadge && <GoldenMotorBadge />}
            {hasArchitectBadge && <ArchitectBadge />}
            {isCivicLiker && <CivicLikerBadge />}
          </section>

          <section className="username">
            <span
              className="name"
              data-test-id={TEST_ID.USER_PROFILE_USER_NAME}
            >
              @{user.userName}
            </span>
            {!isMe && <FollowUserButton.State user={user} />}
          </section>

          {user?.info.ethAddress && (
            <DynamicWalletLabel user={user} isMe={isMe} />
          )}

          <Expandable
            content={user.info.description}
            color="grey-darker"
            size="md"
            spacingTop="base"
          >
            <p className="description" data-test-id={TEST_ID.USER_PROFILE_BIO}>
              {user.info.description}
            </p>
          </Expandable>
        </section>

        <footer>
          <FollowersDialog user={user}>
            {({ openDialog: openFollowersDialog }) => (
              <button type="button" onClick={openFollowersDialog}>
                <span
                  className="count"
                  data-test-id={TEST_ID.USER_PROFILE_FOLLOWERS_COUNT}
                >
                  {numAbbr(user.followers.totalCount)}
                </span>
                <FormattedMessage defaultMessage="Followers" description="" />
              </button>
            )}
          </FollowersDialog>

          <FollowingDialog user={user}>
            {({ openDialog: openFollowingDialog }) => (
              <button type="button" onClick={openFollowingDialog}>
                <span className="count">
                  {numAbbr(user.following.users.totalCount)}
                </span>
                <FormattedMessage
                  defaultMessage="Following"
                  description="src/components/UserProfile/index.tsx"
                />
              </button>
            )}
          </FollowingDialog>
        </footer>

        <CircleWidget circles={circles} isMe={isMe} />

        <style jsx>{styles}</style>
      </section>
    </>
  )
}

export default UserProfile
