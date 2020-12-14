import { forwardRef } from 'react'

import { Button, ButtonProps, IconSpinner, TextIcon } from '~/components'

type DialogFooterButtonProps = {
  textColor?: 'black' | 'white' | 'grey'
  bgColor?: 'green' | 'grey-lighter' | 'red' | 'white' | 'gold'
  icon?: React.ReactNode

  loading?: boolean
  implicit?: boolean
} & Omit<ButtonProps, 'bgColor'>

const DialogFooterButton: React.FC<DialogFooterButtonProps> = forwardRef(
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
        icon={icon || (loading && <IconSpinner size="md" />)}
        color={implicit ? 'grey-dark' : textColor}
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

export default DialogFooterButton
