import gql from 'graphql-tag'
import Link from 'next/link'

import { DateTime, Icon, Translate } from '~/components'

import { TEXT } from '~/common/enums'
import { numFormat, toPath } from '~/common/utils'

import DeleteButton from '../Components/DeleteButton'
import { SidebarDigestDraft } from './__generated__/SidebarDigestDraft'
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
      updatedAt
      publishState
    }
  `
}

const SidebarDigest = ({ draft }: { draft: SidebarDigestDraft }) => {
  const { id, title, publishState, updatedAt, slug, wordCount } = draft
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
            <DateTime date={updatedAt} type="relative" />
            <Icon.DotDivider />
            <Translate
              zh_hans={`${numFormat(wordCount)} 字`}
              zh_hant={`${numFormat(wordCount)} 字`}
            />
            {isUnpublished && (
              <>
                <Icon.DotDivider />
                <DeleteButton id={id} />
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
