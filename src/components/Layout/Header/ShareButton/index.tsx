import { Button, IconShare32, ShareDialog } from '~/components'

import { TEXT } from '~/common/enums'

export const ShareButton: React.FC = () => {
  return (
    <ShareDialog>
      {({ openDialog: openShareDialog }) => (
        <Button
          aria-label={TEXT.zh_hant.back}
          bgColor="half-black"
          onClick={openShareDialog}
        >
          <IconShare32 size="lg" color="white" />
        </Button>
      )}
    </ShareDialog>
  )
}

export default ShareButton
