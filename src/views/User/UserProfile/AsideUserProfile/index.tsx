import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import IconCamera from '@/public/static/icons/24px/camera.svg'
import {
  OPEN_GRAND_BADGE_DIALOG,
  OPEN_NOMAD_BADGE_DIALOG,
  TEST_ID,
  URL_USER_PROFILE,
} from '~/common/enums'
import { numAbbr, toPath } from '~/common/utils'
import {
  Avatar,
  Button,
  EditProfileDialog,
  Expandable,
  FollowUserButton,
  Icon,
  LinkWrapper,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { UserProfileUserPublicQuery } from '~/gql/graphql'

import { BadgeGrandDialog } from '../BadgeGrandDialog'
import { BadgeNomadDialog } from '../BadgeNomadDialog'
import {
  ArchitectBadge,
  CivicLikerBadge,
  GoldenMotorBadge,
  GrandBadge,
  NomadBadge,
  SeedBadge,
  TraveloggersBadge,
} from '../Badges'
import CircleWidget from '../CircleWidget'
import DropdownActions from '../DropdownActions'
import { FollowersDialog } from '../FollowersDialog'
import { FollowingDialog } from '../FollowingDialog'
import { USER_PROFILE_PRIVATE, USER_PROFILE_PUBLIC } from '../gql'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

const DynamicWalletLabel = dynamic(() => import('../WalletLabel'), {
  ssr: false,
})

export const AsideUserProfile = () => {
  const { isInPath, getQuery } = useRoute()
  const viewer = useContext(ViewerContext)

  // public user data
  const userName = getQuery('name')
  const isInUserPage = isInPath('USER_WORKS') || isInPath('USER_COLLECTIONS')
  const isMe = !userName || viewer.userName === userName

  const userProfilePath = toPath({
    page: 'userProfile',
    userName,
  })

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
    return <Placeholder />
  }

  if (!user) {
    return null
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

  const userState = user.status?.state as string
  const isCivicLiker = user.liker.civicLiker
  const isUserArchived = userState === 'archived'
  const isUserInactive = isUserArchived

  /**
   * Inactive User
   */
  if (isUserInactive) {
    return (
      <section className={styles.userProfile}>
        <header className={styles.header}>
          <section className={styles.avatar}>
            <Avatar size={120} />
          </section>
        </header>

        <section className={styles.info}>
          <section className={styles.displayName}>
            <h1 className={styles.name}>
              {isUserArchived && (
                <FormattedMessage defaultMessage="Deleted user" id="9J0iCw" />
              )}
            </h1>
          </section>
        </section>
      </section>
    )
  }

  /**
   * Active
   */
  return (
    <section
      className={styles.userProfile}
      data-test-id={TEST_ID.ASIDE_USER_PROFILE}
    >
      <header className={styles.header}>
        {isInUserPage && isMe && (
          <EditProfileDialog user={user}>
            {({ openDialog: openEditProfileDialog }) => (
              <section
                className={styles.avatar + ' ' + styles.clickable}
                onClick={openEditProfileDialog}
              >
                <Avatar size={120} user={user} inProfile />
                <div className={styles.mask}>
                  <Icon icon={IconCamera} color="white" size={40} />
                </div>
              </section>
            )}
          </EditProfileDialog>
        )}
        {isInUserPage && !isMe && (
          <section className={styles.avatar}>
            <LinkWrapper {...userProfilePath}>
              <Avatar size={120} user={user} inProfile />
            </LinkWrapper>
          </section>
        )}
        {!isInUserPage && (
          <LinkWrapper {...userProfilePath}>
            <section className={styles.avatar}>
              <Avatar size={88} user={user} inProfile />
            </section>
          </LinkWrapper>
        )}
      </header>

      <section className={styles.info}>
        <section className={styles.displayName}>
          {isInUserPage && isMe && (
            <EditProfileDialog user={user}>
              {({ openDialog: openEditProfileDialog }) => (
                <span
                  role="button"
                  onClick={openEditProfileDialog}
                  className={styles.meDisplayName}
                >
                  <h1
                    className={styles.isInUserPageName}
                    data-test-id={TEST_ID.USER_PROFILE_DISPLAY_NAME}
                  >
                    {user.displayName}
                  </h1>
                </span>
              )}
            </EditProfileDialog>
          )}
          {isInUserPage && !isMe && (
            <LinkWrapper {...userProfilePath}>
              <h1
                className={styles.isInUserPageName}
                data-test-id={TEST_ID.USER_PROFILE_DISPLAY_NAME}
              >
                {user.displayName}
              </h1>
            </LinkWrapper>
          )}
          {!isInUserPage && (
            <LinkWrapper {...userProfilePath}>
              <h1
                className={styles.name}
                data-test-id={TEST_ID.USER_PROFILE_DISPLAY_NAME}
              >
                {user.displayName}
              </h1>
            </LinkWrapper>
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

        {(hasNomadBadge ||
          hasTraveloggersBadge ||
          hasSeedBadge ||
          hasGoldenMotorBadge ||
          hasArchitectBadge ||
          hasGrandBadge ||
          isCivicLiker ||
          user?.info.ethAddress) && (
          <section className={styles.badges}>
            {hasNomadBadge && (
              <BadgeNomadDialog nomadBadgeLevel={nomadBadgeLevel}>
                {({ openDialog }) => (
                  <NomadBadge
                    level={nomadBadgeLevel}
                    hasTooltip
                    onClick={openDialog}
                  />
                )}
              </BadgeNomadDialog>
            )}
            {hasGrandBadge && (
              <BadgeGrandDialog>
                {({ openDialog }) => (
                  <GrandBadge hasTooltip onClick={openDialog} />
                )}
              </BadgeGrandDialog>
            )}
            {hasTraveloggersBadge && <TraveloggersBadge hasTooltip />}
            {hasSeedBadge && <SeedBadge hasTooltip />}
            {hasGoldenMotorBadge && <GoldenMotorBadge hasTooltip />}
            {hasArchitectBadge && <ArchitectBadge hasTooltip />}
            {isCivicLiker && <CivicLikerBadge hasTooltip />}

            {user?.info.ethAddress && (
              <DynamicWalletLabel user={user} isMe={isMe} hasTooltip />
            )}
          </section>
        )}

        <section className={styles.follow}>
          <FollowersDialog user={user}>
            {({ openDialog: openFollowersDialog }) => (
              <button type="button" onClick={openFollowersDialog}>
                <span
                  className={styles.count}
                  data-test-id={TEST_ID.ASIDE_USER_PROFILE_FOLLOWERS_COUNT}
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

        {user.info.description !== '' && (
          <Expandable
            content={user.info.description}
            color="grey"
            size={14}
            spacingTop="base"
            collapseable={false}
            limit={8}
          >
            <p data-test-id={TEST_ID.USER_PROFILE_BIO}>
              {user.info.description}
            </p>
          </Expandable>
        )}

        {isInUserPage && isMe && (
          <section className={styles.meButtons}>
            <EditProfileDialog user={user}>
              {({ openDialog: openEditProfileDialog }) => (
                <Button
                  textColor="greyDarker"
                  textActiveColor="green"
                  onClick={openEditProfileDialog}
                >
                  <FormattedMessage
                    defaultMessage="Update profile"
                    id="O7ozeo"
                  />
                </Button>
              )}
            </EditProfileDialog>

            <DropdownActions user={user} isMe={isMe} isInAside />
          </section>
        )}

        {isInUserPage && !isMe && (
          <section className={styles.buttons}>
            <FollowUserButton user={user} size="xl" />

            <DropdownActions user={user} isMe={isMe} isInAside />
          </section>
        )}
      </section>

      {isInUserPage && (
        <footer className={styles.footer}>
          <CircleWidget circles={circles} isMe={isMe} />
        </footer>
      )}
    </section>
  )
}

export default AsideUserProfile
