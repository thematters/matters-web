import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CommentNewReplyNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeCircleName from '../NoticeCircleName'
import NoticeComment from '../NoticeComment'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

const CommentNewReplyNotice = ({
  notice,
}: {
  notice: CommentNewReplyNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  const replyCommentArticle =
    notice.reply?.node.__typename === 'Article' ? notice.reply.node : null
  const replyCommentCircle =
    notice.reply?.node.__typename === 'Circle' ? notice.reply.node : null

  return (
    <>
      {replyCommentArticle && (
        <NoticeDigest
          notice={notice}
          action={
            <FormattedMessage
              defaultMessage="replied your comment in"
              description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
            />
          }
          title={<NoticeArticleTitle article={replyCommentArticle} />}
          secondAction={
            <FormattedMessage
              defaultMessage="comment"
              description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
            />
          }
          content={
            <NoticeComment
              comment={isMultiActors ? notice.comment : notice.reply}
            />
          }
          testId={TEST_ID.COMMENT_NEW_REPLY}
        />
      )}
      {replyCommentCircle && (
        <NoticeDigest
          notice={notice}
          action={
            <FormattedMessage
              defaultMessage=" replied to your discussion on"
              description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
            />
          }
          title={<NoticeArticleTitle article={replyCommentArticle} />}
          secondAction={
            <FormattedMessage
              defaultMessage="comment_circle"
              description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
            />
          }
          content={
            <NoticeComment
              comment={isMultiActors ? notice.comment : notice.reply}
            />
          }
          testId={TEST_ID.COMMENT_NEW_REPLY}
        />
      )}
    </>
  )

  // return (
  //   <section className="container" data-test-id={TEST_ID.COMMENT_NEW_REPLY}>
  //     <section className="avatar-wrap">
  //       {isMultiActors ? (
  //         <NoticeTypeIcon type="comment" />
  //       ) : (
  //         <NoticeActorAvatar user={notice.actors[0]} />
  //       )}
  //     </section>

  //     <section className="content-wrap">
  //       <NoticeHead>
  //         <NoticeHeadActors actors={notice.actors} />

  //         {replyCommentArticle && (
  //           <>
  //             <FormattedMessage
  //               defaultMessage=" replied to your comment on "
  //               description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
  //             />
  //             <NoticeArticleTitle article={replyCommentArticle} />
  //             <FormattedMessage
  //               defaultMessage="comment"
  //               description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
  //             />
  //           </>
  //         )}
  //         {replyCommentCircle && (
  //           <>
  //             <FormattedMessage
  //               defaultMessage=" replied to your discussion on"
  //               description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
  //             />
  //             <NoticeCircleName circle={replyCommentCircle} />
  //             <FormattedMessage
  //               defaultMessage="comment_circle"
  //               description="src/components/Notice/CommentCommentNotice/CommentNewReplyNotice.tsx"
  //             />
  //           </>
  //         )}
  //       </NoticeHead>

  // <NoticeComment
  //   comment={isMultiActors ? notice.comment : notice.reply}
  // />

  //       {isMultiActors && (
  //         <section className="multi-actor-avatars">
  //           {notice.actors.map((actor, index) => (
  //             <NoticeActorAvatar key={index} user={actor} size="md" />
  //           ))}
  //         </section>
  //       )}

  //       <NoticeDate notice={notice} />
  //     </section>

  //     <style jsx>{styles}</style>
  //   </section>
  // )
}
CommentNewReplyNotice.fragments = {
  notice: gql`
    fragment CommentNewReplyNotice on CommentCommentNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      comment: target {
        ...NoticeComment
      }
      reply: comment {
        ...NoticeComment
        node {
          ... on Article {
            ...NoticeArticleTitle
          }
          ... on Circle {
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeCircleName.fragments.circle}
    ${NoticeComment.fragments.comment}
    ${NoticeDate.fragments.notice}
  `,
}

export default CommentNewReplyNotice
