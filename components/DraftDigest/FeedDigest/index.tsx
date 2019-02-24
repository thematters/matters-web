import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'
import { Title } from '~/components'

import { FeedDigestDraft } from './__generated__/FeedDigestDraft'
import styles from './styles.css'

const fragments = {
  draft: gql`
    fragment FeedDigestDraft on Draft {
      id
      title
      summary
      scheduledAt
      createdAt
      publishState
    }
  `
}

const FeedDigest = ({ draft }: { draft: FeedDigestDraft }) => {
  const { id, title, summary, scheduledAt, createdAt, publishState } = draft

  const path = toPath({
    page: 'draftDetail',
    id
  })
  const containerClasses = classNames({
    container: true,
    [publishState]: true
  })

  return (
    <section className={containerClasses}>
      <div className="content">
        <div className="title">
          <Link {...path}>
            <a>
              <Title type="feed" is="h2">
                {title}
              </Title>
            </a>
          </Link>
        </div>
        <div className="description">
          <Link {...path}>
            <a>
              <p>{summary}</p>
            </a>
          </Link>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

FeedDigest.fragments = fragments

export default FeedDigest
