import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CircleNewArticleNoticeFragment } from '~/gql/graphql'

import NoticeArticleCard from '../NoticeArticleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

const CircleNewArticle = ({
  notice,
}: {
  notice: CircleNewArticleNoticeFragment
}) => {
  const circle = notice.article.access.circle

  if (!circle) {
    return null
  }

  return (
    <section className="container" data-test-id={TEST_ID.CIRCLE_NEW_ARTICLE}>
      <section className="avatar-wrap">
        <NoticeTypeIcon type="circle" />
      </section>

      <section className="content-wrap">
        <NoticeHead
          subtitle={
            <FormattedMessage
              description="src/components/Notice/ArticleNotice/CircleNewArticle.tsx"
              defaultMessage="A new article has been added to the circle, read it now!"
            />
          }
        >
          <NoticeCircleName circle={circle} />
          <FormattedMessage
            defaultMessage=" is growing"
            description="src/components/Notice/ArticleNotice/CircleNewArticle.tsx"
          />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

CircleNewArticle.fragments = {
  notice: gql`
    fragment CircleNewArticleNotice on ArticleNotice {
      id
      ...NoticeDate
      article: target {
        ...NoticeArticleCard
        access {
          circle {
            id
            ...NoticeCircleName
          }
        }
      }
    }
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
    ${NoticeCircleName.fragments.circle}
  `,
}

export default CircleNewArticle
