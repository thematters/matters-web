import classnames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import {
  LanguageContext,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { CHANNELS } from '~/components/GQL/queries/channels'
import { ChannelsQuery } from '~/gql/graphql'

import Placeholder from './Placeholder'
import styles from './styles.module.css'

const SideChannelNav = () => {
  const { getQuery, router, isInPath } = useRoute()
  const shortHash = getQuery('shortHash')
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed

  const { lang } = useContext(LanguageContext)

  const { data, loading } = usePublicQuery<ChannelsQuery>(CHANNELS, {
    variables: { userLanguage: lang },
  })

  if (loading) return <Placeholder />

  const channels = data?.channels || []

  return (
    <section className={styles.content}>
      <section className={styles.sideChannelNav}>
        {isAuthed && (
          <a
            href={PATHS.FOLLOW}
            className={classnames({
              [styles.item]: true,
              [styles.selectedChannel]: isInPath('FOLLOW'),
            })}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(PATHS.FOLLOW)
            }}
          >
            <FormattedMessage defaultMessage="Follow" id="ieGrWo" />
          </a>
        )}
        <a
          href={PATHS.HOME}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]:
              isInPath('HOME') &&
              (getQuery('type') === 'icymi' || !getQuery('type')),
          })}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            router.push(PATHS.HOME)
          }}
        >
          <FormattedMessage defaultMessage="Featured" id="CnPG8j" />
        </a>
        {channels.map((c, index) => (
          <a
            key={c.id}
            href={`/c/${c.shortHash}?id=${c.id}`}
            className={classnames({
              [styles.item]: true,
              [styles.selectedChannel]: shortHash === c.shortHash,
            })}
            data-channel-id={c.id}
            title={c.name}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(`/c/${c.shortHash}?id=${c.id}`)
            }}
          >
            {c.name}
          </a>
        ))}
        <a
          href={`${PATHS.HOME}?type=newest`}
          className={classnames({
            [styles.item]: true,
            [styles.selectedChannel]:
              isInPath('HOME') && getQuery('type') === 'newest',
          })}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            router.push(`${PATHS.HOME}?type=newest`)
          }}
        >
          <FormattedMessage defaultMessage="Latest" id="adThp5" />
        </a>
      </section>
    </section>
  )
}

export default SideChannelNav
