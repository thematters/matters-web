import { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { NoticeActorAvatarUserFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorsNameAndTitle from '../NoticeActorsNameAndTitle'
import NoticeDate from '../NoticeDate'
import NoticeMultiActors from '../NoticeMultiActors'
import styles from '../styles.module.css'

type NoticeDigestProps = {
  notice: {
    id: string
    actors?: NoticeActorAvatarUserFragment[] | null
    createdAt: string
  }
  action: string | ReactElement
  secondAction?: string | ReactElement
  title?: string | ReactElement
  content?: string | ReactElement
  testId?: TEST_ID
}

const NoticeDigest = ({
  notice,
  action,
  secondAction,
  title,
  content,
  testId,
}: NoticeDigestProps) => {
  const actors = notice.actors || []

  const actorsCount = actors.length
  const isAnonymous = actorsCount <= 0
  const isMultiActors = actorsCount > 1

  return (
    <section
      className={styles.container}
      {...(testId ? { ['data-test-id']: testId } : {})}
    >
      <section className={styles.header}>
        <NoticeMultiActors actors={actors} />

        {isAnonymous && (
          <>
            <NoticeActorAvatar />

            <section className={styles.singleActorInfo}>
              <span className={styles.noticeActorsNameAndTitleTitle}>
                <FormattedMessage defaultMessage="Anonymous User" id="GclYG/" />
              </span>
            </section>
          </>
        )}

        {!isMultiActors && (
          <section className={styles.singleActorInfo}>
            <NoticeActorsNameAndTitle
              actors={actors}
              action={action}
              secondAction={secondAction}
              title={title}
            />
          </section>
        )}
      </section>

      {isMultiActors && (
        <section className={styles.content}>
          <NoticeActorsNameAndTitle
            actors={actors}
            action={action}
            secondAction={secondAction}
            title={title}
          />
        </section>
      )}

      {content && <section className={styles.content}>{content}</section>}

      <section className={styles.footer}>
        <NoticeDate notice={notice} />
      </section>
    </section>
  )
}

export default NoticeDigest
