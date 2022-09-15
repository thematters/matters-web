import gql from 'graphql-tag'

import { Tag, TagExposureTracker } from '~/components'

import { analytics } from '~/common/utils'

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
  `,
}

const TagList = ({ article }: { article: TagListArticle }) => {
  if (!article || !article.tags || article.tags.length <= 0) {
    return null
  }

  return (
    <section className="tag-list">
      <ul>
        {article.tags.map((tag, i) => (
          <li key={tag.id}>
            <Tag
              tag={tag}
              type="inline"
              active
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'click_tag',
                  pageType: 'article_detail',
                })
              }}
              canClamp
            />
            <TagExposureTracker location={i} id={tag.id} horizontal />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

TagList.fragments = fragments

export default TagList
