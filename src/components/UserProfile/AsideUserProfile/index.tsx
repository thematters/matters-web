import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { numAbbr } from '~/common/utils'
import {
  Avatar,
  Button,
  Expandable,
  FollowUserButton,
  Spinner,
  Throw404,
  // Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

import {
  ArchitectBadge,
  CivicLikerBadge,
  GoldenMotorBadge,
  SeedBadge,
  TraveloggersBadge,
} from '../Badges'
import CircleWidget from '../CircleWidget'
import DropdownActions from '../DropdownActions'
import { EditProfileDialog } from '../DropdownActions/EditProfileDialog'
import { FollowersDialog } from '../FollowersDialog'
import { FollowingDialog } from '../FollowingDialog'
import { USER_PROFILE_PRIVATE, USER_PROFILE_PUBLIC } from '../gql'
import TraveloggersAvatar from '../TraveloggersAvatar'
import styles from './styles.module.css'

const DynamicWalletLabel = dynamic(() => import('../WalletLabel'), {
  ssr: false,
})

export const AsideUserProfile = () => {
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
        <Spinner />
      </>
    )
  }

  if (!user) {
    return (
      <>
        <Throw404 />
      </>
    )
  }

  const badges = user.info.badges || []
  const circles = user.ownCircles || []
  const hasSeedBadge = badges.some((b) => b.type === 'seed')
  const hasArchitectBadge = badges.some((b) => b.type === 'architect')
  const hasGoldenMotorBadge = badges.some((b) => b.type === 'golden_motor')
  const hasTraveloggersBadge = !!user.info.cryptoWallet?.hasNFTs

  const userState = user.status?.state as string
  const isCivicLiker = user.liker.civicLiker
  const isUserArchived = userState === 'archived'
  const isUserInactive = isUserArchived

  /**
   * Inactive User
   */
  if (isUserInactive) {
    return (
      <>
        <section className={styles.userProfile}>
          <header className={styles.header}>
            <section className={styles.avatar}>
              <Avatar size="xxxxl" />
            </section>
          </header>

          <section className={styles.info}>
            <section className={styles.displayName}>
              <h1 className={styles.name}>
                {isUserArchived && (
                  <FormattedMessage
                    defaultMessage="Account Archived"
                    description="src/components/UserProfile/index.tsx"
                  />
                )}
              </h1>
            </section>
          </section>
        </section>
      </>
    )
  }

  /**
   * Active or Onboarding User
   */
  return (
    <>
      <section
        className={styles.userProfile}
        data-test-id={TEST_ID.USER_PROFILE}
      >
        <header className={styles.header}>
          {isMe && (
            <EditProfileDialog user={user}>
              {({ openDialog: openEditProfileDialog }) => (
                <section
                  className={styles.avatar + ' ' + styles.clickable}
                  onClick={openEditProfileDialog}
                >
                  {hasTraveloggersBadge ? (
                    <TraveloggersAvatar user={user} isMe={isMe} />
                  ) : (
                    <Avatar size="xxxxl" user={user} inProfile />
                  )}
                </section>
              )}
            </EditProfileDialog>
          )}
          {!isMe && (
            <section className={styles.avatar}>
              {hasTraveloggersBadge ? (
                <TraveloggersAvatar user={user} isMe={isMe} />
              ) : (
                <Avatar size="xxxxl" user={user} inProfile />
              )}
            </section>
          )}
        </header>

        <section className={styles.info}>
          <section className={styles.displayName}>
            <h1
              className={styles.name}
              data-test-id={TEST_ID.USER_PROFILE_DISPLAY_NAME}
            >
              {user.displayName}
            </h1>
          </section>

          <section className={styles.username}>
            <span
              className={styles.name}
              data-test-id={TEST_ID.USER_PROFILE_USER_NAME}
            >
              @{user.userName}
            </span>
          </section>

          <section className={styles.badges}>
            {hasTraveloggersBadge && <TraveloggersBadge hasTooltip />}
            {hasSeedBadge && <SeedBadge hasTooltip />}
            {hasGoldenMotorBadge && <GoldenMotorBadge hasTooltip />}
            {hasArchitectBadge && <ArchitectBadge hasTooltip />}
            {isCivicLiker && <CivicLikerBadge hasTooltip />}

            {user?.info.ethAddress && (
              <DynamicWalletLabel user={user} isMe={isMe} hasTooltip />
            )}
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
                  <FormattedMessage defaultMessage="Followers" description="" />
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

          <Expandable
            content={user.info.description}
            color="greyDarker"
            size="md"
            spacingTop="base"
          >
            <p
              className={styles.description}
              data-test-id={TEST_ID.USER_PROFILE_BIO}
            >
              {user.info.description}
            </p>
          </Expandable>

          <section className={styles.buttons}>
            {isMe && (
              <EditProfileDialog user={user}>
                {({ openDialog: openEditProfileDialog }) => (
                  <Button
                    textColor="greyDarker"
                    textActiveColor="green"
                    onClick={openEditProfileDialog}
                  >
                    <FormattedMessage
                      defaultMessage="Edit profile"
                      description="src/components/UserProfile/AsideUserProfile/index.tsx"
                    />
                  </Button>
                )}
              </EditProfileDialog>
            )}

            {!isMe && <FollowUserButton user={user} size="xl" />}

            <DropdownActions user={user} isMe={isMe} isInAside />
          </section>
        </section>

        <footer className={styles.footer}>
          <CircleWidget circles={circles} isMe={isMe} />
        </footer>
      </section>
    </>
  )
}

export default AsideUserProfile
