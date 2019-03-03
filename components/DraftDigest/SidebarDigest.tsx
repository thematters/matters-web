import gql from 'graphql-tag'
import Link from 'next/link'

import { DateTime } from '~/components/DateTime'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Title } from '~/components/Title'

import { toPath } from '~/common/utils'
import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

import DeleteButton from './Components/DeleteButton'
import ErrorState from './Components/ErrorState'
import PendingState from './Components/PendingState'
import styles from './styles.css'

const fragments = {
  draft: gql`
    fragment SidebarDigestDraft on Draft {
      id
      title
      summary
      slug
      wordCount
      scheduledAt
      createdAt
      publishState
    }
  `
}

const IconDotDivider = () => (
  <Icon
    id={ICON_DOT_DIVIDER.id}
    viewBox={ICON_DOT_DIVIDER.viewBox}
    style={{ width: 18, height: 18 }}
  />
)

const SidebarDigest = ({ draft }: { draft: SidebarDigest }) => {
  const { id, title, publishState, createdAt, slug, wordCount } = draft
  const isPending = publishState === 'pending'
  const isError = publishState === 'error'
  const isUnpublished = publishState === 'unpublished'
  const path = toPath({
    page: 'draftDetail',
    slug,
    id
  })

  return (
    <section style={{ marginTop: 8, marginBottom: 8, display: 'flex' }}>
      {(isPending || isError) && (
        <div className="header">
          <span />
          {isPending && <PendingState draft={draft} />}
          {isError && <ErrorState />}
        </div>
      )}

      <div className="content">
        <Link {...path}>
          <a>
            <Title
              type="feed"
              is="span"
              style={{ fontSize: 14, fontWeight: 'normal' }}
            >
              {title}
            </Title>
          </a>
        </Link>

        <div>
          {isUnpublished && (
            <footer className="actions">
              <DateTime date={createdAt} type="relative" />
              <IconDotDivider />
              <Translate
                zh_hans={`${wordCount} 字`}
                zh_hant={`${wordCount} 字`}
              />
              <IconDotDivider />
              <DeleteButton id={id} />
            </footer>
          )}
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

SidebarDigest.fragments = fragments

export default SidebarDigest
