import Link from 'next/link'
import { useContext } from 'react'

import { Icon, TextIcon, Translate } from '~/components'
import { Toast } from '~/components/Toast'
import { ViewerContext } from '~/components/Viewer'

import { toPath } from '~/common/utils'

const PublishedState = () => {
  const viewer = useContext(ViewerContext)
  const path = toPath({
    page: 'userProfile',
    userName: viewer.userName || ''
  })

  return (
    <Toast
      color="green"
      header={<Translate zh_hant="作品已發布" zh_hans="作品已发布" />}
      customButton={
        <Link {...path}>
          <a>
            <TextIcon
              icon={<Icon.ArrowRightWhite style={{ width: 16, hieght: 10 }} />}
              size="sm"
              textPlacement="left"
            >
              <Translate zh_hant="查看我的作品" zh_hans="查看我的作品" />
            </TextIcon>
          </a>
        </Link>
      }
    />
  )
}

export default PublishedState
