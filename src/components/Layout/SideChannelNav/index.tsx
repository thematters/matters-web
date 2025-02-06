import classnames from 'classnames'
import { useContext } from 'react'

import { LanguageContext, usePublicQuery, useRoute } from '~/components'
import { CHANNELS } from '~/components/GQL/queries/channels'
import { ChannelsQuery } from '~/gql/graphql'

import Placeholder from './Placeholder'
import styles from './styles.module.css'

const SideChannelNav = () => {
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  const { lang } = useContext(LanguageContext)

  const { data, loading } = usePublicQuery<ChannelsQuery>(CHANNELS, {
    variables: { userLanguage: lang },
  })

  if (loading) return <Placeholder />

  const channels = data?.channels || []

  return (
    <section className={styles.content}>
      <section className={styles.sideChannelNav}>
        {channels.map((c, index) => (
          <a
            key={c.id}
            href={`/c/${c.shortHash}`}
            className={classnames({
              [styles.item]: true,
              [styles.selectedChannel]:
                shortHash === c.shortHash || (!shortHash && index === 0),
            })}
            data-channel-id={c.id}
            title={c.name}
          >
            {c.name}
          </a>
        ))}
      </section>
    </section>
  )
}

export default SideChannelNav
