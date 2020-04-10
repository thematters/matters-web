import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import jump from 'jump.js';
import _merge from 'lodash/merge';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';

import {
  BackToHomeButton,
  DateTime,
  Error,
  Head,
  Icon,
  Layout,
  Spinner,
  Throw404,
  Title,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components';
import { QueryError } from '~/components/GQL';
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference';
import { UserDigest } from '~/components/UserDigest';

import { getQuery } from '~/common/utils';

import Collection from './Collection';
import Content from './Content';
import RelatedArticles from './RelatedArticles';
import State from './State';
import styles from './styles.css';
import TagList from './TagList';
import Toolbar from './Toolbar';
import Wall from './Wall';

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference';
import { ArticleDetail as ArticleDetailType } from './__generated__/ArticleDetail';

const ARTICLE_DETAIL = gql`
  query ArticleDetail($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      title
      slug
      mediaHash
      state
      public
      live
      cover
      summary
      createdAt
      author {
        ...UserDigestRichUser
      }
      collection(input: { first: 0 }) @connection(key: "articleCollection") {
        totalCount
      }
      ...ContentArticle
      ...TagListArticle
      ...RelatedArticles
      ...StateArticle
    }
  }
  ${UserDigest.Rich.fragments.user}
  ${Content.fragments.article}
  ${TagList.fragments.article}
  ${RelatedArticles.fragments.article}
  ${State.fragments.article}
`;

const DynamicResponse = dynamic(() => import('./Responses'), {
  ssr: false,
  loading: Spinner,
});

const EmptyLayout: React.FC = ({ children }) => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.BackButton />} />
    {children}
  </Layout.Main>
);

const ArticleDetail = () => {
  const isLargeUp = useResponsive('lg-up');
  const router = useRouter();
  const mediaHash = getQuery({ router, key: 'mediaHash' });
  const viewer = useContext(ViewerContext);
  const [fixedWall, setFixedWall] = useState(false);
  const { data, loading, error } = useQuery<ArticleDetailType>(ARTICLE_DETAIL, {
    variables: { mediaHash },
  });

  const { data: clientPreferenceData } = useQuery<ClientPreference>(
    CLIENT_PREFERENCE,
    {
      variables: { id: 'local' },
    }
  );
  const { wall } = clientPreferenceData?.clientPreference || { wall: true };

  const shouldShowWall = !viewer.isAuthed && wall;
  const article = data?.article;
  const authorId = article && article.author.id;
  const collectionCount = (article && article.collection.totalCount) || 0;
  const canEditCollection = viewer.id === authorId;

  useEffect(() => {
    if (shouldShowWall && window.location.hash && article) {
      jump('#comments', { offset: -10 });
    }
  }, [article]);

  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    );
  }

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    );
  }

  if (!article) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    );
  }

  if (article.state !== 'active' && viewer.id !== authorId) {
    return (
      <EmptyLayout>
        <Error
          statusCode={404}
          message={
            article.state === 'archived' ? (
              <Translate
                zh_hant="吶，作者親手掩蓋了這篇作品的痕跡，看看別的吧"
                zh_hans="呐，作者亲手掩盖了这篇作品的痕迹，看看别的吧"
              />
            ) : article.state === 'banned' ? (
              <Translate
                zh_hant="該作品因違反社區約章，已被站方強制隱藏。"
                zh_hans="该作品因违反社区约章，已被站方强制隐藏。"
              />
            ) : null
          }
        >
          <BackToHomeButton />
        </Error>
      </EmptyLayout>
    );
  }

  return (
    <Layout.Main aside={<RelatedArticles article={article} inSidebar />}>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <UserDigest.Rich
            user={article.author}
            size="sm"
            spacing={[0, 0]}
            bgColor="none"
          />
        }
        marginBottom={0}
      />

      <Head
        title={article.title}
        description={article.summary}
        keywords={(article.tags || []).map(({ content }) => content)}
        image={article.cover}
      />

      <State article={article} />

      <section className="content">
        <TagList article={article} />

        <section className="title">
          <Title type="article">{article.title}</Title>

          <section className="subtitle">
            <DateTime date={article.createdAt} />
            <section className="right">{article.live && <Icon.Live />}</section>
          </section>
        </section>

        <Content article={article} />

        {(collectionCount > 0 || canEditCollection) && (
          <section className="block">
            <Collection
              article={article}
              canEdit={canEditCollection}
              collectionCount={collectionCount}
            />
          </section>
        )}

        <Waypoint
          onPositionChange={({ currentPosition }) => {
            if (shouldShowWall) {
              setFixedWall(currentPosition === 'inside');
            }
          }}
        />

        {!shouldShowWall && (
          <section className="block">
            <DynamicResponse />
          </section>
        )}

        {!isLargeUp && !shouldShowWall && <RelatedArticles article={article} />}
      </section>

      <Toolbar mediaHash={mediaHash} />

      {shouldShowWall && (
        <>
          <section id="comments" />
          <Wall show={fixedWall} />
        </>
      )}

      <style jsx>{styles}</style>
    </Layout.Main>
  );
};

export default ArticleDetail;
