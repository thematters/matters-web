import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { DateTime, Title, Translate } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, stripHtml, toPath } from '~/common/utils'

import DeleteButton from '../Components/DeleteButton'
import styles from './styles.css'

import { DraftDigestFeedDraft } from './__generated__/DraftDigestFeedDraft'

const fragments = {
  draft: gql`
    fragment DraftDigestFeedDraft on Draft {
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

const DraftDigestFeed = ({ draft }: { draft: DraftDigestFeedDraft }) => {
  const { id, title, summary, publishState, updatedAt, slug } = draft
  const path = toPath({
    page: 'draftDetail',
    slug,
    id
  })
  const containerClasses = classNames({
    container: true,
    [publishState]: true
  })
  const cleanedSummary = stripHtml(summary)

  const onClick = () =>
    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_DRAFT, {
      entrance: id
    })

  return (
    <section className={containerClasses}>
      <div className="content">
        <div className="title">
          <Link {...path}>
            <a onClick={onClick}>
              <Title type="feed" is="h2">
                {title || <Translate id="untitle" />}
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

          <footer className="actions">
            <DateTime date={updatedAt} type="relative" />

            <DeleteButton id={id} />
          </footer>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

DraftDigestFeed.fragments = fragments

export default DraftDigestFeed
