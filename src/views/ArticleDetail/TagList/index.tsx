import gql from 'graphql-tag'

import { Tag } from '~/components'

import styles from './styles.css'

import { TagListArticle } from './__generated__/TagListArticle'

const fragments = {
  article: gql`
    fragment TagListArticle on Article {
      tags {
        ...DigestTag
      }
    }
    ${Tag.fragments.tag}
  `
}

const TagList = ({ article }: { article: TagListArticle }) => {
  if (!article || !article.tags) {
    return null
  }

  return (
    <section className="tag-list">
      {article.tags.map(tag => (
        <Tag tag={tag} key={tag.id} size="sm" />
      ))}
      <style jsx>{styles}</style>
    </section>
  )
}

TagList.fragments = fragments

export default TagList
