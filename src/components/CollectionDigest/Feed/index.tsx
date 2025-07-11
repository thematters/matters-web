import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import IconDot from '@/public/static/icons/dot.svg'
import { MAX_FEED_SUMMARY_LENGTH, TEST_ID } from '~/common/enums'
import { makeSummary, toPath } from '~/common/utils'
import { Book, DateTime, Icon, Media } from '~/components'
import { CollectionDigestFeedCollectionFragment } from '~/gql/graphql'

import DropdownActions from '../DropdownActions'
import { fragments } from './gql'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

export type CollectionDigestFeedControls = {
  onClick?: () => void
}

export type CollectionDigestFeedProps = {
  collection: CollectionDigestFeedCollectionFragment
} & CollectionDigestFeedControls

const BaseCollectionDigestFeed = ({
  collection,
  onClick,
}: CollectionDigestFeedProps & { Placeholder: typeof Placeholder }) => {
  const { title, description, cover, author, updatedAt, articles } = collection
  const cleanedDescription = makeSummary(
    description || '',
    MAX_FEED_SUMMARY_LENGTH
  )

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
        <Link {...path} onClick={onClick}>
          <section className={styles.book}>
            <Book.Collection cover={cover} title={title} />
          </section>
        </Link>

        <section className={styles.content}>
          <header className={styles.header}>
            <Link {...path} onClick={onClick} className="u-link-active-green">
              <h2 className={styles.title}>{title}</h2>
            </Link>
          </header>

          <Media lessThan="md">
            <p className={styles.articleCount}>
              <FormattedMessage
                defaultMessage={`{articleCount, plural, =1 {1 article} other {{articleCount} articles}}`}
                id="SaV7mi"
                description="src/components/CollectionDigest/Feed/index.tsx"
                values={{ articleCount }}
              />
            </p>
          </Media>

          {cleanedDescription && (
            <Link {...path} onClick={onClick}>
              <p className={styles.description}>{cleanedDescription}</p>
            </Link>
          )}

          <footer className={styles.footer}>
            <section className={styles.left}>
              <span className={styles.articleCount}>
                <FormattedMessage
                  defaultMessage={`{articleCount, plural, =1 {1 article} other {{articleCount} articles}}`}
                  id="SaV7mi"
                  description="src/components/CollectionDigest/Feed/index.tsx"
                  values={{ articleCount }}
                />
              </span>

              <span className={styles.iconDivider}>
                <Icon icon={IconDot} size={20} />
              </span>

              <span>
                <FormattedMessage
                  defaultMessage="Updated {date}"
                  id="HbwwAe"
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

export const CollectionDigestFeed = React.memo(
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
