import gql from 'graphql-tag'
import Link from 'next/link'

import contentCommentStyles from '~/common/styles/utils/content.comment.css'
import { toPath } from '~/common/utils'

import { NoticeComment as NoticeCommentType } from './__generated__/NoticeComment'

const NoticeComment = ({ comment }: { comment: NoticeCommentType | null }) => {
  if (!comment) {
    return null
  }

  const path = toPath({
    page: 'articleDetail',
    userName: comment.article.author.userName || '',
    slug: comment.article.slug || '',
    mediaHash: comment.article.mediaHash || ''
  })

  return (
    <>
      <Link {...path}>
        <a>
          <div
            className="u-content-comment"
            dangerouslySetInnerHTML={{
              __html: comment.content || ''
            }}
          />
        </a>
      </Link>
      <style jsx>{contentCommentStyles}</style>
    </>
  )
}

NoticeComment.fragments = {
  comment: gql`
    fragment NoticeComment on Comment {
      id
      content
      article {
        id
        title
        slug
        mediaHash
        author {
          id
          userName
        }
      }
    }
  `
}

export default NoticeComment
