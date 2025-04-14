import { useContext } from 'react'

import { analytics, toPath } from '~/common/utils'
import {
  BackToHomeMobileButton,
  Button,
  DotDivider,
  LanguageContext,
  Media,
  TextIcon,
} from '~/components'
import { HeaderArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type HeaderProps = {
  article: HeaderArticleFragment
}

const Header = ({ article }: HeaderProps) => {
  const campaign = article.campaigns[0]?.campaign
  const campaignStage = article.campaigns[0]?.stage
  const { lang } = useContext(LanguageContext)
  const isAnnouncement = article.campaigns[0]?.campaign?.announcements?.some(
    (announcement: { id: string }) => announcement.id === article.id
  )

  return (
    <section className={styles.header}>
      <Media at="sm" className={styles.mobileLogo}>
        <BackToHomeMobileButton />
      </Media>
      {campaign && (
        <section className={styles.campaign}>
          <Button
            href={
              toPath({
                page: 'campaignDetail',
                campaign,
                stage: campaignStage || undefined,
                announcement: isAnnouncement,
              }).href
            }
            onClick={() => {
              analytics.trackEvent('click_button', {
                type: 'campaign_detail_entrance',
                pageType: 'article_detail',
                pageComponent: 'article_meta',
              })
            }}
          >
            <TextIcon size={12} color="campaignBlue">
              <span>
                {
                  campaign[
                    lang === 'zh_hans'
                      ? 'nameZhHans'
                      : lang === 'zh_hant'
                        ? 'nameZhHant'
                        : 'nameEn'
                  ]
                }
              </span>
              {campaignStage && (
                <>
                  &nbsp;
                  <DotDivider />
                  &nbsp;
                  {
                    campaignStage[
                      lang === 'zh_hans'
                        ? 'nameZhHans'
                        : lang === 'zh_hant'
                          ? 'nameZhHant'
                          : 'nameEn'
                    ]
                  }
                </>
              )}
            </TextIcon>
          </Button>
        </section>
      )}
    </section>
  )
}

Header.fragments = fragments

export default Header
