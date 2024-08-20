import gql from 'graphql-tag'

import { UserDigest } from '~/components/UserDigest'

import { ArticleCommentContent } from '../Content'
import DropdownActions from '../DropdownActions'
import FooterActions from '../FooterActions'
import PinnedLabel from '../PinnedLabel'
import ReplyTo from '../ReplyTo'
import RoleLabel from '../RoleLabel'

export const fragments = {
  comment: {
    public: gql`
      fragment ArticleFeedCommentPublic on Comment {
        id
        type
        author {
          id
          ...UserDigestMiniUser
        }
        createdAt
        replyTo {
          id
          author {
            id
            ...ReplyToUser
          }
        }
        ...RoleLabelComment
        ...PinnedLabelComment
        ...ArticleCommentFooterActionsCommentPublic
        ...ArticleCommentDropdownActionsCommentPublic
        ...ArticleCommentContentCommentPublic
      }
      ${UserDigest.Mini.fragments.user}
      ${ReplyTo.fragments.user}
      ${RoleLabel.fragments.comment}
      ${PinnedLabel.fragments.comment}
      ${FooterActions.fragments.comment.public}
      ${DropdownActions.fragments.comment.public}
      ${ArticleCommentContent.fragments.comment.public}
    `,
    private: gql`
      fragment ArticleFeedCommentPrivate on Comment {
        id
        ...ArticleCommentFooterActionsCommentPrivate
        ...ArticleCommentDropdownActionsCommentPrivate
        ...ArticleCommentContentCommentPrivate
      }
      ${FooterActions.fragments.comment.private}
      ${DropdownActions.fragments.comment.private}
      ${ArticleCommentContent.fragments.comment.private}
    `,
  },
}

export const REFETCH_ARTICLE_COMMENT = gql`
  query RefetchArticleComment($id: ID!) {
    node(input: { id: $id }) {
      ... on Comment {
        id
        ...ArticleFeedCommentPublic
        ...ArticleFeedCommentPrivate
        comments(input: { sort: oldest, first: null }) {
          edges {
            cursor
            node {
              ...ArticleFeedCommentPublic
              ...ArticleFeedCommentPrivate
            }
          }
        }
      }
    }
  }
  ${fragments.comment.public}
  ${fragments.comment.private}
`
