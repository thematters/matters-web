import gql from 'graphql-tag'
import { Fragment, ReactElement } from 'react'

import { numAbbr } from '~/common/utils'
import { Translate } from '~/components'

import NoticeActorName from './NoticeActorName'
import styles from './styles.css'

type NoticeFooterActorsProps = {
  actors: any[]
  action: string | ReactElement
}

const NoticeFooterActors = ({ actors, action }: NoticeFooterActorsProps) => {
  const actorsCount = actors.length
  const isSingleActors = actorsCount === 1
  const isDoubleActors = actorsCount === 2
  const isMoreActors = actorsCount > 3

  return (
    <>
      {(isSingleActors || isMoreActors) && <NoticeActorName user={actors[0]} />}
      {isDoubleActors &&
        actors.map((actor, index) => (
          <Fragment key={index}>
            <NoticeActorName user={actor} />
            {index === 0 && (
              <span className="footer-actors-info">
                &nbsp;
                <Translate zh_hant="和" zh_hans="和" en="and" />
                &nbsp;
              </span>
            )}
          </Fragment>
        ))}

      <span className="footer-actors-info">
        {isMoreActors && (
          <span>
            &nbsp;
            <Translate zh_hant="等" zh_hans="等" en="and others" />
            &nbsp;
            {numAbbr(actorsCount)}
            &nbsp;
            <Translate zh_hant="人" zh_hans="人" en="users" />
            &nbsp;
          </span>
        )}
        {action}
      </span>
      <style jsx>{styles}</style>
    </>
  )
}

NoticeFooterActors.fragments = {
  user: gql`
    fragment NoticeHeadActorsUser on User {
      id
      ...NoticeActorNameUser
    }
    ${NoticeActorName.fragments.user}
  `,
}

export default NoticeFooterActors
