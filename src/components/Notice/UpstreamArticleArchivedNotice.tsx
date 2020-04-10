import gql from 'graphql-tag';

import { Translate } from '~/components';

import NoticeArticle from './NoticeArticle';
import NoticeHead from './NoticeHead';
import NoticeTypeIcon from './NoticeTypeIcon';
import styles from './styles.css';

import { UpstreamArticleArchivedNotice as NoticeType } from './__generated__/UpstreamArticleArchivedNotice';

const UpstreamArticleArchivedNotice = ({ notice }: { notice: NoticeType }) => {
  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="logo" />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <Translate zh_hant="你的作品上游" zh_hans="你的作品上游" />{' '}
          <NoticeArticle article={notice.upstream} />{' '}
          <Translate zh_hant="已断开" zh_hans="已断开" />
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />
      </section>
      <style jsx>{styles}</style>
    </section>
  );
};

UpstreamArticleArchivedNotice.fragments = {
  notice: gql`
    fragment UpstreamArticleArchivedNotice on UpstreamArticleArchivedNotice {
      id
      unread
      __typename
      ...NoticeDate
      upstream {
        ...NoticeArticle
      }
      target {
        ...NoticeArticle
      }
    }
    ${NoticeArticle.fragments.article}
    ${NoticeHead.fragments.date}
  `,
};

export default UpstreamArticleArchivedNotice;
