import gql from 'graphql-tag'
import { Fragment, ReactElement } from 'react'

import { numAbbr } from '~/common/utils'
import { Translate } from '~/components'
import { NoticeHeadActorsUserFragment } from '~/gql/graphql'

import NoticeActorName from './NoticeActorName'
import styles from './styles.module.css'

type NoticeActorsNameAndTitleProps = {
  actors: NoticeHeadActorsUserFragment[]
  action: string | ReactElement
  secondAction?: string | ReactElement
  title?: string | ReactElement
}

const NoticeActorsNameAndTitle = ({
  actors,
  action,
  secondAction,
  title,
}: NoticeActorsNameAndTitleProps) => {
  const actorsCount = actors.length
  const isSingleActor = actorsCount === 1
  const isDoubleActors = actorsCount === 2
  const isMoreActors = actorsCount > 3

  return (
    <>
      {isSingleActor && <NoticeActorName user={actors[0]} />}
      {isDoubleActors &&
        actors.map((actor, index) => (
          <Fragment key={index}>
            <NoticeActorName user={actor} />
            {index === 0 && (
              <span className={styles.noticeActorsNameAndTitleInfo}>
                &nbsp;
                <Translate zh_hant="和" zh_hans="和" en="and" />
                &nbsp;
              </span>
            )}
          </Fragment>
        ))}

      <span className={styles.noticeActorsNameAndTitleInfo}>
        {isMoreActors && (
          <>
            <NoticeActorName user={actors[0]} />
            &nbsp;
            <span>
              <Translate zh_hant="等" zh_hans="等" en="and others" />
              &nbsp;
              {numAbbr(actorsCount)}
              &nbsp;
              <Translate zh_hant="人" zh_hans="人" en="users" />
            </span>
            {action}
          </>
        )}
        {!isMoreActors && <>&nbsp;{action}</>}
      </span>
      {!!title && (
        <span className={styles.noticeActorsNameAndTitleTitle}>
          &nbsp;{title}
        </span>
      )}
      {!!secondAction && (
        <span className={styles.noticeActorsNameAndTitleInfo}>
          &nbsp;{secondAction}
        </span>
      )}
    </>
  )
}

NoticeActorsNameAndTitle.fragments = {
  user: gql`
    fragment NoticeHeadActorsUser on User {
      id
      ...NoticeActorNameUser
    }
    ${NoticeActorName.fragments.user}
  `,
}

export default NoticeActorsNameAndTitle
