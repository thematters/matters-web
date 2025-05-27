import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IMAGE_CIRCLE_COVER from '@/public/static/images/circle-cover.svg?url'
import { REFETCH_CIRCLE_DETAIL } from '~/common/enums'
import { numAbbr, stripSpaces } from '~/common/utils'
import {
  CircleAvatar,
  Cover,
  Expandable,
  Head,
  Layout,
  SpinnerBlock,
  SubscribeCircleDialog,
  Throw404,
  useEventListener,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { CircleProfileCirclePublicQuery } from '~/gql/graphql'

import SubscriptionBanner from '../SubscriptionBanner'
import { AddCircleArticle } from './AddCircleArticle'
import AuthorWidget from './AuthorWidget'
import DropdownActions from './DropdownActions'
import FollowButton from './FollowButton'
import { FollowersDialog } from './FollowersDialog'
import { CIRCLE_PROFILE_PRIVATE, CIRCLE_PROFILE_PUBLIC } from './gql'
import { MembersDialog } from './MembersDialog'
import styles from './styles.module.css'

const CircleProfile = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  // public data
  const {
    data,
    loading,
    client,
    refetch: refetchPublic,
  } = usePublicQuery<CircleProfileCirclePublicQuery>(CIRCLE_PROFILE_PUBLIC, {
    variables: { name },
  })
  const circle = data?.circle
  const isOwner = circle?.owner.id === viewer.id
  const price = circle?.prices && circle?.prices[0]

  // private data
  const [privateFetched, setPrivateFetched] = useState(false)
  const loadPrivate = async () => {
    if (!viewer.isAuthed) {
      return
    }

    await client.query({
      query: CIRCLE_PROFILE_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { name },
    })

    setPrivateFetched(true)
  }

  // fetch private data
  useEffect(() => {
    if (!circle?.id) {
      return
    }

    if (viewer.isAuthed) {
      loadPrivate()
    } else {
      setPrivateFetched(true)
    }
  }, [circle?.id])

  // refetch & pull to refresh
  const refetch = async () => {
    await refetchPublic()
    loadPrivate()
  }
  useEventListener(REFETCH_CIRCLE_DETAIL, refetch)

  const description = circle ? stripSpaces(circle.description) : ''

  /**
   * Render
   */

  const LayoutHeader = () => (
    <>
      {circle && (
        <Head
          title={`${circle.displayName} - ${circle.owner.displayName}`}
          description={description}
          keywords={
            [
              circle.displayName,
              circle.name,
              circle.owner.displayName,
              // circle.owner.userName,
            ] as string[]
          } // add top10 most used tags?
          image={circle.cover}
          jsonLdData={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: circle.displayName,
            description,
            image: circle.avatar,
            url: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}/~${circle.name}`,
          }}
        />
      )}

      <Layout.Header
        right={
          <>
            <span />
            {circle && (
              <section className={styles.buttons}>
                <Layout.Header.ShareButton />
                <DropdownActions circle={circle} />
              </section>
            )}
          </>
        }
        mode="transparent"
      />
    </>
  )

  if (loading) {
    return (
      <>
        <LayoutHeader />
        <SpinnerBlock />
      </>
    )
  }

  if (!circle) {
    return (
      <>
        <LayoutHeader />
        <Throw404 />
      </>
    )
  }

  return (
    <>
      <LayoutHeader />

      <section className={styles.profile}>
        <Cover cover={circle.cover} fallbackCover={IMAGE_CIRCLE_COVER} />

        <header className={styles.header}>
          <section className={styles.info}>
            <CircleAvatar size={72} circle={circle} />
            <h2 className={styles.name}>{circle.displayName}</h2>
          </section>

          {price && (
            <section className={styles.price}>
              <span className={styles.amount}>{price.amount}</span>
              <br />
              {price.currency} /{' '}
              <FormattedMessage defaultMessage="month" id="Cu3Cty" />
            </section>
          )}
        </header>

        {circle.description && (
          <section className={styles.description}>
            <Expandable
              content={circle.description}
              color="greyDarker"
              spacingTop="base"
              size={16}
            >
              <p>{circle.description}</p>
            </Expandable>
          </section>
        )}

        {privateFetched && <SubscriptionBanner circle={circle} />}

        <footer className={styles.footer}>
          <section className={styles.counts}>
            <MembersDialog>
              {({ openDialog: openMembersDialog }) => (
                <button
                  type="button"
                  onClick={openMembersDialog}
                  aria-haspopup="dialog"
                >
                  <span className={styles.count}>
                    {numAbbr(circle.members.totalCount)}
                  </span>
                  <FormattedMessage defaultMessage="Members" id="+a+2ug" />
                </button>
              )}
            </MembersDialog>

            <FollowersDialog circle={circle}>
              {({ openDialog: openFollowersDialog }) => (
                <button
                  type="button"
                  onClick={openFollowersDialog}
                  aria-haspopup="dialog"
                >
                  <span className={styles.count}>
                    {numAbbr(circle.followers.totalCount)}
                  </span>
                  <FormattedMessage defaultMessage="Followers" id="pzTOmv" />
                </button>
              )}
            </FollowersDialog>
          </section>

          {isOwner ? (
            <AddCircleArticle.Button circle={circle} />
          ) : (
            <FollowButton circle={circle} />
          )}
        </footer>
        <AuthorWidget circle={circle} />

        <SubscribeCircleDialog circle={circle} />
      </section>
    </>
  )
}

export default CircleProfile
