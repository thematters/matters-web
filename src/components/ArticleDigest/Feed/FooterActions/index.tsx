import Link from 'next/link'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconBook2 from '@/public/static/icons/24px/book2.svg'
import IconPaywall from '@/public/static/icons/24px/paywall.svg'
import IconStar from '@/public/static/icons/24px/star.svg'
import { toPath } from '~/common/utils'
import {
  CircleDigest,
  Icon,
  LanguageContext,
  TextIcon,
  ViewerContext,
} from '~/components'
import { FooterActionsArticlePublicFragment } from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../../DropdownActions'
import DonationCount from './DonationCount'
import { fragments } from './gql'
import ReadTime from './ReadTime'
import styles from './styles.module.css'

export type FooterActionsControls = DropdownActionsControls

export type FooterActionsProps = {
  article: FooterActionsArticlePublicFragment
  label?: React.ReactNode
  hasReadTime?: boolean
  hasDonationCount?: boolean
  hasCircle?: boolean
  hasCampaign?: boolean
  hasCollection?: boolean
  tag?: React.ReactNode
  includesMetaData?: boolean
} & FooterActionsControls

const FooterActions = ({
  article,
  label,
  hasReadTime,
  hasDonationCount,
  hasCircle,
  hasCampaign = true,
  hasCollection = false,
  tag,
  includesMetaData = true,
  ...controls
}: FooterActionsProps) => {
  const {
    access: { circle },
  } = article
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { channelId, pinned, hasTogglePinChannelArticles } = controls
  const collection = article.collections.edges
    ?.map((edge) => edge.node)
    .reduce(
      (maxCollection, currentCollection) => {
        if (!maxCollection) return currentCollection
        return currentCollection.articles.totalCount >
          maxCollection.articles.totalCount
          ? currentCollection
          : maxCollection
      },
      null as (typeof article.collections.edges)[0]['node'] | null
    )

  return (
    <footer className={styles.footer}>
      <section className={styles.left}>
        {includesMetaData && (
          <>
            {label}

            {hasReadTime && <ReadTime article={article} />}

            {hasDonationCount && <DonationCount article={article} />}

            {tag}

            {hasCircle && circle && (
              <TextIcon
                icon={
                  article.access.type === 'paywall' ? (
                    <Icon icon={IconPaywall} color="grey" size={14} />
                  ) : null
                }
                placement="left"
                spacing={4}
              >
                <CircleDigest.Title
                  circle={circle}
                  is="span"
                  textSize={12}
                  textWeight="normal"
                />
              </TextIcon>
            )}

            {hasTogglePinChannelArticles && channelId && pinned && (
              <TextIcon
                icon={<Icon icon={IconStar} size={12} />}
                size={12}
                color="attention700"
              >
                <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
              </TextIcon>
            )}

            {hasCampaign && article.campaigns.length > 0 && (
              <Link
                {...toPath({
                  page: 'campaignDetail',
                  campaign: article.campaigns[0].campaign,
                })}
                className={styles.campaign}
              >
                {
                  article.campaigns[0].campaign[
                    lang === 'zh_hans'
                      ? 'nameZhHans'
                      : lang === 'zh_hant'
                        ? 'nameZhHant'
                        : 'nameEn'
                  ]
                }
              </Link>
            )}

            {hasCollection && collection && article.author.userName && (
              <Link
                {...toPath({
                  page: 'collectionDetail',
                  userName: article.author.userName,
                  collection,
                })}
                className={styles.collection}
              >
                <TextIcon
                  icon={<Icon icon={IconBook2} size={12} />}
                  size={12}
                  color="newPalettePrimary500"
                >
                  {collection.title}
                </TextIcon>
              </Link>
            )}
          </>
        )}
      </section>

      <section className={styles.right}>
        {viewer.isAuthed && (
          <DropdownActions
            article={article}
            {...controls}
            size={22}
            inCard={true}
          />
        )}
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
