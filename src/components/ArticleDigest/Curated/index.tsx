import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import { ReactComponent as IconStar } from '@/public/static/icons/24px/star.svg'
import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  Card,
  CardProps,
  Icon,
  LinkWrapper,
  Media,
  ResponsiveImage,
  Tooltip,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleDigestCuratedArticleFragment, AssetType } from '~/gql/graphql'

import { ArticleDigestTitle } from '../Title'
import CoverIcon from './CoverIcon'
import FooterActions from './FooterActions'
import styles from './styles.module.css'
export type ArticleDigestCuratedProps = {
  article: ArticleDigestCuratedArticleFragment

  titleLineClamp?: 2 | 3

  channelId?: string
  pinned?: boolean

  onClick?: () => any
  onClickAuthor?: () => void
  hue?: number
} & CardProps

const fragments = {
  article: gql`
    fragment ArticleDigestCuratedArticle on Article {
      id
      articleState: state
      title
      slug
      shortHash
      cover
      assets {
        id
        type
        path
      }
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      ...ArticleDigestTitleArticle
      ...CuratedFooterActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
    ${FooterActions.fragments.article}
  `,
}

export const ArticleDigestCurated = ({
  article,
  pinned,
  titleLineClamp,
  channelId,
  onClick,
  onClickAuthor,
  hue,
  ...cardProps
}: ArticleDigestCuratedProps) => {
  const intl = useIntl()
  const isBanned = article.articleState === 'banned'
  const assets = article.assets || []
  const embed = assets.find((asset) => asset.type === AssetType.Embed)
  const cover = !isBanned ? article.cover || embed?.path : null
  const path = toPath({
    page: 'articleDetail',
    article,
  })

  const hasCover = !!cover
  const coverClasses = classNames(styles.cover, {
    [styles.hasCover]: hasCover,
  })

  return (
    <Card
      {...path}
      spacing={[0, 0]}
      bgColor="none"
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_CURATED}
      {...cardProps}
    >
      <LinkWrapper {...path} onClick={onClick}>
        <section
          className={coverClasses}
          data-test-id={TEST_ID.DIGEST_ARTICLE_FEED_COVER}
        >
          <Media lessThan="sm">
            {cover && <ResponsiveImage url={cover} width={334} height={167} />}
            {!cover && (
              <CoverIcon
                title={article.title}
                shortHash={article.shortHash}
                size="sm"
                hue={hue}
              />
            )}
          </Media>
          <Media greaterThanOrEqual="sm">
            {cover && <ResponsiveImage url={cover} width={404} height={404} />}
            {!cover && (
              <CoverIcon
                title={article.title}
                shortHash={article.shortHash}
                size="lg"
                hue={hue}
              />
            )}
          </Media>

          {pinned && (
            <Tooltip
              content={intl.formatMessage({
                id: 'xEJN39',
                defaultMessage: 'Featured',
                description: 'Channel feed featured article',
              })}
              placement="bottom"
            >
              <div className={styles.pinned}>
                <Icon icon={IconStar} size={20} color="white" />
              </div>
            </Tooltip>
          )}
        </section>
      </LinkWrapper>

      <Link href={path.href}>
        <section className={styles.author}>
          <UserDigest.Mini
            user={article.author}
            avatarSize={20}
            textSize={13}
            nameColor="black"
            spacing={4}
            hasAvatar
            hasDisplayName
            onClick={onClickAuthor}
          />
        </section>
      </Link>

      <section className={styles.title}>
        <ArticleDigestTitle
          article={article}
          textSize={16}
          lineClamp={titleLineClamp}
        />
      </section>

      <FooterActions
        article={article}
        channelId={channelId}
        pinned={pinned}
        hasBookmark={false}
        hasTogglePinChannelArticles
      />
    </Card>
  )
}

ArticleDigestCurated.fragments = fragments
