import gql from 'graphql-tag'
import { Fragment, ReactElement } from 'react'

import { numAbbr } from '~/common/utils'
import { Translate } from '~/components'

import NoticeActorName from './NoticeActorName'
import styles from './styles.css'

type NoticeActorsNameAndTitleProps = {
  actors: any[]
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
  const isSingleActors = actorsCount === 1
  const isDoubleActors = actorsCount === 2
  const isMoreActors = actorsCount > 3

  return (
    <>
      {isSingleActors && <NoticeActorName user={actors[0]} />}
      {isDoubleActors &&
        actors.map((actor, index) => (
          <Fragment key={index}>
            <NoticeActorName user={actor} />
            {index === 0 && (
              <span className="notice-actors-name-and-title-info">
                &nbsp;
                <Translate zh_hant="和" zh_hans="和" en="and" />
                &nbsp;
              </span>
            )}
          </Fragment>
        ))}

      <span className="notice-actors-name-and-title-info">
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
          </>
        )}
        &nbsp;
        {action}
      </span>
      {!!title && (
        <span className="notice-actors-name-and-title-title">
          &nbsp;{title}
        </span>
      )}
      {!!secondAction && (
        <span className="notice-actors-name-and-title-info">
          &nbsp;{secondAction}
        </span>
      )}
      <style jsx>{styles}</style>
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
