import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'
import { TEST_ID } from '~/common/enums'
import { numAbbr } from '~/common/utils'
import {
  Avatar,
  Button,
  Cover,
  Expandable,
  FollowUserButton,
  Media,
  Throw404,
  Translate,
  // Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

import UserTabs from '../UserTabs'
import {
  ArchitectBadge,
  CivicLikerBadge,
  GoldenMotorBadge,
  SeedBadge,
  TraveloggersBadge,
} from './Badges'
import { BadgesDialog } from './BadgesDialog'
import CircleWidget from './CircleWidget'
import DropdownActions from './DropdownActions'
import { EditProfileDialog } from './DropdownActions/EditProfileDialog'
import { FollowersDialog } from './FollowersDialog'
import { FollowingDialog } from './FollowingDialog'
import { USER_PROFILE_PRIVATE, USER_PROFILE_PUBLIC } from './gql'
import Inactive from './Inactive'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

const DynamicWalletLabel = dynamic(() => import('./WalletLabel'), {
  ssr: false,
})

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
  if (loading) {
    return (
      <>
        <Placeholder />
        <UserTabs loading />
      </>
    )
  }

  if (!user) {
    return <Throw404 />
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

  const Badges = ({ isInDialog }: { isInDialog?: boolean }) => (
    <span className={isInDialog ? styles.badgesInDialog : styles.badgesInPage}>
      {hasTraveloggersBadge && <TraveloggersBadge isInDialog={isInDialog} />}
      {hasSeedBadge && <SeedBadge isInDialog={isInDialog} />}
      {hasGoldenMotorBadge && <GoldenMotorBadge isInDialog={isInDialog} />}
      {hasArchitectBadge && <ArchitectBadge isInDialog={isInDialog} />}
      {isCivicLiker && <CivicLikerBadge isInDialog={isInDialog} />}
    </span>
  )

  /**
   * Inactive User
   */
  const isUserArchived = userState === 'archived'
  if (isUserArchived) {
    return <Inactive />
  }

  /**
   * Active or Onboarding User
   */
  const avatar = (
    <section className={styles.avatar}>
      <Avatar size="xxxlm" user={user} inProfile />
    </section>
  )

  return (
    <>
      <section
        className={styles.userProfile}
        data-test-id={TEST_ID.USER_PROFILE}
      >
        <Cover cover={profileCover} fallbackCover={IMAGE_COVER.src} />

        <Media lessThan="lg">
          <header className={styles.header}>
            {isMe && (
              <EditProfileDialog user={user}>
                {({ openDialog: openEditProfileDialog }) => (
                  <section onClick={openEditProfileDialog}>{avatar}</section>
                )}
              </EditProfileDialog>
            )}

            {!isMe && avatar}

            <section className={styles.right}>
              {isMe && (
                <EditProfileDialog user={user}>
                  {({ openDialog: openEditProfileDialog }) => (
                    <Button
                      borderColor="greyDarker"
                      borderActiveColor="greenDark"
                      borderWidth="md"
                      textColor="greyDarker"
                      textActiveColor="greenDark"
                      onClick={openEditProfileDialog}
                      size={['5.3125rem', '2rem']}
                    >
                      <Translate id="edit" />
                    </Button>
                  )}
                </EditProfileDialog>
              )}

              {!isMe && <FollowUserButton user={user} size="lg" />}

              <DropdownActions user={user} isMe={isMe} />
            </section>
          </header>

          <section className={styles.info}>
            <section className={styles.displayName}>
              <h1
                className={styles.name}
                data-test-id={TEST_ID.USER_PROFILE_DISPLAY_NAME}
              >
                {user.displayName}
              </h1>
              <BadgesDialog content={<Badges isInDialog />}>
                {({ openDialog }) => {
                  return (
                    <span className={styles.badges} onClick={openDialog}>
                      <Badges />
                    </span>
                  )
                }}
              </BadgesDialog>

              {user?.info.ethAddress && (
                <DynamicWalletLabel user={user} isMe={isMe} />
              )}
            </section>

            <section className={styles.username}>
              <span
                className={styles.name}
                data-test-id={TEST_ID.USER_PROFILE_USER_NAME}
              >
                @{user.userName}
              </span>
            </section>
          </section>

          <section className={styles.follow}>
            <FollowersDialog user={user}>
              {({ openDialog: openFollowersDialog }) => (
                <button type="button" onClick={openFollowersDialog}>
                  <span
                    className={styles.count}
                    data-test-id={TEST_ID.USER_PROFILE_FOLLOWERS_COUNT}
                  >
                    {numAbbr(user.followers.totalCount)}
                  </span>
                  &nbsp;
                  <FormattedMessage defaultMessage="Followers" />
                </button>
              )}
            </FollowersDialog>

            <FollowingDialog user={user}>
              {({ openDialog: openFollowingDialog }) => (
                <button type="button" onClick={openFollowingDialog}>
                  <span className={styles.count}>
                    {numAbbr(user.following.users.totalCount)}
                  </span>
                  &nbsp;
                  <FormattedMessage
                    defaultMessage="Following"
                    description="src/components/UserProfile/index.tsx"
                  />
                </button>
              )}
            </FollowingDialog>
          </section>

          <section className={styles.footer}>
            <Expandable
              content={user.info.description}
              color="grey"
              size="sm"
              spacingTop="tight"
              collapseable={false}
            >
              <p
                className={styles.description}
                data-test-id={TEST_ID.USER_PROFILE_BIO}
              >
                {user.info.description}
              </p>
            </Expandable>

            <CircleWidget
              circles={circles}
              isMe={isMe}
              hasDescription={false}
              hasFooter={false}
            />
          </section>
        </Media>
      </section>

      <UserTabs user={user} />
    </>
  )
}

export default UserProfile
