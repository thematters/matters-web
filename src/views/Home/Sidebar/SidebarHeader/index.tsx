import classNames from 'classnames'

import { Button, Icon, TextIcon, Title, Translate } from '~/components'

import { ANALYTICS_EVENTS, PATHS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import styles from './styles.css'

interface SidebarHeaderProps {
  type: 'icymi' | 'authors' | 'tags' | 'topics'
}

const SidebarHeader = ({ type }: SidebarHeaderProps) => {
  const pathMap = {
    icymi: false,
    topics: PATHS.TOPICS,
    authors: PATHS.AUTHORS,
    tags: PATHS.TAGS
  }
  const titleMap = {
    icymi: <Translate zh_hant="不要錯過" zh_hans="不要错过" />,
    topics: <Translate zh_hant="熱議話題" zh_hans="热议话题" />,
    authors: <Translate zh_hant="活躍作者" zh_hans="活跃作者" />,
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
            <Translate
              zh_hant={TEXT.zh_hant.viewAll}
              zh_hans={TEXT.zh_hans.viewAll}
            />
          </TextIcon>
        </Button>
      )}

      <style jsx>{styles}</style>
    </header>
  )
}

export default SidebarHeader
