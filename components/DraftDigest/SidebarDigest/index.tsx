import { PureQueryOptions } from 'apollo-client'
import gql from 'graphql-tag'
import Link from 'next/link'

import { DateTime, Icon, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { toPath } from '~/common/utils'
import ICON_DOT_DIVIDER from '~/static/icons/dot-divider.svg?sprite'

import DeleteButton from '../Components/DeleteButton'
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

const SidebarDigest = ({
  draft,
  refetchQueries
}: {
  draft: SidebarDigest
  refetchQueries?: PureQueryOptions[]
}) => {
  const { id, title, publishState, createdAt, slug, wordCount } = draft
  const isUnpublished = publishState === 'unpublished'
  const path = toPath({
    page: 'draftDetail',
    slug,
    id
  })

  return (
    <section className="container">
      <div className="content">
        <Link {...path}>
          <a className="title">
            {title || (
              <Translate
                zh_hant={TEXT.zh_hant.untitle}
                zh_hans={TEXT.zh_hans.untitle}
              />
            )}
          </a>
        </Link>

        <div>
          <footer className="actions">
            <DateTime date={createdAt} type="relative" />
            <IconDotDivider />
            <Translate
              zh_hans={`${wordCount} 字`}
              zh_hant={`${wordCount} 字`}
            />
            {isUnpublished && (
              <>
                <IconDotDivider />
                <DeleteButton id={id} refetchQueries={refetchQueries} />
              </>
            )}
          </footer>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

SidebarDigest.fragments = fragments

export default SidebarDigest
