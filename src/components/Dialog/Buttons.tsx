import { forwardRef } from 'react'

import { Button, ButtonProps, Spinner, TextIcon } from '~/components'

export type DialogTextButtonProps = {
  text: React.ReactNode
  color?: 'greyDarker' | 'green' | 'red' | 'black'
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
    case 'red':
      buttonProps = {
        ...buttonProps,
        textColor: 'black',
        textActiveColor: 'greyDarker',
      }
      break
  }

  return (
    <Button {...buttonProps}>
      <TextIcon size="md" weight="md" icon={loading && <Spinner />}>
        {!loading ? text : null}
      </TextIcon>
    </Button>
  )
}

export type DialogRoundedButtonProps = {
  text: React.ReactNode
  textSize?: 'sm' | 'xm' | 'md'
  textWeight?: 'md' | 'normal'

  color?: 'greyDarker' | 'green' | 'red' | 'white' | 'black'
  icon?: React.ReactNode
  loading?: boolean
} & ButtonProps

export const RoundedButton: React.FC<
  React.PropsWithChildren<DialogRoundedButtonProps>
> = forwardRef(
  (
    {
      text,
      textSize = 'xm',
      textWeight = 'md',
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
        disabled={disabled || loading}
        ref={ref}
        {...buttonProps}
      >
        <TextIcon
          icon={icon || (loading && <Spinner size="md" />)}
          size={textSize}
          weight={textWeight}
          textPlacement="left"
        >
          {!loading ? text : null}
        </TextIcon>
      </Button>
    )
  }
)

RoundedButton.displayName = 'RoundedButton'
