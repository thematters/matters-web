import gql from 'graphql-tag';
import { Fragment } from 'react';

import { Translate } from '~/components';

import { numAbbr } from '~/common/utils';

import NoticeActorAvatar from './NoticeActorAvatar';
import NoticeActorName from './NoticeActorName';
import NoticeArticle from './NoticeArticle';
import NoticeHead from './NoticeHead';
import NoticeTypeIcon from './NoticeTypeIcon';
import styles from './styles.css';

import { ArticleNewAppreciationNotice as NoticeType } from './__generated__/ArticleNewAppreciationNotice';

const ArticleNewAppreciationNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actors) {
    return null;
  }

  const actorsCount = notice.actors.length;
  const isMultiActors = actorsCount > 1;

  return (
    <section className="container">
      <section className="avatar-wrap">
        {isMultiActors ? (
          <NoticeTypeIcon type="appreciate" hasSpacing />
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
          <Translate
            zh_hant="喜歡並讚賞了你的作品"
            zh_hans="喜欢并赞赏了你的作品"
          />
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />

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

ArticleNewAppreciationNotice.fragments = {
  notice: gql`
    fragment ArticleNewAppreciationNotice on ArticleNewAppreciationNotice {
      id
      unread
      __typename
      ...NoticeHead
      target {
        ...NoticeArticle
      }
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeHead.fragments.date}
  `,
};

export default ArticleNewAppreciationNotice;
