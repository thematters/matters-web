import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS, OPEN_LIKE_COIN_DIALOG } from '~/common/enums'
import { Button, TableView, ViewerContext } from '~/components'

const LikerID = () => {
  const viewer = useContext(ViewerContext)
  const likerId = viewer.liker.likerId

  return (
    <TableView.Cell
      title={
        <FormattedMessage
          defaultMessage="Liker ID"
          id="kS3vTS"
          description="src/views/Me/Settings/Misc/LikerID.tsx"
        />
      }
      rightText={likerId}
      href={likerId ? EXTERNAL_LINKS.LIKECOIN_LEGACY : undefined}
      right={
        !!likerId ? undefined : (
          <Button
            size={[null, '1.5rem']}
            spacing={[0, 'tight']}
            textColor="green"
            borderColor="green"
            onClick={() =>
              window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
            }
          >
            <FormattedMessage defaultMessage="Connect" id="+vVZ/G" />
          </Button>
        )
      }
    />
  )
}

export default LikerID
