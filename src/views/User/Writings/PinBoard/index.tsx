import Link from 'next/link'

import { TEST_ID } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'
import { Book, Media } from '~/components'
import { PinnedWorksUserFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'
import UnPinButton from './UnPinButton'

type PinBoardProps = {
  user: PinnedWorksUserFragment
}

const PinBoard = ({ user }: PinBoardProps) => {
  if (user.pinnedWorks.length <= 0) {
    return null
  }

  return (
    <section
      className={styles.pinBoard}
      data-test-id={TEST_ID.USER_PROFILE_PIN_BOARD}
    >
      <ul className={styles.list}>
        {user.pinnedWorks.map((work, index) => (
          <li
            key={work.id}
            className={styles.listItem}
            data-test-id={TEST_ID.USER_PROFILE_PIN_BOARD_PINNED_WORK}
          >
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
              <a
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
                <Media lessThan="lg">
                  <Book.Flat
                    {...work}
                    type={
                      work.__typename === 'Article' ? 'article' : 'collection'
                    }
                  />
                </Media>
                <Media greaterThanOrEqual="lg">
                  {work.__typename === 'Article' ? (
                    <Book.Article {...work} description={work.summary} />
                  ) : (
                    <Book.Collection {...work} />
                  )}
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
