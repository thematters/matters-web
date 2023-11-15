import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button } from '~/components'

export const StartWriting = () => {
  return (
    <Button
      size={[null, '2rem']}
      spacing={[0, 'tight']}
      borderColor="green"
      borderActiveColor="greenDark"
      borderWidth="md"
      textColor="green"
      textActiveColor="greenDark"
      href={PATHS.ME_DRAFT_NEW}
      onClick={() => analytics.trackEvent('click_button', { type: 'write' })}
    >
      <FormattedMessage
        defaultMessage="Start writing"
        id="Z2iL9Z"
        description="src/components/Buttons/StartWriting/index.tsx"
      />
    </Button>
  )
}
