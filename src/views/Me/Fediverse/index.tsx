import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  Button,
  Head,
  Layout,
  QueryError,
  SpinnerBlock,
  toast,
} from '~/components'

import {
  ACT_FEDIVERSE,
  FEDIVERSE_REMOTE_ACTOR,
  REFRESH_FEDIVERSE_PROFILE,
  VIEWER_FEDIVERSE,
} from './gql'
import styles from './styles.module.css'

type RemoteActor = {
  actorId: string
  account?: string | null
  preferredUsername?: string | null
  name?: string | null
  summary: string
  url: string
  avatarUrl?: string | null
  status?: string | null
}

type FediversePost = {
  objectId: string
  content: string
  summary: string
  url?: string | null
  inReplyTo?: string | null
  publishedAt?: string | null
  remoteActor: RemoteActor
}

type FediverseNotification = {
  id: string
  category: string
  headline?: string | null
  preview?: string | null
  eventCount: number
  unreadCount: number
  publishedAt?: string | null
}

type ViewerFediverseData = {
  viewerFediverse: {
    actorId: string
    handle: string
    account: string
    displayName: string
    summary: string
    profileUrl: string
    avatarUrl?: string | null
    headerUrl?: string | null
    followersCount: number
    followingCount: number
    pendingFollowingCount: number
    unreadNotificationsCount: number
    maxFollowing: number
    retentionDays: number
    timelineMaxItems: number
    following: RemoteActor[]
    notifications: FediverseNotification[]
    timeline: FediversePost[]
  }
}

type RemoteActorData = {
  fediverseRemoteActor: RemoteActor
}

type FediverseAction =
  | 'follow'
  | 'unfollow'
  | 'reply'
  | 'like'
  | 'announce'
  | 'block'
  | 'report'
  | 'mark_read'

type ActionInput = {
  action: FediverseAction
  account?: string
  remoteActorId?: string
  objectId?: string
  content?: string
  notificationIds?: string[]
  reason?: string
}

const plainText = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()

const actorLabel = (actor: RemoteActor) =>
  actor.name || actor.preferredUsername || actor.account || actor.actorId

const ActorAvatar = ({ actor }: { actor: RemoteActor }) => (
  <span
    aria-hidden
    className={styles.avatar}
    style={
      actor.avatarUrl
        ? { backgroundImage: `url("${actor.avatarUrl}")` }
        : undefined
    }
  >
    {!actor.avatarUrl && actorLabel(actor).slice(0, 1).toUpperCase()}
  </span>
)

