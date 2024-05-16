import { useIntl } from 'react-intl'

import { ReactComponent as IconShare } from '@/public/static/icons/24px/share.svg'
import {
  Button,
  ButtonProps,
  Icon,
  IconColor,
  IconSize,
  ShareDialog,
  ShareDialogProps,
} from '~/components'

type ShareButtonBaseProps = {
  hasIcon?: boolean
  iconSize?: Extract<IconSize, 20 | 24>
  iconColor?: Extract<IconColor, 'green' | 'grey' | 'black' | 'white'>
  inCard: boolean
} & Omit<ShareDialogProps, 'children'>

type ShareButtonProps = ShareButtonBaseProps &
  Pick<
    ButtonProps,
    'bgColor' | 'size' | 'spacing' | 'disabled' | 'textActiveColor'
  >

export const ShareButton: React.FC<
  React.PropsWithChildren<ShareButtonProps>
> = ({
  children,
  textActiveColor,
  bgColor,
  hasIcon = true,
  iconSize,
  iconColor = 'black',
  disabled,
  inCard,
  size,
  spacing,
  ...props
}) => {
  const intl = useIntl()

  const buttonSpacing = spacing || [8, 8]

  return (
    <ShareDialog {...props}>
      {({ openDialog }) => (
        <Button
          bgColor={bgColor}
          size={size}
          textColor={iconColor}
          textActiveColor={textActiveColor}
          spacing={buttonSpacing}
          aria-label={intl.formatMessage({
            defaultMessage: 'Share',
            id: 'OKhRC6',
          })}
          aria-haspopup="dialog"
          onClick={openDialog}
          disabled={disabled}
        >
          {hasIcon && <Icon icon={IconShare} size={iconSize} />}
          {children}
        </Button>
      )}
    </ShareDialog>
  )
}
