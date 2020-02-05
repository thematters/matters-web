import { useContext } from 'react'

import { Button, Icon, TextIcon, Translate } from '~/components'
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
      buttonPlacement="center"
      header={<Translate zh_hant="作品已發佈" zh_hans="作品已发布" />}
      customButton={
        <Button href={path.as} size={[null, '1.25rem']} spacing={[0, 'xtight']}>
          <TextIcon
            icon={<Icon.Right size="xs" color="white" />}
            textPlacement="left"
          >
            <Translate zh_hant="查看我的作品" zh_hans="查看我的作品" />
          </TextIcon>
        </Button>
      }
    />
  )
}

export default PublishedState
