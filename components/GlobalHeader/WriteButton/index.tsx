import { Button, Icon, Translate } from '~/components'

import ICON_WRITE from '~/static/icons/write.svg?sprite'

export default () => (
  <>
    <Button
      className="u-sm-down-hide"
      size="large"
      bgColor="gold"
      icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
    >
      <Translate zh_hant="創作" zh_hans="创作" />
    </Button>
    <Button
      className="u-sm-up-hide"
      bgColor="gold"
      shape="circle"
      icon={<Icon id={ICON_WRITE.id} viewBox={ICON_WRITE.viewBox} />}
    />
  </>
)
