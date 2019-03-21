import { Button, Icon, Translate } from '~/components'
import { ModalSwitch } from '~/components/ModalManager'

import ICON_WRITE from '~/static/icons/write.svg?sprite'

interface Props {
  allowed: boolean
}

export default ({ allowed }: Props) => (
  <ModalSwitch modalId={allowed ? 'publishModal' : 'onboardingInfoModal'}>
    {(open: any) => (
      <Button
        size="large"
        bgColor="green"
        icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
        onClick={open}
      >
        <Translate zh_hant="發佈" zh_hans="发布" />
      </Button>
    )}
  </ModalSwitch>
)
