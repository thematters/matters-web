import gql from 'graphql-tag'

import { toPath } from '~/common/utils'
import { LinkWrapper } from '~/components'
import { Tag } from '~/components/Tag'
import { NoticeTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const NoticeTag = ({ tag }: { tag: NoticeTagFragment | null }) => {
  if (!tag) {
    return null
  }

  const tagName = tag.content

  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  return (
    <LinkWrapper {...path}>
      <span className={styles.tagContent}>
        <span>#{tagName}</span>
      </span>
    </LinkWrapper>
  )
}

NoticeTag.fragments = {
  tag: gql`
    fragment NoticeTag on Tag {
      id
      ...DigestTag
    }
    ${Tag.fragments.tag}
  `,
}

export default NoticeTag
