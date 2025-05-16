import gql from 'graphql-tag'

import {
  CurationChannelHeaderFragment,
  TopicChannelHeaderFragment,
} from '~/gql/graphql'

import styles from '../styles.module.css'

const fragments = {
  topicChannel: gql`
    fragment TopicChannelHeader on TopicChannel {
      id
      name
      note
    }
  `,
  curationChannel: gql`
    fragment CurationChannelHeader on CurationChannel {
      id
      name
      note
    }
  `,
}

interface ChannelHeaderProps {
  channel: CurationChannelHeaderFragment | TopicChannelHeaderFragment
}

export const ChannelHeader = ({ channel }: ChannelHeaderProps) => {
  if (!channel) {
    return null
  }

  return (
    <>
      <div className={styles.header}>
        <h1>{channel.name}</h1>
        {channel.note && <p className={styles.description}>{channel.note}</p>}
      </div>
    </>
  )
}

ChannelHeader.fragments = fragments
