import { forwardRef } from 'react'

import { Button, ButtonProps, IconSpinner, TextIcon } from '~/components'

type DialogFooterButtonProps = {
  textColor?: 'black' | 'white' | 'grey'
  bgColor?: 'green' | 'grey-lighter' | 'red' | 'white'
  icon?: React.ReactNode

  loading?: boolean
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
      ...restProps
    },
    ref
  ) => (
    <Button
      bgColor={bgColor}
      size={['100%', '3rem']}
      disabled={disabled || loading}
      ref={ref}
      {...restProps}
    >
      <TextIcon
        icon={icon || (loading && <IconSpinner size="md" />)}
        color={textColor}
        size="md"
        weight="md"
        textPlacement="left"
      >
        {loading ? null : children}
      </TextIcon>
    </Button>
  )
)

export default DialogFooterButton
