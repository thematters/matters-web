// @ts-ignore
import contentHash from '@ensdomains/content-hash'
import { namehash } from 'ethers/lib/utils'
import { useContext, useEffect } from 'react'
import { chain, useContractRead, useEnsName, useEnsResolver } from 'wagmi'

import {
  Avatar,
  Button,
  Cover,
  ENSDialog,
  Error,
  Expandable,
  FollowUserButton,
  IconInfo16,
  IconRss32,
  LanguageContext,
  Layout,
  RssFeedDialog,
  Spinner,
  Throw404,
  Tooltip,
  Translate,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import ShareButton from '~/components/Layout/Header/ShareButton'

import { numAbbr, PublicResolverABI, translate } from '~/common/utils'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'

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
import { LogbookDialog } from './LogbookDialog'
import styles from './styles.css'
import WalletAddress from './WalletAddress'

import { AuthorRssFeed } from '~/components/Dialogs/RssFeedDialog/__generated__/AuthorRssFeed'
import { UserProfileUserPublic } from './__generated__/UserProfileUserPublic'

interface FingerprintButtonProps {
  user: AuthorRssFeed
}

const RssFeedButton = ({ user }: FingerprintButtonProps) => {
  const { lang } = useContext(LanguageContext)

  return (
    <RssFeedDialog user={user}>
      {({ openDialog }) => (
        <Button
          onClick={openDialog}
          spacing={['xxtight', 'xtight']}
          aria-label={translate({ id: 'contentFeedEntrance', lang })}
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
  const { data, loading, client } = usePublicQuery<UserProfileUserPublic>(
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

  const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

  const address = user?.info.ethAddress
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: isProd ? chain.mainnet.id : chain.goerli.id,
  })
  const { data: resolverData } = useEnsResolver({
    name: ensName as string,
  })

  const { data: readData } = useContractRead({
    address: resolverData?.address,
    abi: PublicResolverABI,
    functionName: 'contenthash',
    args: [namehash(ensName || ('' as string))],
    chainId: isProd ? chain.mainnet.id : chain.goerli.id,
  })
  const ipnsHash = user?.info.ipnsKey
  const hasLinkedIPNS =
    !!ipnsHash && '0x' + contentHash.encode('ipns-ns', ipnsHash) === readData
  const hasLinkEnsButton = ensName && !hasLinkedIPNS && isMe && ipnsHash
  /**
   * Render
   */
  const LayoutHeader = () => (
    <Layout.Header
      left={<Layout.Header.BackButton mode="black-solid" />}
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
            <Translate
              zh_hant="此帳戶因為違反社區約章而被註銷"
              zh_hans="此帐户因为违反社区约章而被注销"
              en="This account is archived due to violation of community guidelines"
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
                {isUserArchived && <Translate id="accountArchived" />}
                {isUserBanned && <Translate id="accountBanned" />}
              </h1>
            </section>
          </section>

          <style jsx>{styles}</style>
        </section>
      </>
    )
  }

  const isOwner =
    user.info.cryptoWallet?.address === viewer.info.cryptoWallet?.address

  /**
   * Active or Onboarding User
   */
  return (
    <>
      <LayoutHeader />

      <section className="user-profile">
        <Cover cover={profileCover} fallbackCover={IMAGE_COVER.src} />

        <header>
          <section className="avatar">
            {hasTraveloggersBadge ? (
              <Tooltip
                content={
                  <Translate
                    zh_hant={`查看 ${user.displayName} 的航行日誌`}
                    zh_hans={`查看 ${user.displayName} 的航行日志`}
                    en={`View Logbooks owned by ${user.displayName}`}
                  />
                }
              >
                <LogbookDialog
                  title={
                    <Translate
                      en={
                        isOwner ? 'My Logbook' : `${user.displayName}'s Logbook`
                      }
                      zh_hant={
                        isOwner
                          ? '我的 Logbook'
                          : `${user.displayName} 的航行日誌`
                      }
                      zh_hans={
                        isOwner
                          ? '我的 Logbook'
                          : `${user.displayName} 的航行日志`
                      }
                    />
                  }
                  address={user.info.cryptoWallet?.address as string}
                >
                  {({ openDialog }) => (
                    <button
                      type="button"
                      onClick={openDialog}
                      aria-haspopup="dialog"
                    >
                      <Avatar size="xxxl" user={user} inProfile />
                    </button>
                  )}
                </LogbookDialog>
              </Tooltip>
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
            <h1 className="name">{user.displayName}</h1>
            {hasTraveloggersBadge && <TraveloggersBadge />}
            {hasSeedBadge && <SeedBadge />}
            {hasGoldenMotorBadge && <GoldenMotorBadge />}
            {hasArchitectBadge && <ArchitectBadge />}
            {isCivicLiker && <CivicLikerBadge />}
          </section>

          <section className="username">
            <span className="name">@{user.userName}</span>
            {!isMe && <FollowUserButton.State user={user} />}
          </section>
          <section className="ens-name">
            {user.info.ethAddress && (
              <WalletAddress
                address={user.info.ethAddress}
                hasLinkedIPNS={hasLinkedIPNS}
              />
            )}
            {
              <section className="ens-bnt">
                {hasLinkEnsButton && (
                  <ENSDialog user={user}>
                    {({ openDialog }) => (
                      <Button
                        size={[null, '1.5rem']}
                        spacing={[0, 'tight']}
                        borderColor="green"
                        onClick={() => {
                          openDialog()
                        }}
                        textColor="green"
                      >
                        <Translate id="bindIPNStoENS" />
                      </Button>
                    )}
                  </ENSDialog>
                )}
              </section>
            }
            {hasLinkedIPNS && !isMe && (
              <Tooltip
                content={
                  <Translate
                    zh_hans={`${user.displayName} 已将他的 ENS 指向到个人 IPNS 页面`}
                    zh_hant={`${user.displayName} 已將他的 ENS 指向到個人 IPNS 頁面`}
                    en={`${user.displayName} has linked primary ENS name to his IPNS page. `}
                  />
                }
              >
                <span className="info-icon">
                  <IconInfo16 size="sm" color="grey" />
                </span>
              </Tooltip>
            )}
          </section>
          <Expandable
            content={user.info.description}
            color="grey-darker"
            size="md"
            spacingTop="base"
          >
            <p className="description">{user.info.description}</p>
          </Expandable>
        </section>

        <footer>
          <FollowersDialog user={user}>
            {({ openDialog: openFollowersDialog }) => (
              <button type="button" onClick={openFollowersDialog}>
                <span className="count">
                  {numAbbr(user.followers.totalCount)}
                </span>
                <Translate id="follower" />
              </button>
            )}
          </FollowersDialog>

          <FollowingDialog user={user}>
            {({ openDialog: openFollowingDialog }) => (
              <button type="button" onClick={openFollowingDialog}>
                <span className="count">
                  {numAbbr(user.following.users.totalCount)}
                </span>
                <Translate id="following" />
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
