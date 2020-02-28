import gql from 'graphql-tag'
import Link from 'next/link'

import { DateTime, Translate } from '~/components'

import { toPath } from '~/common/utils'

import DeleteButton from '../Components/DeleteButton'
import styles from './styles.css'

import { DraftDigestSidebarDraft } from './__generated__/DraftDigestSidebarDraft'

const fragments = {
  draft: gql`
    fragment DraftDigestSidebarDraft on Draft {
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

const DraftDigestSidebar = ({ draft }: { draft: DraftDigestSidebarDraft }) => {
  const { id, title, publishState, updatedAt, slug } = draft
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
          <a className="title">{title || <Translate id="untitle" />}</a>
        </Link>

        <div>
          <footer className="actions">
            <DateTime date={updatedAt} type="relative" />

            {isUnpublished && <DeleteButton id={id} />}
          </footer>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

DraftDigestSidebar.fragments = fragments

export default DraftDigestSidebar
