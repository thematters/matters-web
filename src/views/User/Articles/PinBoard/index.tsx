import gql from 'graphql-tag'
import Link from 'next/link'

import { analytics, toPath } from '~/common/utils'
import { Book, Media } from '~/components'
import { PinnedWorksUserFragment } from '~/gql/graphql'

import styles from './styles.module.css'
import UnPinButton from './UnPinButton'

type PinBoardProps = {
  user: PinnedWorksUserFragment
}

const fragments = {
  user: gql`
    fragment PinnedWorksUser on User {
      id
      userName
      pinnedWorks {
        id
        pinned
        title
        cover
        ... on Article {
          slug
          mediaHash
          author {
            id
            userName
          }
        }
        ... on Collection {
          articles(input: { first: 0 }) {
            totalCount
          }
        }
      }
    }
  `,
}

const PinBoard = ({ user }: PinBoardProps) => {
  if (user.pinnedWorks.length <= 0) {
    return null
  }

  return (
    <section className={styles.pinBoard}>
      <ul className={styles.list}>
        {user.pinnedWorks.map((work, index) => (
          <li key={work.id} className={styles.listItem}>
            <Link
              legacyBehavior
              {...toPath(
                work.__typename === 'Article'
                  ? {
                      page: 'articleDetail',
                      article: work,
                    }
                  : {
                      page: 'collectionDetail',
                      userName: user.userName!,
                      collection: work,
                    }
              )}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'user_pinned_work',
                  contentType:
                    work.__typename === 'Article' ? 'article' : 'collection',
                  location: index,
                  id: work.id,
                })
              }
            >
              <a>
                <Media lessThan="lg">
                  <Book
                    {...work}
                    articleCount={
                      work.__typename === 'Collection'
                        ? work.articles.totalCount || 0
                        : undefined
                    }
                    variant="flat"
                  />
                </Media>
                <Media greaterThanOrEqual="lg">
                  <Book
                    {...work}
                    articleCount={
                      work.__typename === 'Collection'
                        ? work.articles.totalCount || 0
                        : undefined
                    }
                  />
                </Media>
              </a>
            </Link>

            <section className={styles.unpinButton}>
              <UnPinButton
                id={work.id}
                userName={user.userName!}
                type={work.__typename === 'Article' ? 'article' : 'collection'}
              />
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}

PinBoard.fragments = fragments

export default PinBoard
