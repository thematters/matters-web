import { Button, ButtonProps } from '~/components'

export const SettingsButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => (
  <Button
    size={[null, '1.5rem']}
    spacing={[0, 12]}
    textColor="green"
    textActiveColor="greenDark"
    borderColor="green"
    borderActiveColor="greenDark"
    {...props}
  >
    {children}
  </Button>
)
