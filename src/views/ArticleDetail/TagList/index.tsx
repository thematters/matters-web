import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Tag, TagExposureTracker } from '~/components'
import { TagListArticleFragment } from '~/gql/graphql'

import styles from './styles.css'

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

const TagList = ({ article }: { article: TagListArticleFragment }) => {
  if (!article || !article.tags || article.tags.length <= 0) {
    return null
  }

  return (
    <section className="tag-list" data-test-id={TEST_ID.ARTICLE_TAGS}>
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
