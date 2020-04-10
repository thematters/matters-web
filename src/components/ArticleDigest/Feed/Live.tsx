import gql from 'graphql-tag';

import { Icon } from '~/components';

import { LiveArticle } from './__generated__/LiveArticle';

const fragments = {
  article: gql`
    fragment LiveArticle on Article {
      id
      live
    }
  `,
};

const Live = ({ article }: { article: LiveArticle }) => {
  if (!article.live) {
    return null;
  }

  return <Icon.Live />;
};

Live.fragments = fragments;

export default Live;
