import gql from 'graphql-tag'
import _get from 'lodash/get'

import MATButton from './MATButton'

import { ToolbarArticle } from './__generated__/ToolbarArticle'

const fragments = {
  article: gql`
    fragment ToolbarArticle on Article {
      ...MATArticle
    }
    ${MATButton.fragments.article}
  `
}

const Toolbar = ({
  article,
  placement
}: {
  article: ToolbarArticle
  placement: 'bottom' | 'left'
}) => {
  return <MATButton article={article} />
}

Toolbar.fragments = fragments

export default Toolbar
