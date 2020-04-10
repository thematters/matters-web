import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Spinner } from '~/components';
import { QueryError } from '~/components/GQL';

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums';
import { analytics } from '~/common/utils';

import SectionHeader from '../../SectionHeader';
import TopicSidebarArticleDigest from './TopicSidebarArticleDigest';

import { SidebarTopics } from './__generated__/SidebarTopics';

export const SIDEBAR_TOPICS = gql`
  query SidebarTopics {
    viewer {
      id
      recommendation {
        topics(input: { first: 5 }) {
          edges {
            cursor
            node {
              ...TopicSidebarArticleDigestArticle
            }
          }
        }
      }
    }
  }
  ${TopicSidebarArticleDigest.fragments.article}
`;

const Topics = () => {
  const { data, loading, error } = useQuery<SidebarTopics>(SIDEBAR_TOPICS);
  const edges = data?.viewer?.recommendation.topics.edges;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <QueryError error={error} />;
  }

  if (!edges || edges.length <= 0) {
    return null;
  }

  return (
    <section>
      <SectionHeader type="topics" />

      <ol>
        {edges
          .filter(({ node }) => !!node.mediaHash)
          .map(({ node, cursor }, i) => (
            <li
              key={cursor}
              onClick={() =>
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                  type: FEED_TYPE.TOPICS,
                  location: i,
                })
              }
            >
              <TopicSidebarArticleDigest article={node} />
            </li>
          ))}
      </ol>
    </section>
  );
};

export default Topics;
