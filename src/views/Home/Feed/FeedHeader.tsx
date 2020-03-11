import classNames from 'classnames'

import { Button, Icon, TextIcon, Title, Translate } from '~/components'

import { ANALYTICS_EVENTS, PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'

import styles from './styles.css'

interface FeedHeaderProps {
  type: 'icymi' | 'users' | 'tags' | 'topics'
  rightButton?: React.ReactNode
}

const FeedHeader = ({ type, rightButton }: FeedHeaderProps) => {
  const pathMap = {
    icymi: PATHS.ICYMI,
    topics: PATHS.TOPICS,
    users: PATHS.AUTHORS,
    tags: PATHS.TAGS
  }
  const titleMap = {
    icymi: <Translate zh_hant="不要錯過" zh_hans="不要错过" />,
    topics: <Translate zh_hant="熱議話題" zh_hans="热议话题" />,
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
          <Button
            size={[null, '1.25rem']}
            spacing={[0, 'xtight']}
            bgHoverColor="grey-lighter"
            {...path}
            onClick={onClick}
          >
            <TextIcon
              icon={<Icon.Right size="xs" />}
              color="grey-dark"
              size="xs"
              weight="md"
              textPlacement="left"
            >
              <Translate id="viewAll" />
            </TextIcon>
          </Button>
        )}
      </section>

      <style jsx>{styles}</style>
    </header>
  )
}

export default FeedHeader
