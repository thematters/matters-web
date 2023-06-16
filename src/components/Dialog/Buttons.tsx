import { forwardRef } from 'react'

import { TextId } from '~/common/enums'
import {
  Button,
  ButtonProps,
  IconSpinner16,
  TextIcon,
  Translate,
} from '~/components'

type TextButtonProps = {
  text: string | React.ReactNode
  color: 'greyDarker' | 'green' | 'red'
  loading?: boolean
} & ButtonProps

export const TextButton: React.FC<TextButtonProps> = ({
  text,
  color,
  loading,
  ...restProps
}) => {
  let buttonProps: ButtonProps = restProps

  switch (color) {
    case 'greyDarker':
      buttonProps = { ...buttonProps, textColor: 'greyDarker' }
      break
    case 'green':
      buttonProps = { ...buttonProps, textColor: 'green' }
      break
    case 'red':
      buttonProps = { ...buttonProps, textColor: 'red' }
      break
  }

  return (
    <Button {...buttonProps}>
      <TextIcon
        size="md"
        weight="md"
        icon={loading && <IconSpinner16 size="sm" />}
      >
        {!loading ? (
          typeof text === 'string' ? (
            <Translate id={text as TextId} />
          ) : (
            text
          )
        ) : null}
      </TextIcon>
    </Button>
  )
}

type RoundedButtonProps = {
  text: string | React.ReactNode
  color: 'greyDarker' | 'green' | 'red'
  icon?: React.ReactNode
  loading?: boolean
} & ButtonProps

export const RoundedButton: React.FC<
  React.PropsWithChildren<RoundedButtonProps>
> = forwardRef(
  ({ text, color, loading, icon, disabled, ...restProps }, ref) => {
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
          {!loading ? (
            typeof text === 'string' ? (
              <Translate id={text as TextId} />
            ) : (
              text
            )
          ) : null}
        </TextIcon>
      </Button>
    )
  }
)

RoundedButton.displayName = 'RoundedButton'
