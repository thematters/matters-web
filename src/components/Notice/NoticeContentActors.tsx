import gql from 'graphql-tag'
import { Fragment, ReactElement } from 'react'

import { numAbbr } from '~/common/utils'
import { Translate } from '~/components'

import NoticeActorName from './NoticeActorName'
import styles from './styles.css'

type NoticeContentActorsProps = {
  actors: any[]
  action: string | ReactElement
  content?: string | ReactElement
}

const NoticeContentActors = ({
  actors,
  action,
  content,
}: NoticeContentActorsProps) => {
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
              <span className="content-actors-info">
                &nbsp;
                <Translate zh_hant="和" zh_hans="和" en="and" />
                &nbsp;
              </span>
            )}
          </Fragment>
        ))}

      <span className="content-actors-info">
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
      {!!content && <span>&nbsp;{content}</span>}
      <style jsx>{styles}</style>
    </>
  )
}

NoticeContentActors.fragments = {
  user: gql`
    fragment NoticeHeadActorsUser on User {
      id
      ...NoticeActorNameUser
    }
    ${NoticeActorName.fragments.user}
  `,
}

export default NoticeContentActors
