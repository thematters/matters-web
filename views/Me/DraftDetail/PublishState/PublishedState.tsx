import Link from 'next/link'
import { useContext } from 'react'

import { Icon, TextIcon, Translate } from '~/components'
import { Toast } from '~/components/Toast'
import { ViewerContext } from '~/components/Viewer'

import { toPath } from '~/common/utils'
import ICON_ARROW from '~/static/icons/arrow-right-white.svg?sprite'

const PublishedState = () => {
  const viewer = useContext(ViewerContext)
  const path = toPath({
    page: 'userProfile',
    userName: viewer.userName || ''
  })

  return (
    <Toast
      color="green"
      header={<Translate zh_hant="文章已發布" zh_hans="文章已发布" />}
      customButton={
        <Link {...path}>
          <a>
            <TextIcon
              icon={
                <Icon
                  style={{ width: 16, hieght: 10 }}
                  id={ICON_ARROW.id}
                  viewBox={ICON_ARROW.viewBox}
                />
              }
              size="sm"
              textPlacement="left"
            >
              <Translate zh_hant="查看我的文章" zh_hans="查看我的文章" />
            </TextIcon>
          </a>
        </Link>
      }
    />
  )
}

export default PublishedState
