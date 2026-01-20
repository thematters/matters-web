import classNames from 'classnames'
import gql from 'graphql-tag'

import IconDraft from '@/public/static/icons/24px/draft.svg'
import { toPath } from '~/common/utils'
import { Card, Icon } from '~/components'
import { ArticleDigestNoticeArticleFragment } from '~/gql/graphql'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import styles from './styles.module.css'

export type ArticleDigestNoticeCardProps = {
  article: ArticleDigestNoticeArticleFragment
  titleTextSize?: ArticleDigestTitleTextSize
  color?: string
  hasIcon?: boolean
  hasBorder?: boolean
}

const fragments = {
  article: gql`
    fragment ArticleDigestNoticeCardArticle on Article {
      id
      summary
      ...ArticleDigestTitleArticle
    }
    ${ArticleDigestTitle.fragments.article}
  `,
}

export const ArticleDigestNoticeCard = ({
  article,
  titleTextSize = 14,
  color = 'grey',
  hasIcon = true,
  hasBorder = false,
}: ArticleDigestNoticeCardProps) => {
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.black]: color === 'black',
    [styles.border]: hasBorder,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  return (
    <Card {...path} spacing={[0, 0]} bgColor="none">
      <section className={containerClasses}>
        {hasIcon && <Icon icon={IconDraft} size={16} />}
        <ArticleDigestTitle
          article={article}
          textSize={titleTextSize}
          textWeight="normal"
          is="h3"
          lineClamp={1}
        />
      </section>
    </Card>
  )
}

ArticleDigestNoticeCard.fragments = fragments
