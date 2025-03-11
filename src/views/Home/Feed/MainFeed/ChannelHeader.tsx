import { ChannelByShortHashQuery } from '~/gql/graphql'

import styles from './styles.module.css'
interface ChannelHeaderProps {
  channel: ChannelByShortHashQuery['channel']
}

export const ChannelHeader = ({ channel }: ChannelHeaderProps) => {
  if (!channel) {
    return null
  }

  return (
    <>
      <div className={styles.channel}>
        <h1>{channel.name}</h1>
      </div>
      <p className={styles.description}>
        {channel.description?.replace(/\//g, ' / ')}
      </p>
    </>
  )
}
