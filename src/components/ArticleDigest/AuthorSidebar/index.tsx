import classNames from 'classnames'
import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { LinkWrapper, ResponsiveImage } from '~/components'
import { ArticleDigestAuthorSidebarArticleFragment } from '~/gql/graphql'

import { ArticleDigestTitle, ArticleDigestTitleTextSize } from '../Title'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

export type ArticleDigestAuthorSidebarProps = {
  article: ArticleDigestAuthorSidebarArticleFragment
  collectionId?: string
  titleTextSize?: ArticleDigestTitleTextSize
  titleColor?: 'greyDarker' | 'black'
  imageSize?: 44 | 64
}

const fragments = {
  article: gql`
    fragment ArticleDigestAuthorSidebarArticle on Article {
      id
      articleState: state
      title
      slug
      mediaHash
      cover
      ...ArticleDigestTitleArticle
    }
    ${ArticleDigestTitle.fragments.article}
  `,
}

export const ArticleDigestAuthorSidebar = ({
  article,
  collectionId,

  titleTextSize = 'mdS',
  titleColor = 'greyDarker',
  imageSize = 44,
}: ArticleDigestAuthorSidebarProps) => {
  const { articleState: state } = article
  const isBanned = state === 'banned'
  const cover = !isBanned ? article.cover : null
  const containerClasses = classNames({
    [styles.container]: true,
    [styles.hasCover]: !!cover,
    [styles[`imageSize${imageSize}`]]: !!cover,
  })
  const path = toPath({
    page: 'articleDetail',
    article,
    collectionId,
  })

  const headerClasses = classNames({
    [styles[`textColor${capitalizeFirstLetter(titleColor)}`]]: !!titleColor,
    [styles[`lineHeight${capitalizeFirstLetter(titleTextSize)}`]]:
      !!titleTextSize,
  })

  return (
    <section
      className={containerClasses}
      data-test-id={TEST_ID.DIGEST_ARTICLE_AUTHOR_SIDEBAR}
    >
      <header className={headerClasses}>
        <ArticleDigestTitle
          article={article}
          textSize={titleTextSize}
          collectionId={collectionId}
          textWeight="normal"
          is="h3"
        />
      </header>

      {cover && (
        <LinkWrapper {...path} disabled={isBanned}>
          <aside className={styles.cover}>
            <ResponsiveImage
              url={cover}
              width={imageSize}
              height={imageSize}
              disableAnimation={true}
            />
          </aside>
        </LinkWrapper>
      )}
    </section>
  )
}

ArticleDigestAuthorSidebar.Placeholder = Placeholder
ArticleDigestAuthorSidebar.fragments = fragments
