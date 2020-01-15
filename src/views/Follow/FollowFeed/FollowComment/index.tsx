import gql from 'graphql-tag'
import _get from 'lodash/get'
import Link from 'next/link'

import { Card, Comment, Translate, UserDigest } from '~/components'

import { toCommentPath, toPath } from '~/common/utils'

import styles from './styles.css'

import { FollowComment as FollowCommentType } from './__generated__/FollowComment'

const fragments = {
  comment: gql`
    fragment FollowComment on Comment {
      id
      author {
        id
        ...UserDigestMiniUser
      }
      article {
        id
        title
      }
      ...CreatedAtComment
      ...ContentComment
      ...FooterActionsComment
    }

    ${UserDigest.Mini.fragments.user}
    ${Comment.CreatedAt.fragments.comment}
    ${Comment.Content.fragments.comment}
    ${Comment.FooterActions.fragments.comment}
  `
}
const FollowComment = ({ comment }: { comment: FollowCommentType }) => {
  const { article, author } = comment

  const articlePath = toPath({
    page: 'articleDetail',
    userName: article.author.userName || '',
    slug: article.slug || '',
    mediaHash: article.mediaHash || ''
  })
  const commentPath = toCommentPath({ comment })

  return (
    <article>
      <header>
        <section className="left">
          <UserDigest.Mini
            user={author}
            avatarSize="sm"
            hasAvatar
            hasDisplayName
          />
          <span className="reply-to">
            <Translate zh_hant="評論了作品" zh_hans="评论了作品" />
          </span>
        </section>

        <Comment.CreatedAt comment={comment} />
      </header>

      <section className="article-title">
        <Link {...articlePath}>
          <a>{article.title}</a>
        </Link>
      </section>

      <section className="comment-content">
        <Card
          {...commentPath}
          bgColor="grey-lighter"
          spacing={['xtight', 'base']}
          textSize="md-s"
        >
          <Comment.Content comment={comment} />
        </Card>
      </section>

      <Comment.FooterActions comment={comment} />

      <style jsx>{styles}</style>
    </article>
  )
}

FollowComment.fragments = fragments

export default FollowComment
