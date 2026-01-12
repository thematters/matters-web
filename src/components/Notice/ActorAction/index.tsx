import gql from 'graphql-tag'
import { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'

import { NoticeHeadActorsUserFragment } from '~/gql/graphql'

import ActorName from '../ActorName'
import styles from './styles.module.css'

type ActorActionProps = {
  actors: NoticeHeadActorsUserFragment[]
  action?: string | ReactElement
  type: string
}

const ActorAction = ({ actors, action, type }: ActorActionProps) => {
  const isSystem = type === 'system'

  return (
    <>
      {!isSystem && (
        <span className={styles.container}>
          <ActorName user={actors[0]} />
          <span className={styles.action}>{action}</span>
        </span>
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
