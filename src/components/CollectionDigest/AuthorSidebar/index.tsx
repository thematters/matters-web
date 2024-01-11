import classNames from 'classnames'
import gql from 'graphql-tag'

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
    [styles.hasCover]: !!cover,
    [styles[`imageSize${capitalizeFirstLetter(imageSize)}`]]: !!cover,
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
        <LinkWrapper {...path}>{title}</LinkWrapper>
      </header>
      {cover && (
        <LinkWrapper {...path}>
          <aside className={styles.cover}>
            <ResponsiveImage
              url={cover}
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
                {totalCount}
              </TextIcon>
            </div>
          </aside>
        </LinkWrapper>
      )}
    </section>
  )
}

CollectionDigestAuthorSidebar.fragments = fragments
