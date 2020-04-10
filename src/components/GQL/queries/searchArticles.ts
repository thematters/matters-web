import gql from 'graphql-tag';

import { ArticleDigestDropdown } from '~/components';

export default gql`
  query SearchArticles($search: String!) {
    search(input: { key: $search, type: Article, first: 5 }) {
      edges {
        node {
          ... on Article {
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`;
