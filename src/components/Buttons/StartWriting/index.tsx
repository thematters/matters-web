import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { OPEN_LIKE_COIN_DIALOG, PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, ViewerContext } from '~/components'

export const StartWriting = () => {
  const viewer = useContext(ViewerContext)

  return (
    <Button
      size={[null, '2rem']}
      spacing={[0, 'tight']}
      borderColor="green"
      borderActiveColor="greenDark"
      borderWidth="md"
      textColor="green"
      textActiveColor="greenDark"
      href={viewer.shouldSetupLikerID ? undefined : PATHS.ME_DRAFT_NEW}
      onClick={
        viewer.shouldSetupLikerID
          ? async () => {
              window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
              return
            }
          : () => analytics.trackEvent('click_button', { type: 'write' })
      }
    >
      <FormattedMessage
        defaultMessage="Start writing"
        id="Z2iL9Z"
        description="src/components/Buttons/StartWriting/index.tsx"
      />
    </Button>
  )
}
