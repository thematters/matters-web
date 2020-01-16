import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { DateTime, Icon, TextIcon, Title, Translate } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { TEXT } from '~/common/enums/text'
import { analytics, stripHtml, toPath } from '~/common/utils'

import DeleteButton from '../Components/DeleteButton'
import ErrorState from '../Components/ErrorState'
import PendingState from '../Components/PendingState'
import RecallButton from '../Components/RecallButton'
import RetryButton from '../Components/RetryButton'
import { FeedDigestDraft } from './__generated__/FeedDigestDraft'
import styles from './styles.css'

const fragments = {
  draft: gql`
    fragment FeedDigestDraft on Draft {
      id
      title
      summary
      slug
      scheduledAt
      updatedAt
      publishState
    }
  `
}

const FeedDigest = ({ draft }: { draft: FeedDigestDraft }) => {
  const { id, title, summary, publishState, updatedAt, slug } = draft
  const isPending = publishState === 'pending'
  const isError = publishState === 'error'
  const isUnpublished = publishState === 'unpublished'
  const isPublished = publishState === 'published'
  const path = toPath({
    page: 'draftDetail',
    slug,
    id
  })
  const containerClasses = classNames({
    container: true,
    [publishState]: true,
    'u-area-disable': isPublished
  })
  const cleanedSummary = stripHtml(summary)

  const onClick = () =>
    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_DRAFT, {
      entrance: id
    })

  return (
    <section className={containerClasses}>
      {(isPending || isError) && (
        <header className="header">
          <span />
          {isPending && <PendingState draft={draft} />}
          {isError && <ErrorState />}
        </header>
      )}

      <div className="content">
        <div className="title">
          <Link {...path}>
            <a onClick={onClick}>
              <Title type="feed" is="h2">
                {title || (
                  <Translate
                    zh_hant={TEXT.zh_hant.untitle}
                    zh_hans={TEXT.zh_hans.untitle}
                  />
                )}
              </Title>
            </a>
          </Link>
        </div>

        <div className="description">
          <Link {...path}>
            <a onClick={onClick}>
              <p>{cleanedSummary}</p>
            </a>
          </Link>

          {isUnpublished && (
            <footer className="actions">
              <DateTime date={updatedAt} type="relative" />
              <Icon.DotDivider />
              <DeleteButton id={id} />
            </footer>
          )}
        </div>
      </div>

      {isPending && (
        <footer className="extra">
          <p>
            <TextIcon icon={<Icon.Help size="md" />}>
              <Translate
                zh_hant="上鏈後不可修改和刪除"
                zh_hans="上链后不可修改和删除"
              />
            </TextIcon>
          </p>
          <RecallButton
            id={id}
            text={
              <Translate
                zh_hant={TEXT.zh_hant.revoke}
                zh_hans={TEXT.zh_hans.revoke}
              />
            }
          />
        </footer>
      )}

      {isError && (
        <footer className="extra">
          <p>
            <TextIcon icon={<Icon.Help size="md" />}>
              <Translate
                zh_hant="作品已存至草稿箱，請檢查網絡後重試。"
                zh_hans="作品已存至草稿箱，请检查网络后重试。"
              />
            </TextIcon>
          </p>
          <div>
            <RecallButton id={id} />
            <RetryButton id={id} />
          </div>
        </footer>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
