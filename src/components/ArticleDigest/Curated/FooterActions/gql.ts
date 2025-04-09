import gql from 'graphql-tag'

import DropdownActions from '../../DropdownActions'

export const fragments = {
  article: gql`
    fragment CuratedFooterActionsArticle on Article {
      id
      ...DropdownActionsArticle
    }
    ${DropdownActions.fragments.article}
  `,
}