import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import {
  Button,
  ButtonProps,
  PageHeader,
  TextIcon,
  useChannels,
} from '~/components'

import styles from './styles.module.css'

interface SidebarHeaderProps {
  type: 'authors' | 'tags'
  rightButton?: React.ReactNode
  viewAll?: boolean
}

type ViewAllButtonProps = ButtonProps

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ ...props }) => {
  return (
    <Button textColor="greyDarker" textActiveColor="black" {...props}>
      <TextIcon size={14}>
        <FormattedMessage defaultMessage="All" id="zQvVDJ" />
      </TextIcon>
    </Button>
  )
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
  const { isInTopicChannel } = useChannels()
  const titleMap = {
    authors: isInTopicChannel ? (
      <FormattedMessage defaultMessage="Popular Channel Authors" id="cCpbBu" />
    ) : (
      <FormattedMessage defaultMessage="Authors" id="XgdZSb" />
    ),
    tags: isInTopicChannel ? (
      <FormattedMessage defaultMessage="Related Tags" id="EiENui" />
    ) : (
      <FormattedMessage defaultMessage="Topics" id="kc79d3" />
    ),
  }
  const path = pathMap[type]

  return (
    <PageHeader title={titleMap[type]} is="h2" hasBorder={false} type="base">
      <section className={styles.right}>
        {rightButton}

        {path && viewAll && <ViewAllButton href={path} />}
      </section>
    </PageHeader>
  )
}

export default FeedHeader
