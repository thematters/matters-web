import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import { ReactComponent as IconStar } from '@/public/static/icons/24px/star.svg'
import IMAGE_DEFAULT_CURATED from '@/public/static/images/default-curated.svg'
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
import FooterActions from './FooterActions'
import styles from './styles.module.css'
export type ArticleDigestCuratedProps = {
  article: ArticleDigestCuratedArticleFragment

  titleLineClamp?: 2 | 3

  channelId?: string
  pinned?: boolean

  onClick?: () => any
  onClickAuthor?: () => void
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

  return (
    <Card
      {...path}
      spacing={[0, 0]}
      bgColor="none"
      onClick={onClick}
      testId={TEST_ID.DIGEST_ARTICLE_CURATED}
      {...cardProps}
    >
      <section
        className={styles.cover}
        data-test-id={TEST_ID.DIGEST_ARTICLE_FEED_COVER}
      >
        <LinkWrapper {...path} onClick={onClick}>
          <Media lessThan="sm">
            <ResponsiveImage
              url={cover || IMAGE_DEFAULT_CURATED}
              width={334}
              height={167}
            />
          </Media>
          <Media greaterThanOrEqual="sm">
            <ResponsiveImage
              url={cover || IMAGE_DEFAULT_CURATED}
              width={404}
              height={404}
            />
          </Media>
        </LinkWrapper>
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
        hasTogglePinChannelArticles
      />
    </Card>
  )
}

ArticleDigestCurated.fragments = fragments
