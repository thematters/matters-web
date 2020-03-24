import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import React from 'react'

import {
  ArticleDigestTitle,
  Card,
  Comment,
  Expandable,
  Translate,
  UserDigest
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import { FollowComment as FollowCommentType } from './__generated__/FollowComment'

interface FollowCommentProps {
  comment: FollowCommentType
  onClick?: () => any
}

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

const FollowComment: React.FC<FollowCommentProps> = ({ comment, onClick }) => {
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' }
  })
  const { viewMode } = data?.clientPreference || { viewMode: 'default' }
  const isDefaultMode = viewMode === 'default'

  const { article, author } = comment
  const articlePath = toPath({ page: 'articleDetail', article })
  const path =
    comment.state === 'active'
      ? toPath({
          page: 'commentDetail',
          comment
        })
      : {}

  let userDigestProps = {}
  if (isDefaultMode) {
    userDigestProps = {
      avatarSize: 'lg',
      textSize: 'md-s',
      textWeight: 'md'
    }
  } else {
    userDigestProps = {
      avatarSize: 'sm',
      textSize: 'sm'
    }
  }

  return (
    <Card {...articlePath} spacing={['base', 'base']} onClick={onClick}>
      <header>
        <section className="left">
          <UserDigest.Mini
            user={author}
            avatarSize="lg"
            textSize="md-s"
            textWeight="md"
            hasAvatar
            hasDisplayName
            {...userDigestProps}
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
          borderRadius="xtight"
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

/**
 * Memoizing
 */
type MemoedFollowCommentType = React.MemoExoticComponent<
  React.FC<FollowCommentProps>
> & {
  fragments: typeof fragments
}

const MemoedFollowComment = React.memo(
  FollowComment,
  ({ comment: prevComment }, { comment }) => {
    return (
      prevComment.upvotes === comment.upvotes &&
      prevComment.downvotes === comment.downvotes
    )
  }
) as MemoedFollowCommentType

MemoedFollowComment.fragments = fragments

export default MemoedFollowComment
