import { useIntl } from 'react-intl'

import {
  Button,
  IconShare32,
  ShareDialog,
  ShareDialogProps,
} from '~/components'

export const ShareButton: React.FC<Omit<ShareDialogProps, 'children'>> = (
  props
) => {
  const intl = useIntl()
  return (
    <ShareDialog {...props}>
      {({ openDialog: openShareDialog }) => (
        <Button
          aria-label={intl.formatMessage({
            defaultMessage: 'Share',
            description: '',
          })}
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
