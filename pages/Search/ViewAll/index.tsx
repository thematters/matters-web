import Link from 'next/link'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import { toPath } from '~/common/utils'
import ICON_ARROW_RIGHT_GREEN from '~/static/icons/arrow-right-green.svg?sprite'

const ViewAll = ({
  q,
  type
}: {
  q: string
  type: 'article' | 'tag' | 'user'
}) => {
  const viewAllPath = toPath({
    page: 'search',
    type,
    q
  })

  return (
    <Link {...viewAllPath}>
      <a>
        <TextIcon
          icon={
            <Icon
              id={ICON_ARROW_RIGHT_GREEN.id}
              viewBox={ICON_ARROW_RIGHT_GREEN.viewBox}
              style={{ width: 12, height: 6 }}
            />
          }
          textPlacement="left"
          color="green"
        >
          <Translate zh_hant="顯示全部" zh_hans="显示全部" />
        </TextIcon>
      </a>
    </Link>
  )
}

export default ViewAll
