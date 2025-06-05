import { useIntl } from 'react-intl'

import IconShare from '@/public/static/icons/24px/share.svg'
import { Button, Icon, ShareDialog, ShareDialogProps } from '~/components'

export const ShareButton: React.FC<Omit<ShareDialogProps, 'children'>> = (
  props
) => {
  const intl = useIntl()
  return (
    <ShareDialog {...props}>
      {({ openDialog: openShareDialog }) => (
        <Button
          size={['2rem', '2rem']}
          aria-label={intl.formatMessage({
            defaultMessage: 'Share',
            id: 'OKhRC6',
          })}
          aria-haspopup="dialog"
          bgColor="halfBlack"
          onClick={openShareDialog}
        >
          <Icon icon={IconShare} size={24} color="white" />
        </Button>
      )}
    </ShareDialog>
  )
}

export default ShareButton
