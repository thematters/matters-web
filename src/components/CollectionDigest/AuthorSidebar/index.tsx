import classNames from 'classnames'
import gql from 'graphql-tag'

import BOOK_COVER from '@/public/static/images/book-cover.png'
import { capitalizeFirstLetter, toPath } from '~/common/utils'
import {
  IconDraft24,
  LinkWrapper,
  ResponsiveImage,
  TextIcon,
} from '~/components'
import { CollectionDigestAuthorSidebarCollectionFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type CollectionDigestAuthorSidebarProps = {
  collection: CollectionDigestAuthorSidebarCollectionFragment
  imageSize?: 'md'
}

const fragments = {
  collection: gql`
    fragment CollectionDigestAuthorSidebarCollection on Collection {
      id
      title
      cover
      author {
        id
        userName
      }
      articles(input: { first: 0 }) {
        totalCount
      }
    }
  `,
}

export const CollectionDigestAuthorSidebar = ({
  collection,
  imageSize = 'md',
}: CollectionDigestAuthorSidebarProps) => {
  const {
    title,
    cover,
    author: { userName },
    articles: { totalCount },
  } = collection

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.hasCover]: true,
    [styles[`imageSize${capitalizeFirstLetter(imageSize)}`]]: true,
  })

  const path = toPath({
    page: 'collectionDetail',
    collection,
    userName: userName || '',
  })

  const imgSize = 64

  return (
    <section className={containerClasses}>
      <header>
        <LinkWrapper {...path} textActiveColor="green">
          {title}
        </LinkWrapper>
      </header>
      <LinkWrapper {...path}>
        <aside className={styles.cover}>
          <ResponsiveImage
            url={cover || BOOK_COVER.src}
            width={imgSize}
            height={imgSize}
            disableAnimation={true}
          />
          <div className={styles.count}>
            <TextIcon
              icon={<IconDraft24 size="xs" />}
              size="xs"
              spacing="xxtight"
              color="white"
            >
              {totalCount > 0 ? totalCount : '0'}
            </TextIcon>
          </div>
        </aside>
      </LinkWrapper>
    </section>
  )
}

CollectionDigestAuthorSidebar.fragments = fragments
