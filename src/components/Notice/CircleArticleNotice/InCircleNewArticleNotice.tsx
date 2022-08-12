import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTypeIcon from '../NoticeTypeIcon'
import styles from '../styles.css'

import { InCircleNewArticleNotice as NoticeType } from './__generated__/InCircleNewArticleNotice'

const InCircleNewArticleNotice = ({ notice }: { notice: NoticeType }) => {

  const circle = notice.circle
  const article = notice.collection
  const isMember = notice.circle.isMember
  const isPublic = notice.collection.access.articleAccessType === 'public'

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="circle" />
      </section>

      <section className="content-wrap">
        <NoticeHead
          subtitle={
            !isMember && !isPublic ?
              <Translate
                zh_hant="新作加入圍爐，馬上訂閱即可免費閱讀。"
                zh_hans="新作加入围炉，马上订阅即可免费阅读。"
              /> :
              <Translate
                zh_hant="新作加入圍爐，現在就前往閱讀吧！"
                zh_hans="新作加入围炉，现在就前往阅读吧！"
              />
          }
        >
          <NoticeCircleName circle={circle} />
          <Translate zh_hant=" 又成長了" zh_hans=" 又成长了" />
        </NoticeHead>

        <NoticeArticleCard article={article} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}
InCircleNewArticleNotice.fragments = {
  notice: gql`
    fragment InCircleNewArticleNotice on CircleArticleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      circle: target {
        isMember
        ...NoticeCircleCard
      }
      collection: article {
        access {
          articleAccessType: type
        }
        ...NoticeArticleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default InCircleNewArticleNotice
