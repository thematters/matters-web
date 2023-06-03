import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { PageHeader, ViewAllButton } from '~/components'

import styles from './styles.module.css'

interface SidebarHeaderProps {
  type: 'authors' | 'tags'
  rightButton?: React.ReactNode
  viewAll?: boolean
}

const FeedHeader = ({
  type,
  rightButton,
  viewAll = true,
}: SidebarHeaderProps) => {
  const pathMap = {
    authors: PATHS.AUTHORS,
    tags: PATHS.TAGS,
  }
  const titleMap = {
    authors: <FormattedMessage defaultMessage="Authors" description="" />,
    tags: <FormattedMessage defaultMessage="Topics" description="" />,
  }
  const path = pathMap[type]

  return (
    <PageHeader title={titleMap[type]} is="h2" hasNoBorder>
      <section className="right">
        {rightButton}

        {path && viewAll && <ViewAllButton href={path} />}
      </section>
    </PageHeader>
  )
}

export default FeedHeader
