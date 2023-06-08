import { forwardRef } from 'react'

import { Button, ButtonProps, IconSpinner16, TextIcon } from '~/components'

type DialogFooterButtonProps = {
  icon?: React.ReactNode
  loading?: boolean
  implicit?: boolean
} & ButtonProps

const DialogFooterButton: React.FC<
  React.PropsWithChildren<DialogFooterButtonProps>
> = forwardRef(
  (
    {
      loading,
      textColor = 'white',
      bgColor = 'green',

      icon,

      disabled,
      children,

      implicit,

      ...restProps
    },
    ref
  ) => (
    <Button
      bgColor={implicit ? 'white' : bgColor}
      size={['100%', '3rem']}
      disabled={disabled || loading}
      ref={ref}
      {...restProps}
    >
      <TextIcon
        icon={icon || (loading && <IconSpinner16 size="md" />)}
        color={implicit ? 'greyDark' : textColor}
        size={implicit ? 'sm' : 'md'}
        weight={implicit ? 'normal' : 'md'}
        textPlacement="left"
        textDecoration={implicit ? 'underline' : undefined}
      >
        {loading ? null : children}
      </TextIcon>
    </Button>
  )
)

DialogFooterButton.displayName = 'DialogFooterButton'

export default DialogFooterButton
