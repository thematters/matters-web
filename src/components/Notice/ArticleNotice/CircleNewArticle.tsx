import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeArticle from '../NoticeArticle'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { CircleNewArticleNotice as NoticeType } from './__generated__/CircleNewArticleNotice'

const CircleNewArticle = ({ notice }: { notice: NoticeType }) => {
  const circle = notice.article.circle

  if (!circle) {
    return null
  }

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="circle" />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeCircleName circle={circle} />{' '}
          <Translate zh_hant="又成長了" zh_hans="又成长了" />
        </NoticeHead>

        <NoticeArticle article={notice.article} isBlock />

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
        ...NoticeArticle
        circle {
          id
          ...NoticeCircleNameCircle
        }
      }
    }
    ${NoticeArticle.fragments.article}
    ${NoticeDate.fragments.notice}
    ${NoticeCircleName.fragments.circle}
  `,
}

export default CircleNewArticle
