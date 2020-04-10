import gql from 'graphql-tag';
import { Fragment } from 'react';

import { Translate } from '~/components';

import { numAbbr } from '~/common/utils';

import NoticeActorAvatar from './NoticeActorAvatar';
import NoticeActorName from './NoticeActorName';
import NoticeArticle from './NoticeArticle';
import NoticeComment from './NoticeComment';
import NoticeHead from './NoticeHead';
import NoticeTypeIcon from './NoticeTypeIcon';
import styles from './styles.css';

import { CommentNewReplyNotice as NoticeType } from './__generated__/CommentNewReplyNotice';

const CommentNewReplyNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actors) {
    return null;
  }

  const actorsCount = notice.actors.length;
  const isMultiActors = actorsCount > 1;

  return (
    <section className="container">
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="comment" hasSpacing />
        ) : (
          <NoticeActorAvatar user={notice.actors[0]} />
        )}
      </section>

      <section className="content-wrap">
        <NoticeHead hasDate={!isMultiActors} notice={notice}>
          {notice.actors.slice(0, 2).map((actor, index) => (
            <Fragment key={index}>
              <NoticeActorName user={actor} />
              {isMultiActors && index < 1 && <span>、</span>}
            </Fragment>
          ))}{' '}
          {isMultiActors && (
            <Translate
              zh_hant={`等 ${numAbbr(actorsCount)} 人`}
              zh_hans={`等 ${numAbbr(actorsCount)} 人`}
            />
          )}
          <Translate zh_hant="回覆了你的評論" zh_hans="回复了你的评论" />
        </NoticeHead>

        <NoticeArticle article={notice?.reply?.article || null} isBlock />

        <NoticeComment comment={isMultiActors ? notice.target : notice.reply} />

        {isMultiActors && (
          <section className="multi-actor-avatars">
            {notice.actors.map((actor, index) => (
              <NoticeActorAvatar key={index} user={actor} />
            ))}
          </section>
        )}
      </section>

      <style jsx>{styles}</style>
    </section>
  );
};
CommentNewReplyNotice.fragments = {
  notice: gql`
    fragment CommentNewReplyNotice on CommentNewReplyNotice {
      id
      unread
      __typename
      ...NoticeHead
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeComment
      }
      reply {
        ...NoticeComment
        article {
          ...NoticeArticle
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeComment.fragments.comment}
    ${NoticeHead.fragments.date}
  `,
};

export default CommentNewReplyNotice;
