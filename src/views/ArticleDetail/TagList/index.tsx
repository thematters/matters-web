import gql from 'graphql-tag'

import { Tag } from '~/components'

import styles from './styles.css'

import { TagListArticle } from './__generated__/TagListArticle'

const fragments = {
  article: gql`
    fragment TagListArticle on Article {
      tags {
        ...DigestTag
        selected(input: { mediaHash: $mediaHash })
      }
    }
    ${Tag.fragments.tag}
  `
}

const TagList = ({ article }: { article: TagListArticle }) => {
  if (!article || !article.tags || article.tags.length <= 0) {
    return null
  }

  return (
    <section className="tag-list">
      <ul>
        {article.tags.map(tag => (
          <li key={tag.id}>
            <Tag tag={tag} type="inline" active={tag.selected} />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

TagList.fragments = fragments

export default TagList
