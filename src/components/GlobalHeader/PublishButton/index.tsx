import { Button, Icon, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'
import { TextIcon } from '~/components/TextIcon'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics } from '~/common/utils'

interface Props {
  allowed: boolean
}

export default ({ allowed }: Props) => (
  <ModalSwitch modalId={allowed ? 'publishModal' : 'likeCoinTermModal'}>
    {(open: any) => (
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
    )}
  </ModalSwitch>
)
