import gql from 'graphql-tag'
import { Fragment } from 'react'

import { numAbbr } from '~/common/utils'
import { Translate } from '~/components'
import { NoticeHeadActorsUserFragment } from '~/gql/graphql'

import NoticeActorName from './NoticeActorName'

type NoticeHeadActorsProps = {
  actors: NoticeHeadActorsUserFragment[]
}

const NoticeHeadActors = ({ actors }: NoticeHeadActorsProps) => {
  const actorsCount = actors.length
  const isMultiActors = actorsCount > 1
  const restActorCount = actorsCount - 2

  return (
    <>
      {actors.slice(0, 2).map((actor, index) => (
        <Fragment key={index}>
          <NoticeActorName user={actor} />
          {isMultiActors && index < 1 && (
            <span>
              <Translate zh_hant="、" zh_hans="、" en=", " />
            </span>
          )}
        </Fragment>
      ))}{' '}
      {isMultiActors && (
        <Translate
          zh_hant={`等 ${numAbbr(actorsCount)} 人`}
          zh_hans={`等 ${numAbbr(actorsCount)} 人`}
          en={restActorCount > 0 ? `and ${numAbbr(restActorCount)} users` : ' '}
        />
      )}
    </>
  )
}

NoticeHeadActors.fragments = {
  user: gql`
    fragment NoticeHeadActorsUser on User {
      id
      ...NoticeActorNameUser
    }
    ${NoticeActorName.fragments.user}
  `,
}

export default NoticeHeadActors
