import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Button, toast } from '~/components'

import styles from './styles.module.css'

const ARTICLE_FEDIVERSE = gql`
  query ArticleFediverse($input: FediverseArticleInput!) {
    fediverseArticle(input: $input) {
      contentId
      repliesCount
      likesCount
      announcesCount
      notificationsCount
      unreadNotificationsCount
      replies {
        objectId
        content
        summary
        url
        publishedAt
        remoteActor {
          actorId
          account
          preferredUsername
          name
          avatarUrl
        }
      }
    }
  }
`

const ACT_ARTICLE_FEDIVERSE = gql`
  mutation ActArticleFediverse($input: FediverseActionInput!) {
    actFediverse(input: $input) {
      status
      activityId
    }
  }
`

type ArticleFediverseData = {
  fediverseArticle: {
    repliesCount: number
    likesCount: number
    announcesCount: number
    notificationsCount: number
    unreadNotificationsCount: number
    replies: Array<{
      objectId: string
      content: string
      summary: string
      url?: string | null
      remoteActor: {
        actorId: string
        account?: string | null
        preferredUsername?: string | null
        name?: string | null
        avatarUrl?: string | null
      }
    }>
  }
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

const FediverseInteractions = ({
  articleId,
  enabled,
}: {
  articleId: string
  enabled: boolean
}) => {
  const intl = useIntl()
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState<string | null>(null)
  const { data, loading, error, refetch } = useQuery<ArticleFediverseData>(
    ARTICLE_FEDIVERSE,
    {
      variables: { input: { id: articleId } },
      skip: !enabled,
      fetchPolicy: 'network-only',
    }
  )
  const [act] = useMutation(ACT_ARTICLE_FEDIVERSE)

  if (!enabled || loading || error || !data?.fediverseArticle) {
    return null
  }

  const social = data.fediverseArticle

  const runAction = async ({
    key,
    input,
  }: {
    key: string
    input: Record<string, unknown>
  }) => {
    setBusy(key)
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
      setBusy(null)
    }
  }

  return (
    <section className={styles.container}>
      <header>
        <div>
          <h2>
            <FormattedMessage defaultMessage="聯邦宇宙互動" id="+wqFkx" />
          </h2>
          <p>
            <FormattedMessage
              defaultMessage="來自其他 Fediverse 站台的回應"
              id="XTkPen"
            />
          </p>
        </div>
        {social.unreadNotificationsCount > 0 && (
          <span className={styles.badge}>
            {social.unreadNotificationsCount} new
          </span>
        )}
      </header>
      <div className={styles.metrics}>
        <span>
          <strong>{social.repliesCount}</strong>
          <FormattedMessage defaultMessage="回覆" id="lDTamI" />
        </span>
        <span>
          <strong>{social.likesCount}</strong>
          <FormattedMessage defaultMessage="喜歡" id="NDG8qY" />
        </span>
        <span>
          <strong>{social.announcesCount}</strong>
          <FormattedMessage defaultMessage="轉發" id="bmR7T4" />
        </span>
      </div>
      {social.replies.length === 0 ? (
        <p className={styles.empty}>
          <FormattedMessage
            defaultMessage="目前還沒有聯邦宇宙回覆"
            id="PbBsp5"
          />
        </p>
      ) : (
        social.replies.map((reply) => {
          const actor = reply.remoteActor
          const name =
            actor.name ||
            actor.preferredUsername ||
            actor.account ||
            actor.actorId
          const draft = replyDrafts[reply.objectId] || ''

          return (
            <article className={styles.reply} key={reply.objectId}>
              <div className={styles.author}>
                <span
                  className={styles.avatar}
                  style={
                    actor.avatarUrl
                      ? { backgroundImage: `url("${actor.avatarUrl}")` }
                      : undefined
                  }
                >
                  {!actor.avatarUrl && name.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <strong>{name}</strong>
                  <small>{actor.account || actor.actorId}</small>
                </div>
              </div>
              <p>{plainText(reply.content || reply.summary)}</p>
              <div className={styles.actions}>
                <Button
                  disabled={busy === `like:${reply.objectId}`}
                  onClick={() =>
                    runAction({
                      key: `like:${reply.objectId}`,
                      input: {
                        action: 'like',
                        objectId: reply.objectId,
                        remoteActorId: actor.actorId,
                      },
                    })
                  }
                  textColor="green"
                >
                  <FormattedMessage defaultMessage="喜歡" id="NDG8qY" />
                </Button>
                <Button
                  disabled={busy === `announce:${reply.objectId}`}
                  onClick={() =>
                    runAction({
                      key: `announce:${reply.objectId}`,
                      input: {
                        action: 'announce',
                        objectId: reply.objectId,
                        remoteActorId: actor.actorId,
                      },
                    })
                  }
                  textColor="green"
                >
                  <FormattedMessage defaultMessage="轉發" id="bmR7T4" />
                </Button>
              </div>
              <form
                className={styles.replyForm}
                onSubmit={async (event) => {
                  event.preventDefault()
                  if (!draft.trim()) {
                    return
                  }
                  const sent = await runAction({
                    key: `reply:${reply.objectId}`,
                    input: {
                      action: 'reply',
                      objectId: reply.objectId,
                      remoteActorId: actor.actorId,
                      content: draft.trim(),
                    },
                  })
                  if (sent) {
                    setReplyDrafts((current) => ({
                      ...current,
                      [reply.objectId]: '',
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
                      [reply.objectId]: event.target.value,
                    }))
                  }
                  placeholder={intl.formatMessage({
                    defaultMessage: '回覆到聯邦宇宙',
                    id: 'kw8J39',
                  })}
                  value={draft}
                />
                <Button
                  bgColor="green"
                  disabled={busy === `reply:${reply.objectId}` || !draft.trim()}
                  spacing={[8, 16]}
                  textColor="white"
                  type="submit"
                >
                  <FormattedMessage defaultMessage="送出" id="6UaJbf" />
                </Button>
              </form>
            </article>
          )
        })
      )}
    </section>
  )
}

export default FediverseInteractions
