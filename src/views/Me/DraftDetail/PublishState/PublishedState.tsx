import { useContext } from 'react'

import {
  Button,
  Icon,
  TextIcon,
  Toast,
  Translate,
  ViewerContext
} from '~/components'

import { toPath } from '~/common/utils'

const PublishedState = () => {
  const viewer = useContext(ViewerContext)
  const path = toPath({
    page: 'userProfile',
    userName: viewer.userName || ''
  })

  return (
    <Toast.Instance
      color="green"
      content={<Translate zh_hant="作品已發佈" zh_hans="作品已发布" />}
      customButton={
        <Button href={path.as} size={[null, '1.25rem']} spacing={[0, 0]}>
          <TextIcon
            icon={<Icon.Right size="xs" color="green" />}
            textPlacement="left"
          >
            <Translate zh_hant="查看我的作品" zh_hans="查看我的作品" />
          </TextIcon>
        </Button>
      }
      buttonPlacement="top"
    />
  )
}

export default PublishedState
