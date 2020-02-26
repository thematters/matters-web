import { Button, Icon, LikeCoinDialog, TextIcon, Translate } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { PublishDialog } from './PublishDialog'

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
      <Translate id="publish" />
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
