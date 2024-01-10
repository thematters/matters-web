import classNames from 'classnames'
import gql from 'graphql-tag'

import { toPath } from '~/common/utils'
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
  imageSize?: 64
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
  imageSize = 64,
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
    [styles[`imageSize${imageSize}`]]: !!cover,
  })

  const path = toPath({
    page: 'collectionDetail',
    collection,
    userName: userName || '',
  })

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
              width={64}
              height={64}
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
