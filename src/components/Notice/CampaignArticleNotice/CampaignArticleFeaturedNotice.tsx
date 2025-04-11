import gql from 'graphql-tag'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { CampaignArticleFeaturedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import styles from '../styles.module.css'

const CampaignArticleFeaturedNotice = ({
  notice,
}: {
  notice: CampaignArticleFeaturedNoticeFragment
}) => {
  const campaignPath = toPath({
    page: 'campaignDetail',
    campaign: {
      id: notice.campaign.id,
      shortHash: notice.campaign.shortHash,
    },
    featured: true,
  })

  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.NOTICE_CAMPAIGN_ARTICLE_FEATURED}
    >
      <section className={styles.noticeActorsNameAndTitleInfo}>
        <Link {...campaignPath}>
          <a>
            <FormattedMessage
              defaultMessage="Your article {articleTitle} has been listed as a feature of event in 7 days. Come and view more wonderful articles!"
              id="b0RNGM"
              description="src/components/Notice/CampaignArticleNotice/CampaignArticleFeaturedNotice.tsx"
              values={{
                articleTitle: (
                  <NoticeArticleTitle article={notice.article} disabled />
                ),
              }}
            />
          </a>
        </Link>
      </section>

      <section className={styles.footer}>
        <NoticeDate notice={notice} />
      </section>
    </section>
  )
}

CampaignArticleFeaturedNotice.fragments = {
  notice: gql`
    fragment CampaignArticleFeaturedNotice on CampaignArticleNotice {
      id
      unread
      __typename
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      campaign: target {
        id
        shortHash
      }
      article {
        ...NoticeArticleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default CampaignArticleFeaturedNotice
