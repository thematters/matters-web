import { forwardRef } from 'react'

import { Button, ButtonProps, IconSpinner16, TextIcon } from '~/components'

export type DialogTextButtonProps = {
  text: React.ReactNode
  color?: 'greyDarker' | 'green' | 'red'
  loading?: boolean
} & ButtonProps

export const TextButton: React.FC<DialogTextButtonProps> = ({
  text,
  color = 'green',
  loading,
  ...restProps
}) => {
  let buttonProps: ButtonProps = restProps

  switch (color) {
    case 'greyDarker':
      buttonProps = {
        ...buttonProps,
        textColor: 'greyDarker',
        textActiveColor: 'black',
      }
      break
    case 'green':
      buttonProps = {
        ...buttonProps,
        textColor: 'green',
        textActiveColor: 'greenDark',
      }
      break
    case 'red':
      buttonProps = {
        ...buttonProps,
        textColor: 'red',
        textActiveColor: 'redDark',
      }
      break
  }

  return (
    <Button {...buttonProps}>
      <TextIcon
        size="md"
        weight="md"
        icon={loading && <IconSpinner16 size="sm" />}
      >
        {!loading ? text : null}
      </TextIcon>
    </Button>
  )
}

export type DialogRoundedButtonProps = {
  text: React.ReactNode
  color?: 'greyDarker' | 'green' | 'red'
  icon?: React.ReactNode
  loading?: boolean
} & ButtonProps

export const RoundedButton: React.FC<
  React.PropsWithChildren<DialogRoundedButtonProps>
> = forwardRef(
  ({ text, color = 'green', loading, icon, disabled, ...restProps }, ref) => {
    let buttonProps: ButtonProps = restProps

    switch (color) {
      case 'greyDarker':
        buttonProps = {
          ...buttonProps,
          borderColor: 'greyDarker',
          textColor: 'greyDarker',
        }
        break
      case 'green':
        buttonProps = {
          ...buttonProps,
          borderColor: 'green',
          textColor: 'green',
        }
        break
      case 'red':
        buttonProps = { ...buttonProps, borderColor: 'red', textColor: 'red' }
        break
    }

    return (
      <Button
        size={['100%', '3rem']}
        disabled={disabled || loading}
        ref={ref}
        {...buttonProps}
      >
        <TextIcon
          icon={icon || (loading && <IconSpinner16 size="md" />)}
          size="xm"
          weight="md"
          textPlacement="left"
        >
          {!loading ? text : null}
        </TextIcon>
      </Button>
    )
  }
)

RoundedButton.displayName = 'RoundedButton'
