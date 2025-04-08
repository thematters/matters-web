import { displayChannelName } from '~/common/utils'
import { ChannelByShortHashQuery } from '~/gql/graphql'

import styles from './styles.module.css'
interface ChannelHeaderProps {
  channel: ChannelByShortHashQuery['channel']
}

export const ChannelHeader = ({ channel }: ChannelHeaderProps) => {
  if (!channel || channel.__typename !== 'TopicChannel') {
    return null
  }

  return (
    <>
      <div className={styles.header}>
        <h1>{displayChannelName(channel.name)}</h1>
      </div>
      <p className={styles.description}>{channel.note}</p>
    </>
  )
}
