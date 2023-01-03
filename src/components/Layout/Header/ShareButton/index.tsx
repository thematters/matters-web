import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  Button,
  IconShare32,
  LanguageContext,
  ShareDialog,
  ShareDialogProps,
} from '~/components'

export const ShareButton: React.FC<Omit<ShareDialogProps, 'children'>> = (
  props
) => {
  const { lang } = useContext(LanguageContext)

  return (
    <ShareDialog {...props}>
      {({ openDialog: openShareDialog }) => (
        <Button
          aria-label={translate({ id: 'share', lang })}
          aria-haspopup="dialog"
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
