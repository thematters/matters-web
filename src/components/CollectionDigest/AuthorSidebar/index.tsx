import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { capitalizeFirstLetter, toPath } from '~/common/utils'
import { CollectionDigestAuthorSidebarCollectionFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type CollectionDigestAuthorSidebarProps = {
  collection: CollectionDigestAuthorSidebarCollectionFragment
  imageSize?: 'md'
  clickEvent?: () => void
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
  clickEvent,
}: CollectionDigestAuthorSidebarProps) => {
  const {
    title,
    author: { userName },
  } = collection

  const containerClasses = classNames({
    [styles.container]: true,
    [styles[`imageSize${capitalizeFirstLetter(imageSize)}`]]: true,
  })

  const path = toPath({
    page: 'collectionDetail',
    collection,
    userName: userName || '',
  })

  return (
    <section className={containerClasses} onClick={clickEvent}>
      <Link {...path} className="u-link-active-green">
        <header>{title}</header>
      </Link>

      <Link {...path} className="u-link-active-green">
        <section className={styles.totalCount}>
          <FormattedMessage
            defaultMessage="{totalCount} articles"
            id="S15KFb"
            values={{
              totalCount: collection.articles.totalCount,
            }}
          />
        </section>
      </Link>
    </section>
  )
}

CollectionDigestAuthorSidebar.fragments = fragments
