import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS } from '~/common/enums'
import { Button, LikeCoinDialog, TableView, ViewerContext } from '~/components'

const LikerID = () => {
  const viewer = useContext(ViewerContext)
  const likerId = viewer.liker.likerId

  if (!likerId) {
    return null
  }

  return (
    <LikeCoinDialog>
      {({ openDialog }) => (
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
                spacing={[0, 12]}
                textColor="green"
                borderColor="green"
                onClick={openDialog}
              >
                <FormattedMessage defaultMessage="Connect" id="+vVZ/G" />
              </Button>
            )
          }
        />
      )}
    </LikeCoinDialog>
  )
}

export default LikerID
