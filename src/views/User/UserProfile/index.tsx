import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_GRAND_BADGE_DIALOG,
  OPEN_NOMAD_BADGE_DIALOG,
  TEST_ID,
  URL_USER_PROFILE,
} from '~/common/enums'
import { numAbbr } from '~/common/utils'
import {
  Avatar,
  Button,
  Cover,
  EditProfileDialog,
  Expandable,
  FollowUserButton,
  Media,
  Throw404,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

import UserTabs from '../UserTabs'
import { Badges } from './Badges'
import { BadgesDialog } from './BadgesDialog'
import CircleWidget from './CircleWidget'
import DropdownActions from './DropdownActions'
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
    { variables: { userName } }
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

  useEffect(() => {
    const shouldOpenNomadBadgeDialog =
      getQuery(URL_USER_PROFILE.OPEN_NOMAD_BADGE_DIALOG.key) ===
      URL_USER_PROFILE.OPEN_NOMAD_BADGE_DIALOG.value

    if (shouldOpenNomadBadgeDialog) {
      window.dispatchEvent(new CustomEvent(OPEN_NOMAD_BADGE_DIALOG))
    }

    const shouldOpenGrandBadgeDialog =
      getQuery(URL_USER_PROFILE.OPEN_GRAND_BADGE_DIALOG.key) ===
      URL_USER_PROFILE.OPEN_GRAND_BADGE_DIALOG.value

    if (shouldOpenGrandBadgeDialog) {
      window.dispatchEvent(new CustomEvent(OPEN_GRAND_BADGE_DIALOG))
    }
  }, [])

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
  const nomadBadgeType = badges.filter((b) =>
    ['nomad1', 'nomad2', 'nomad3', 'nomad4'].includes(b.type)
  ) // nomad1 nomad2 nomad3 nomad4
  const hasNomadBadge = nomadBadgeType?.length >= 1
  const nomadBadgeLevel = (
    hasNomadBadge ? Number.parseInt(nomadBadgeType[0].type.charAt(5)) : 1
  ) as 1 | 2 | 3 | 4
  const hasGrandBadge = badges.some((b) => b.type === 'grand_slam')

  const profileCover = user.info.profileCover
  const userState = user.status?.state as string
  const isCivicLiker = user.liker.civicLiker

  /**
   * Inactive User
   */
  const isUserArchived = userState === 'archived'
  if (isUserArchived) {
    return <Inactive />
  }

  /**
   * Active
   */
  const avatar = (
    <section className={styles.avatar}>
      <Avatar size={76} user={user} inProfile />
    </section>
  )

  const headerClasses = classNames({
    [styles.header]: true,
    [styles.headerWithoutCover]: !profileCover,
  })

  const rightClasses = classNames({
    [styles.right]: true,
    [styles.spaceTop]: !!profileCover,
  })

  return (
    <>
      <section
        className={styles.userProfile}
        data-test-id={TEST_ID.USER_PROFILE}
      >
        {!!profileCover && <Cover cover={profileCover} />}

        <Media lessThan="lg">
          <header className={headerClasses}>
            {isMe && (
              <EditProfileDialog user={user}>
                {({ openDialog: openEditProfileDialog }) => (
                  <section
                    className={styles.avatarBtn}
                    role="button"
                    onClick={openEditProfileDialog}
                  >
                    {avatar}
                  </section>
                )}
              </EditProfileDialog>
            )}

            {!isMe && avatar}

            <section className={rightClasses}>
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
                      <FormattedMessage defaultMessage="Edit" id="wEQDC6" />
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
              <BadgesDialog
                hasNomadBadge={hasNomadBadge}
                nomadBadgeLevel={nomadBadgeLevel}
                hasGrandBadge={hasGrandBadge}
                hasTraveloggersBadge={hasTraveloggersBadge}
                hasSeedBadge={hasSeedBadge}
                hasGoldenMotorBadge={hasGoldenMotorBadge}
                hasArchitectBadge={hasArchitectBadge}
                isCivicLiker={isCivicLiker}
              >
                {({ openDialog }) => (
                  <section
                    role="button"
                    className={styles.badges}
                    onClick={() => openDialog()}
                  >
                    <Badges
                      hasNomadBadge={hasNomadBadge}
                      nomadBadgeLevel={nomadBadgeLevel}
                      hasGrandBadge={hasGrandBadge}
                      hasTraveloggersBadge={hasTraveloggersBadge}
                      hasSeedBadge={hasSeedBadge}
                      hasGoldenMotorBadge={hasGoldenMotorBadge}
                      hasArchitectBadge={hasArchitectBadge}
                      isCivicLiker={isCivicLiker}
                    />
                  </section>
                )}
              </BadgesDialog>

              {user?.info.ethAddress && <DynamicWalletLabel user={user} />}
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
                  <FormattedMessage defaultMessage="Followers" id="pzTOmv" />
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
                    id="ohgTH4"
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
              size={14}
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
