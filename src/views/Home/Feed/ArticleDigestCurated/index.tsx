import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import IconEditorPin from '@/public/static/icons/24px/editor-pin.svg'
import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  ArticleDigestTitle,
  Card,
  CardProps,
  Icon,
  Media,
  ResponsiveImage,
  Tooltip,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleDigestCuratedArticleFragment } from '~/gql/graphql'

import CoverIcon from './CoverIcon'
import FooterActions from './FooterActions'
import Placeholder from './Placeholder'
import styles from './styles.module.css'
export type ArticleDigestCuratedProps = {
  article: ArticleDigestCuratedArticleFragment

  titleLineClamp?: 2 | 3

  channelId?: string
  pinned?: boolean

  onClick?: () => void
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
      displayCover
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
  const cover = !isBanned ? article.displayCover : null
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
      <Link {...path} onClick={onClick}>
        <div
          className={coverClasses}
          data-test-id={TEST_ID.DIGEST_ARTICLE_FEED_COVER}
        >
          {cover && <ResponsiveImage url={cover} width={384} />}

          {!cover && (
            <>
              <Media lessThan="sm">
                <CoverIcon shortHash={article.shortHash} size="sm" />
              </Media>
              <Media greaterThanOrEqual="sm">
                <CoverIcon shortHash={article.shortHash} size="lg" />
              </Media>
            </>
          )}

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
                <Icon
                  icon={IconEditorPin}
                  size={35}
                  color="newPaletteSecondary700"
                />
              </div>
            </Tooltip>
          )}
        </div>
      </Link>

      <section className={styles.author}>
        <UserDigest.Mini
          user={article.author}
          avatarSize={20}
          textSize={13}
          spacing={6}
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
        hasBookmark={false}
      />
    </Card>
  )
}

ArticleDigestCurated.Placeholder = Placeholder

ArticleDigestCurated.fragments = fragments
