import gql from 'graphql-tag'
import _get from 'lodash/get'

import {
  ArticleDigestTitle,
  Card,
  Comment,
  Expandable,
  Translate,
  UserDigest
} from '~/components'

import { toPath } from '~/common/utils'

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
        ...ArticleDigestTitleArticle
      }
      ...CreatedAtComment
      ...ContentComment
      ...FooterActionsComment
    }

    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
    ${Comment.CreatedAt.fragments.comment}
    ${Comment.Content.fragments.comment}
    ${Comment.FooterActions.fragments.comment}
  `
}
const FollowComment = ({
  comment,
  onClick
}: {
  comment: FollowCommentType
  onClick?: () => any
}) => {
  const { article, author } = comment
  const articlePath = toPath({ page: 'articleDetail', article })
  const path =
    comment.state === 'active'
      ? toPath({
          page: 'commentDetail',
          comment
        })
      : {}

  return (
    <Card
      {...articlePath}
      spacing={['base', 'base']}
      bgActiveColor="green-lighter"
      onClick={onClick}
    >
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
        <ArticleDigestTitle article={article} />
      </section>

      <section className="comment-content">
        <Card
          {...path}
          bgColor="grey-lighter"
          spacing={['xtight', 'base']}
          borderRadius="xxtight"
        >
          <Expandable limit={5} buffer={2}>
            <Comment.Content comment={comment} size="md-s" />
          </Expandable>
        </Card>
      </section>

      <Comment.FooterActions comment={comment} inCard />

      <style jsx>{styles}</style>
    </Card>
  )
}

FollowComment.fragments = fragments

export default FollowComment
