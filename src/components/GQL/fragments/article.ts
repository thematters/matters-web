import gql from 'graphql-tag';

import { ArticleDigestDropdown, ArticleDigestSidebar } from '~/components';

export default {
  editorCollection: gql`
    fragment EditorCollection on Article {
      id
      collection(input: { first: null }) @connection(key: "editorCollection") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
    ${ArticleDigestDropdown.fragments.article}
  `,
  articleCollection: gql`
    fragment ArticleCollection on Article {
      id
      collection(input: { after: $after, first: $first })
        @connection(key: "articleCollection") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            ...ArticleDigestSidebarArticle
          }
        }
      }
    }
    ${ArticleDigestSidebar.fragments.article}
  `,
};
