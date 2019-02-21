import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Tag } from '~/components'

import { TagListArticle } from './__generated__/TagListArticle'

const fragments = {
  article: gql`
    fragment TagListArticle on Article {
      tags {
        ...TagArticleDetail
      }
    }
    ${Tag.fragments.articleDetail}
  `
}

const TagList = ({ article }: { article: TagListArticle }) => {
  if (!article || !article.tags) {
    return null
  }

  return article.tags.map(tag => <Tag tag={tag} key={tag.id} />)
}

TagList.fragments = fragments

export default TagList
