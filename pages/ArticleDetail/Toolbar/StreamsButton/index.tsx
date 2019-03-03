import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import ICON_BRANCHES from '~/static/icons/branches.svg?sprite'

const IconBranches = () => (
  <Icon size="default" id={ICON_BRANCHES.id} viewBox={ICON_BRANCHES.viewBox} />
)

const StreamsButton = ({ showText = false }: { showText?: boolean }) => (
  <button
    type="button"
    aria-label="查看上下游"
    onClick={() => alert('TODO: popup downstreams/upsteams popper')}
  >
    {showText ? (
      <TextIcon
        icon={<IconBranches />}
        color="grey"
        weight="medium"
        textPlacement="bottom"
        size="xxs"
        spacing="xxtight"
      >
        <Translate zh_hant="上下游" zh_hans="上下游" />
      </TextIcon>
    ) : (
      <IconBranches />
    )}
  </button>
)

export default StreamsButton
