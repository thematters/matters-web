import gql from 'graphql-tag'

import { displayChannelName } from '~/common/utils'
import { ChannelHeaderFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  channel: gql`
    fragment ChannelHeader on TopicChannel {
      id
      name
      note
    }
  `,
}

interface ChannelHeaderProps {
  channel: ChannelHeaderFragment
}

export const ChannelHeader = ({ channel }: ChannelHeaderProps) => {
  if (!channel) {
    return null
  }

  return (
    <>
      <div className={styles.header}>
        <h1>{displayChannelName(channel.name)}</h1>
      </div>
      {channel.note && <p className={styles.description}>{channel.note}</p>}
    </>
  )
}

ChannelHeader.fragments = fragments
