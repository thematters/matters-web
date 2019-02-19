import Link from 'next/link'

import { Icon, TextIcon } from '~/components'

import { PATHS } from '~/common/enums'
import ICON_ARROW_RIGHT_GREEN_SMALL from '~/static/icons/arrow-right-green-small.svg?sprite'
import styles from './styles.css'

export default ({ type }: { type: 'authors' | 'tags' | 'topics' }) => {
  const pathMap = {
    topics: PATHS.TOPICS,
    authors: PATHS.AUTHORS,
    tags: PATHS.TAGS
  }

  return (
    <Link href={pathMap[type].fs} as={pathMap[type].url}>
      <a>
        <TextIcon
          icon={
            <Icon
              id={ICON_ARROW_RIGHT_GREEN_SMALL.id}
              viewBox={ICON_ARROW_RIGHT_GREEN_SMALL.viewBox}
              style={{ width: 6, height: 8 }}
            />
          }
          color="green"
          text="查看全部"
          textPlacement="left"
        />
        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}
