import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'

import ICON_NEW_BRANCH from '~/static/icons/new-branch.svg?sprite'

const ExtendButton = () => (
  <>
    <Button
      onClick={() => alert('TODO: jump to draft page')}
      outlineColor="black"
      icon={
        <Icon
          id={ICON_NEW_BRANCH.id}
          viewBox={ICON_NEW_BRANCH.viewBox}
          size="small"
        />
      }
    >
      <Translate zh_hant="引申" zh_hans="引申" />
    </Button>
  </>
)

export default ExtendButton
