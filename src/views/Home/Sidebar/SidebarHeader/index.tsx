import classNames from 'classnames'

import { Icon, LinkWrapper, TextIcon, Title, Translate } from '~/components'

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
    tags: <Translate zh_hant={TEXT.zh_hant.tag} zh_hans={TEXT.zh_hans.tag} />
  }
  const path = pathMap[type]
  const headerClass = classNames({
    [type]: type
  })
  const onClick = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.DISPLAY_ALL, { type })
  }

  if (!path || typeof path === 'boolean') {
    return (
      <header className={headerClass}>
        <Title type="nav">{titleMap[type]}</Title>

        <style jsx>{styles}</style>
      </header>
    )
  }

  return (
    <header className={headerClass}>
      <LinkWrapper {...path} onClick={onClick}>
        <Title type="nav" is="h2">
          {titleMap[type]}
        </Title>
      </LinkWrapper>

      <LinkWrapper {...path} onClick={onClick}>
        <TextIcon
          icon={<Icon.ArrowRight style={{ width: 8, height: 8 }} />}
          color="grey-dark"
          spacing="xxtight"
          size="xs"
          weight="md"
          textPlacement="left"
        >
          <Translate
            zh_hant={TEXT.zh_hant.viewAll}
            zh_hans={TEXT.zh_hans.viewAll}
          />
        </TextIcon>
      </LinkWrapper>

      <style jsx>{styles}</style>
    </header>
  )
}

export default SidebarHeader
