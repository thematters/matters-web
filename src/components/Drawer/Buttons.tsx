import { Button, ButtonProps } from '~/components'

export type DrawerTextButtonProps = {
  text: React.ReactNode
  color?: 'black'
} & ButtonProps

export const TextButton: React.FC<DrawerTextButtonProps> = ({
  text,
  color = 'black',
  ...restProps
}) => {
  let buttonProps: ButtonProps = restProps
  switch (color) {
    case 'black':
      buttonProps = {
        ...buttonProps,
        textColor: 'black',
        textActiveColor: 'greyDarker',
      }
      break
  }

  return <Button {...buttonProps}>{text}</Button>
}
