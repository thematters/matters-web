import gql from 'graphql-tag'
import Link from 'next/link'

import { toPath } from '@/src/common/utils'
import { PinnedWorksUserFragment } from '@/src/gql/graphql'
import { Book, Media } from '~/components'

import styles from './styles.module.css'

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
        {user.pinnedWorks.map((work) => (
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
            >
              <a>
                <Media at="sm">
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
                <Media greaterThan="sm">
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
          </li>
        ))}
      </ul>
    </section>
  )
}

PinBoard.fragments = fragments

export default PinBoard
