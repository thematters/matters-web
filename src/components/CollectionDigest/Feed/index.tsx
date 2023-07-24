import React from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { stripHtml, toPath } from '~/common/utils'
import {
  Book,
  DateTime,
  IconDotDivider,
  LinkWrapper,
  Media,
} from '~/components'
import { CollectionDigestFeedCollectionFragment } from '~/gql/graphql'

import DropdownActions from '../DropdownActions'
import { fragments } from './gql'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

export type CollectionDigestFeedControls = {
  onClick?: () => any
}

export type CollectionDigestFeedProps = {
  collection: CollectionDigestFeedCollectionFragment
} & CollectionDigestFeedControls

const BaseCollectionDigestFeed = ({
  collection,
  onClick,
}: CollectionDigestFeedProps & { Placeholder: typeof Placeholder }) => {
  const { title, description, cover, author, updatedAt, articles } = collection
  const cleanedDescription = stripHtml(description || '')

  const path = toPath({
    page: 'collectionDetail',
    userName: author.userName!,
    collection,
  })
  const articleCount = articles.totalCount

  return (
    <section
      className={styles.wrapper}
      data-test-id={TEST_ID.DIGEST_COLLECTION_FEED}
    >
      <section className={styles.container}>
        <LinkWrapper {...path}>
          <section className={styles.book} onClick={onClick}>
            <Book cover={cover} title={title} articleCount={articleCount} />
          </section>
        </LinkWrapper>

        <section className={styles.content}>
          <header className={styles.header}>
            <LinkWrapper {...path}>
              <h2 className={styles.title}>{title}</h2>
            </LinkWrapper>
          </header>

          <Media at="sm">
            <p className={styles.articleCount}>
              <FormattedMessage
                defaultMessage="{articleCount} articles"
                description="src/components/CollectionDigest/Feed/index.tsx"
                values={{ articleCount }}
              />
            </p>
          </Media>

          {cleanedDescription && (
            <LinkWrapper {...path}>
              <p className={styles.description} onClick={onClick}>
                {cleanedDescription}
              </p>
            </LinkWrapper>
          )}

          <footer className={styles.footer}>
            <section className={styles.left}>
              <span className={styles.articleCount}>
                <FormattedMessage
                  defaultMessage="{articleCount} articles"
                  description="src/components/CollectionDigest/Feed/index.tsx"
                  values={{ articleCount }}
                />
              </span>

              <span className={styles.iconDivider}>
                <IconDotDivider size="mdS" />
              </span>

              <span>
                <FormattedMessage
                  defaultMessage="upadted {date}"
                  description="src/components/CollectionDigest/Feed/index.tsx"
                  values={{
                    date: <DateTime date={updatedAt} color="grey" />,
                  }}
                />
              </span>
            </section>

            <section className={styles.right}>
              <DropdownActions collection={collection} />
            </section>
          </footer>
        </section>
      </section>
    </section>
  )
}

/**
 * Memoizing
 */
type MemoizedCollectionDigestFeed = React.MemoExoticComponent<
  React.FC<CollectionDigestFeedProps>
> & {
  Placeholder: typeof Placeholder
  fragments: typeof fragments
}

const CollectionDigestFeed = React.memo(
  BaseCollectionDigestFeed,
  ({ collection: prevCollection }, { collection }) => {
    return (
      prevCollection.pinned === collection.pinned &&
      prevCollection.description === collection.description &&
      prevCollection.cover === collection.cover &&
      prevCollection.title === collection.title &&
      prevCollection.articles.totalCount === collection.articles.totalCount
    )
  }
) as MemoizedCollectionDigestFeed

CollectionDigestFeed.Placeholder = Placeholder
CollectionDigestFeed.fragments = fragments

export default CollectionDigestFeed
