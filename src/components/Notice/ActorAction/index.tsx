import gql from 'graphql-tag'
import { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'

import { numAbbr } from '~/common/utils'
import { Translate } from '~/components'
import { NoticeHeadActorsUserFragment } from '~/gql/graphql'

import ActorName from '../ActorName'
import styles from './styles.module.css'

type ActorActionProps = {
  actors: NoticeHeadActorsUserFragment[]
  action?: string | ReactElement
  type: string
}

const ActorAction = ({ actors, action, type }: ActorActionProps) => {
  const actorCount = actors.length

  const isMultiActors = actorCount > 1
  const isSystem = type === 'system'

  return (
    <>
      {!isSystem && (
        <section className={styles.container}>
          <ActorName user={actors[0]} />
          <span className={styles.action}>
            {isMultiActors && (
              <>
                <Translate zh_hant="等" zh_hans="等" en="and others" />
                &nbsp;
                {numAbbr(actorCount)}
                &nbsp;
                <Translate zh_hant="人" zh_hans="人" en="users" />
              </>
            )}
            {action}
          </span>
        </section>
      )}
      {isSystem && (
        <span className={styles.name}>
          <FormattedMessage
            defaultMessage="Matters"
            id="2LRzPc"
            description="src/components/Notice/ActorAction/index.tsx"
          />
        </span>
      )}
    </>
  )
}

ActorAction.fragments = {
  user: gql`
    fragment ActorActionUser on User {
      id
      ...ActorNameUser
    }
    ${ActorName.fragments.user}
  `,
}

export default ActorAction
