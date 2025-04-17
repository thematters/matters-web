import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  ARTICLE_DIGEST_AUTHOR_SIDEBAR_ID_PREFIX,
  TEST_ID,
} from '~/common/enums'
import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { LinkWrapper, ResponsiveImage } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import {
  ArticleDigestAuthorSidebarArticleFragment,
  AssetType,
} from '~/gql/graphql'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

export type ArticleDigestAuthorSidebarProps = {
  article: ArticleDigestAuthorSidebarArticleFragment
  collectionId?: string
  titleTextSize?: ArticleDigestTitleTextSize
  titleColor?: 'greyDarker' | 'black'
  showCover?: boolean
  showAuthorInfo?: boolean
  imageSize?: 'sm' | 'md'
  clickEvent?: () => void
}

const fragments = {
  article: gql`
    fragment ArticleDigestAuthorSidebarArticle on Article {
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
    }
    ${UserDigest.Mini.fragments.user}
    ${ArticleDigestTitle.fragments.article}
  `,
}

export const ArticleDigestAuthorSidebar = ({
  article,
  collectionId,
  titleTextSize = 15,
  titleColor = 'greyDarker',
  imageSize = 'sm',
  showCover = true,
  showAuthorInfo = false,
  clickEvent,
}: ArticleDigestAuthorSidebarProps) => {
  const { articleState: state, author } = article
  const isBanned = state === 'banned'
  const assets = article.assets || []
  const embed = assets.find((asset) => asset.type === AssetType.Embed)
  const cover = !isBanned ? article.cover || embed?.path : null
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.hasCover]: showCover && !!cover,
    [styles[`imageSize${capitalizeFirstLetter(imageSize)}`]]: !!cover,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
    collectionId,
  })

  const headerClasses = classNames({
    [styles[`textColor${capitalizeFirstLetter(titleColor)}`]]: !!titleColor,
    [styles[`lineHeight${capitalizeFirstLetter(titleTextSize + '')}`]]:
      !!titleTextSize,
  })
  const imgSize = imageSize === 'sm' ? 44 : 64

  return (
    <section
      className={containerClasses}
      data-test-id={TEST_ID.DIGEST_ARTICLE_AUTHOR_SIDEBAR}
      id={`${ARTICLE_DIGEST_AUTHOR_SIDEBAR_ID_PREFIX}${article.id}`}
      onClick={clickEvent}
    >
      <section className={styles.left}>
        <header className={headerClasses}>
          <ArticleDigestTitle
            article={article}
            textSize={titleTextSize}
            collectionId={collectionId}
            textWeight="normal"
            is="h3"
          />
        </header>
        {showAuthorInfo && (
          <section>
            <UserDigest.Mini
              user={author}
              avatarSize={16}
              textSize={12}
              nameColor="grey"
              hasAvatar
              hasDisplayName
            />
          </section>
        )}
      </section>

      {showCover && cover && (
        <LinkWrapper {...path} disabled={isBanned}>
          <aside className={styles.cover}>
            <ResponsiveImage url={cover} width={imgSize} height={imgSize} />
          </aside>
        </LinkWrapper>
      )}
    </section>
  )
}

ArticleDigestAuthorSidebar.Placeholder = Placeholder
ArticleDigestAuthorSidebar.fragments = fragments
