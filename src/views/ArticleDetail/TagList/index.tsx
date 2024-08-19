import gql from 'graphql-tag'

import { ReactComponent as IconMore } from '@/public/static/icons/24px/more.svg'
import { TEST_ID } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Icon, Tag, TagExposureTracker, TagListDialog } from '~/components'
import { TagListArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

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
    <section className={styles.tagList} data-test-id={TEST_ID.ARTICLE_TAGS}>
      <ul className={styles.list}>
        {article.tags.slice(0, 3).map((tag, i) => (
          <li key={tag.id} className={styles.listItem}>
            <Tag
              tag={tag}
              type="article"
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'click_tag',
                  pageType: 'article_detail',
                })
              }}
              canClamp
              active
            />
            <TagExposureTracker location={i} id={tag.id} horizontal />
          </li>
        ))}
        {article.tags.length > 3 && (
          <TagListDialog tags={article.tags}>
            {({ openDialog }) => (
              <li
                key="more-tag"
                className={styles.moreTag}
                role="button"
                onClick={openDialog}
              >
                <Icon icon={IconMore} />
              </li>
            )}
          </TagListDialog>
        )}
      </ul>
    </section>
  )
}

TagList.fragments = fragments

export default TagList
