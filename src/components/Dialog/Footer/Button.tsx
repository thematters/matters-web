import { forwardRef } from 'react'

import { Button, ButtonProps, Icon, TextIcon } from '~/components'

type DialogFooterButtonProps = {
  textColor?: 'black' | 'white'
  bgColor?: 'green' | 'grey-lighter' | 'red'

  loading?: boolean
} & ButtonProps

const DialogFooterButton: React.FC<DialogFooterButtonProps> = forwardRef(
  (
    {
      loading,
      textColor = 'white',
      bgColor = 'green',

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
        icon={loading && <Icon.Spinner size="md" />}
        color={textColor}
        size="md"
        weight="md"
      >
        {loading ? null : children}
      </TextIcon>
    </Button>
  )
)

export default DialogFooterButton
