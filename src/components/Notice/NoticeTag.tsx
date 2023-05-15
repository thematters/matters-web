import gql from 'graphql-tag'

import { toPath } from '@/src/common/utils'
import { LinkWrapper } from '~/components'
import { Tag } from '~/components/Tag'
import { NoticeTagFragment } from '~/gql/graphql'

import styles from './styles.css'

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
      <span className="tag-content">
        {/* <Tag tag={tag} type="notice" active hasCount={false} hasSpace={false} />
         */}
        <span>#{tagName}</span>

        <style jsx>{styles}</style>
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
