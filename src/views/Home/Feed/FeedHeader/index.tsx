import classNames from 'classnames'

import { Title, Translate, ViewAllButton } from '~/components'

import { ANALYTICS_EVENTS, PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'

import styles from './styles.css'

interface SidebarHeaderProps {
  type: 'icymi' | 'users' | 'tags' | 'topics'
  rightButton?: React.ReactNode
}

const FeedHeader = ({ type, rightButton }: SidebarHeaderProps) => {
  const pathMap = {
    icymi: PATHS.ICYMI,
    topics: PATHS.TOPICS,
    users: PATHS.AUTHORS,
    tags: PATHS.TAGS
  }
  const titleMap = {
    icymi: <Translate zh_hant="不要錯過" zh_hans="不要错过" />,
    topics: <Translate id="allTopics" />,
    users: <Translate zh_hant="值得關注" zh_hans="值得关注" />,
    tags: <Translate zh_hant="找你想看的" zh_hans="找你想看的" />
  }
  const path = pathMap[type]
  const headerClass = classNames({
    [type]: type
  })
  const onClick = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.DISPLAY_ALL, { type })
  }

  return (
    <header className={headerClass}>
      <Title type="nav" is="h2">
        {titleMap[type]}
      </Title>

      <section className="right">
        {rightButton}

        {path && (
          <ViewAllButton
            {...path}
            onClick={onClick}
            bgColor={undefined}
            bgActiveColor="green-lighter"
          />
        )}
      </section>

      <style jsx>{styles}</style>
    </header>
  )
}

export default FeedHeader
