import gql from 'graphql-tag'

import IconMore from '@/public/static/icons/24px/more.svg'
import { TEST_ID } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  ArticleTag,
  Icon,
  TagExposureTracker,
  TagListDialog,
} from '~/components'
import { TagListArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  article: gql`
    fragment TagListArticle on Article {
      tags {
        ...DigestTag
      }
    }
    ${ArticleTag.fragments.tag}
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
            <ArticleTag
              tag={tag}
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'click_tag',
                  pageType: 'article_detail',
                })
              }}
              canClamp
            />
            <TagExposureTracker location={i} id={tag.id} />
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
