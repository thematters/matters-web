import { Button, Icon, Translate } from '~/components'
import LikeCoinDialog from '~/components/LikeCoinDialog'
import PublishDialog from '~/components/PublishDialog'
import { TextIcon } from '~/components/TextIcon'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

interface Props {
  allowed: boolean
}

const PublishButton = ({ open }: { open: () => void }) => (
  <Button
    spacing={[0, 'base']}
    size={[null, '2.25rem']}
    bgColor="green"
    onClick={() => {
      analytics.trackEvent(ANALYTICS_EVENTS.CLICK_PUBLISH_BUTTON)
      open()
    }}
  >
    <TextIcon color="white" icon={<Icon.Pen />} weight="md">
      <Translate zh_hant="發佈" zh_hans="发布" />
    </TextIcon>
  </Button>
)

export default ({ allowed }: Props) => {
  if (allowed) {
    return (
      <PublishDialog>
        {({ open }) => <PublishButton open={open} />}
      </PublishDialog>
    )
  }

  return (
    <LikeCoinDialog>
      {({ open }) => <PublishButton open={open} />}
    </LikeCoinDialog>
  )
}
