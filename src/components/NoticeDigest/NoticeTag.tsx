import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '~/common/utils'

import { NoticeTag as NoticeTagType } from './__generated__/NoticeTag'

const NoticeTag = ({ tag }: { tag: NoticeTagType | null }) => {
  if (!tag) {
    return null
  }

  const path = toPath({
    page: 'tagDetail',
    id: tag.id || ''
  })

  return (
    <Link {...path}>
      <a>{tag.content}</a>
    </Link>
  )
}

NoticeTag.fragments = {
  tag: gql`
    fragment NoticeTag on Tag {
      id
      content
    }
  `
}

export default NoticeTag
