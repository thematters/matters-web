import { useContext } from 'react'

import {
  Button,
  IconShare32,
  LanguageContext,
  ShareDialog,
  ShareDialogProps,
} from '~/components'

import { translate } from '~/common/utils'

export const ShareButton: React.FC<Omit<ShareDialogProps, 'children'>> = (
  props
) => {
  const { lang } = useContext(LanguageContext)

  return (
    <ShareDialog {...props}>
      {({ openDialog: openShareDialog }) => (
        <Button
          aria-label={translate({ id: 'back', lang })}
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
