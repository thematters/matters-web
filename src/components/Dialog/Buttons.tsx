import { forwardRef } from 'react'

import { Button, ButtonProps, Spinner, TextIcon } from '~/components'

export type DialogTextButtonProps = {
  text: React.ReactNode
  color?: 'greyDarker' | 'green' | 'red' | 'black'
  loading?: boolean
  icon?: React.ReactNode
} & ButtonProps

export const TextButton: React.FC<DialogTextButtonProps> = ({
  text,
  color = 'green',
  loading,
  icon,
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
        size={16}
        weight="medium"
        icon={icon || (loading && <Spinner />)}
      >
        {!loading ? text : null}
      </TextIcon>
    </Button>
  )
}

export type DialogRoundedButtonProps = {
  text: React.ReactNode
  textSize?: 14 | 16 | 18
  textWeight?: 'medium' | 'normal'

  color?: 'greyDarker' | 'green' | 'red' | 'white' | 'black'
  icon?: React.ReactNode
  loading?: boolean
} & ButtonProps

export const RoundedButton = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<DialogRoundedButtonProps>
>(
  (
    {
      text,
      textSize = 18,
      textWeight = 'medium',
      color = 'green',
      loading,
      icon,
      disabled,
      ...restProps
    },
    ref
  ) => {
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
      case 'white':
        buttonProps = {
          ...buttonProps,
          textColor: 'white',
        }
        break
      case 'black':
        buttonProps = {
          ...buttonProps,
          borderColor: 'greyLight',
          textColor: 'black',
        }
        break
    }

    return (
      <Button
        size={['100%', '3rem']}
        borderWidth="sm"
        disabled={disabled || loading}
        ref={ref}
        {...buttonProps}
      >
        <TextIcon
          icon={icon || (loading && <Spinner size={24} />)}
          size={textSize}
          weight={textWeight}
          placement="left"
        >
          {!loading ? text : null}
        </TextIcon>
      </Button>
    )
  }
)

RoundedButton.displayName = 'RoundedButton'