const Fediverse = () => {
  const intl = useIntl()
  const [search, setSearch] = useState('')
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({})
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const { data, loading, error, refetch } = useQuery<ViewerFediverseData>(
    VIEWER_FEDIVERSE,
    { fetchPolicy: 'network-only' }
  )
  const [resolveActor, actorResult] = useLazyQuery<RemoteActorData>(
    FEDIVERSE_REMOTE_ACTOR,
    { fetchPolicy: 'network-only' }
  )
  const [act] = useMutation(ACT_FEDIVERSE)
  const [refreshProfile] = useMutation(REFRESH_FEDIVERSE_PROFILE)

  useEffect(() => {
    refreshProfile()
      .then(() => refetch())
      .catch(() => undefined)
  }, [])

  const runAction = async (input: ActionInput, key: string) => {
    setBusyKey(key)
    try {
      await act({ variables: { input } })
      await refetch()
      toast.success({
        message: intl.formatMessage({
          defaultMessage: '聯邦宇宙操作已送出',
          id: 'SyxunU',
        }),
      })
      return true
    } catch {
      toast.error({
        message: intl.formatMessage({
          defaultMessage: '操作失敗，請稍後再試',
          id: 'vXgChH',
        }),
      })
      return false
    } finally {
      setBusyKey(null)
    }
  }

  const searchActor = async (event: React.FormEvent) => {
    event.preventDefault()
    const account = search.trim()
    if (!account) {
      return
    }
    await resolveActor({ variables: { input: { account } } })
  }

  const markNotificationsRead = async () => {
    const ids =
      data?.viewerFediverse.notifications
        .filter((notification) => notification.unreadCount > 0)
        .map((notification) => notification.id) ?? []
    if (ids.length === 0) {
      return
    }
    await runAction(
      { action: 'mark_read', notificationIds: ids },
      'notifications'
    )
  }

  const reportPost = async (post: FediversePost) => {
    const reason = window.prompt(
      intl.formatMessage({
        defaultMessage: '請簡述檢舉原因',
        id: 'W1j+F0',
      })
    )
    if (!reason?.trim()) {
      return
    }
    await runAction(
      {
        action: 'report',
        remoteActorId: post.remoteActor.actorId,
        objectId: post.objectId,
        reason: reason.trim(),
      },
      `report:${post.objectId}`
    )
  }

  const Header = () => (
    <>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="聯邦宇宙" id="b8/cFV" />
          </Layout.Header.Title>
        }
      />
      <Head
        title={intl.formatMessage({
          defaultMessage: '聯邦宇宙',
          id: 'b8/cFV',
        })}
      />
    </>
  )

  if (loading) {
    return (
      <Layout.Main>
        <Header />
        <SpinnerBlock />
      </Layout.Main>
    )
  }

  if (error || !data?.viewerFediverse) {
    return (
      <Layout.Main>
        <Header />
        {error ? <QueryError error={error} /> : null}
      </Layout.Main>
    )
  }

  const profile = data.viewerFediverse
  const foundActor = actorResult.data?.fediverseRemoteActor

  return (
    <Layout.Main>
      <Header />
      <Layout.Main.Spacing>
        <section className={styles.profile}>
          <div
            className={styles.headerImage}
            style={
              profile.headerUrl
                ? { backgroundImage: `url("${profile.headerUrl}")` }
                : undefined
            }
          />
          <div className={styles.profileBody}>
            <span
              className={styles.profileAvatar}
              style={
                profile.avatarUrl
                  ? { backgroundImage: `url("${profile.avatarUrl}")` }
                  : undefined
              }
            >
              {!profile.avatarUrl &&
                profile.displayName.slice(0, 1).toUpperCase()}
            </span>
            <div className={styles.profileText}>
              <h2>{profile.displayName}</h2>
              <a href={profile.profileUrl} rel="noreferrer" target="_blank">
                @{profile.account}
              </a>
              {profile.summary && <p>{plainText(profile.summary)}</p>}
            </div>
          </div>
          <div className={styles.metrics}>
            <span>
              <strong>{profile.followersCount}</strong>
              <FormattedMessage defaultMessage="位追蹤者" id="hyDCe8" />
            </span>
            <span>
              <strong>{profile.followingCount}</strong>
              <FormattedMessage defaultMessage="追蹤中" id="miEMcG" />
            </span>
            <span>
              <strong>{profile.pendingFollowingCount}</strong>
              <FormattedMessage defaultMessage="等待核准" id="sAB+vZ" />
            </span>
          </div>
        </section>

        <section className={styles.section}>
          <h2>
            <FormattedMessage defaultMessage="尋找遠端作者" id="jWwn1K" />
          </h2>
          <p className={styles.hint}>
            <FormattedMessage
              defaultMessage="輸入完整帳號，例如 @alice@example.social"
              id="kOStiL"
            />
          </p>
          <form className={styles.search} onSubmit={searchActor}>
            <input
              aria-label={intl.formatMessage({
                defaultMessage: 'Fediverse 帳號',
                id: 'QJd23B',
              })}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="@alice@example.social"
              value={search}
            />
            <Button
              bgColor="green"
              disabled={actorResult.loading || !search.trim()}
              spacing={[10, 20]}
              textColor="white"
              type="submit"
            >
              <FormattedMessage defaultMessage="搜尋" id="InCosw" />
            </Button>
          </form>
          {actorResult.error && (
            <p className={styles.error}>
              <FormattedMessage
                defaultMessage="找不到這個聯邦帳號"
                id="0XnomJ"
              />
            </p>
          )}
          {foundActor && (
            <div className={styles.actorRow}>
              <ActorAvatar actor={foundActor} />
              <div className={styles.actorText}>
                <strong>{actorLabel(foundActor)}</strong>
                <span>{foundActor.account || foundActor.actorId}</span>
              </div>
              <Button
                borderColor="green"
                disabled={busyKey === `follow:${foundActor.actorId}`}
                onClick={() =>
                  runAction(
                    {
                      action: 'follow',
                      account: foundActor.account || search.trim(),
                      remoteActorId: foundActor.actorId,
                    },
                    `follow:${foundActor.actorId}`
                  )
                }
                spacing={[8, 16]}
                textColor="green"
              >
                <FormattedMessage defaultMessage="追蹤" id="kggbxQ" />
              </Button>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h2>
            <FormattedMessage defaultMessage="追蹤中的作者" id="ByvxDL" />
          </h2>
          {profile.following.length === 0 ? (
            <p className={styles.empty}>
              <FormattedMessage
                defaultMessage="尚未追蹤任何遠端作者"
                id="zWonDB"
              />
            </p>
          ) : (
            profile.following.map((actor) => (
              <div className={styles.actorRow} key={actor.actorId}>
                <ActorAvatar actor={actor} />
                <div className={styles.actorText}>
                  <strong>{actorLabel(actor)}</strong>
                  <span>{actor.account || actor.actorId}</span>
                </div>
                <Button
                  borderColor="grey"
                  disabled={busyKey === `unfollow:${actor.actorId}`}
                  onClick={() =>
                    runAction(
                      {
                        action: 'unfollow',
                        remoteActorId: actor.actorId,
                      },
                      `unfollow:${actor.actorId}`
                    )
                  }
                  spacing={[8, 16]}
                  textColor="greyDarker"
                >
                  <FormattedMessage defaultMessage="取消追蹤" id="rjEc9z" />
                </Button>
              </div>
            ))
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>
              <FormattedMessage defaultMessage="聯邦通知" id="glsBoL" />
              {profile.unreadNotificationsCount > 0 && (
                <span className={styles.badge}>
                  {profile.unreadNotificationsCount}
                </span>
              )}
            </h2>
            {profile.unreadNotificationsCount > 0 && (
              <Button
                disabled={busyKey === 'notifications'}
                onClick={markNotificationsRead}
                textColor="green"
              >
                <FormattedMessage defaultMessage="全部已讀" id="Q8g2+W" />
              </Button>
            )}
          </div>
          {profile.notifications.length === 0 ? (
            <p className={styles.empty}>
              <FormattedMessage defaultMessage="目前沒有通知" id="VWeoZC" />
            </p>
          ) : (
            profile.notifications.map((notification) => (
              <div className={styles.notification} key={notification.id}>
                <div>
                  <strong>
                    {notification.headline || notification.category}
                  </strong>
                  {notification.preview && (
                    <p>{plainText(notification.preview)}</p>
                  )}
                </div>
                <span>
                  {notification.eventCount}
                  {notification.unreadCount > 0 && ' · new'}
                </span>
              </div>
            ))
          )}
        </section>

        <section className={styles.section}>
          <h2>
            <FormattedMessage defaultMessage="追蹤動態" id="zK82DU" />
          </h2>
          {profile.timeline.length === 0 ? (
            <p className={styles.empty}>
              <FormattedMessage
                defaultMessage="追蹤遠端作者後，最新內容會出現在這裡"
                id="HFBocb"
              />
            </p>
          ) : (
            profile.timeline.map((post) => (
              <article className={styles.post} key={post.objectId}>
                <header>
                  <ActorAvatar actor={post.remoteActor} />
                  <div className={styles.actorText}>
                    <strong>{actorLabel(post.remoteActor)}</strong>
                    <span>
                      {post.remoteActor.account || post.remoteActor.actorId}
                    </span>
                  </div>
                </header>
                <p className={styles.postContent}>
                  {plainText(post.content || post.summary)}
                </p>
                {post.url && (
                  <a
                    className={styles.postLink}
                    href={post.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FormattedMessage defaultMessage="查看原文" id="IK6Mk7" />
                  </a>
                )}
                <div className={styles.actions}>
                  <Button
                    disabled={busyKey === `like:${post.objectId}`}
                    onClick={() =>
                      runAction(
                        {
                          action: 'like',
                          objectId: post.objectId,
                          remoteActorId: post.remoteActor.actorId,
                        },
                        `like:${post.objectId}`
                      )
                    }
                    textColor="green"
                  >
                    <FormattedMessage defaultMessage="喜歡" id="NDG8qY" />
                  </Button>
                  <Button
                    disabled={busyKey === `announce:${post.objectId}`}
                    onClick={() =>
                      runAction(
                        {
                          action: 'announce',
                          objectId: post.objectId,
                          remoteActorId: post.remoteActor.actorId,
                        },
                        `announce:${post.objectId}`
                      )
                    }
                    textColor="green"
                  >
                    <FormattedMessage defaultMessage="轉發" id="bmR7T4" />
                  </Button>
                  <Button
                    disabled={busyKey === `block:${post.remoteActor.actorId}`}
                    onClick={() =>
                      runAction(
                        {
                          action: 'block',
                          remoteActorId: post.remoteActor.actorId,
                          reason: 'Blocked by local user',
                        },
                        `block:${post.remoteActor.actorId}`
                      )
                    }
                    textColor="greyDarker"
                  >
                    <FormattedMessage defaultMessage="封鎖" id="5UgS3k" />
                  </Button>
                  <Button
                    disabled={busyKey === `report:${post.objectId}`}
                    onClick={() => reportPost(post)}
                    textColor="red"
                  >
                    <FormattedMessage defaultMessage="檢舉" id="5kX6Qk" />
                  </Button>
                </div>
                <form
                  className={styles.reply}
                  onSubmit={async (event) => {
                    event.preventDefault()
                    const content = replyDrafts[post.objectId]?.trim()
                    if (!content) {
                      return
                    }
                    const sent = await runAction(
                      {
                        action: 'reply',
                        objectId: post.objectId,
                        remoteActorId: post.remoteActor.actorId,
                        content,
                      },
                      `reply:${post.objectId}`
                    )
                    if (sent) {
                      setReplyDrafts((current) => ({
                        ...current,
                        [post.objectId]: '',
                      }))
                    }
                  }}
                >
                  <input
                    aria-label={intl.formatMessage({
                      defaultMessage: '回覆內容',
                      id: 'ih+UCV',
                    })}
                    maxLength={500}
                    onChange={(event) =>
                      setReplyDrafts((current) => ({
                        ...current,
                        [post.objectId]: event.target.value,
                      }))
                    }
                    placeholder={intl.formatMessage({
                      defaultMessage: '回覆到聯邦宇宙',
                      id: 'kw8J39',
                    })}
                    value={replyDrafts[post.objectId] || ''}
                  />
                  <Button
                    bgColor="green"
                    disabled={
                      busyKey === `reply:${post.objectId}` ||
                      !replyDrafts[post.objectId]?.trim()
                    }
                    spacing={[8, 16]}
                    textColor="white"
                    type="submit"
                  >
                    <FormattedMessage defaultMessage="送出" id="6UaJbf" />
                  </Button>
                </form>
              </article>
            ))
          )}
          <p className={styles.retention}>
            <FormattedMessage
              defaultMessage="最多追蹤 {maxFollowing} 個帳號，動態保留 {days} 天，上限 {items} 筆"
              id="t1yrE4"
              values={{
                days: profile.retentionDays,
                items: profile.timelineMaxItems,
                maxFollowing: profile.maxFollowing,
              }}
            />
          </p>
        </section>
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Fediverse
