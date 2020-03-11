import {
  Button,
  ButtonProps,
  Icon,
  TextIcon,
  Translate,
  useResponsive
} from '~/components'

import { TEXT } from '~/common/enums'

const CancelButton = (props: ButtonProps) => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <Button
      aria-label={TEXT.zh_hant.cancel}
      bgColor={isSmallUp ? 'grey-lighter' : undefined}
      bgActiveColor={isSmallUp ? 'green-lighter' : undefined}
      size={isSmallUp ? ['2rem', '2rem'] : undefined}
      {...props}
    >
      {!isSmallUp && (
        <TextIcon color="green" size="md">
          <Translate id="cancel" />
        </TextIcon>
      )}
      {isSmallUp && <Icon.CloseLarge size="lg" color="green" />}
    </Button>
  )
}

export default CancelButton
