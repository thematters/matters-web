import {
  Button,
  ButtonProps,
  IconClose32,
  TextIcon,
  Translate,
  useResponsive,
} from '~/components'

import { TEXT } from '~/common/enums'

const CancelButton = (props: ButtonProps) => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <Button
      aria-label={TEXT.zh_hant.cancel}
      bgColor={isSmallUp ? 'green-lighter' : undefined}
      size={isSmallUp ? ['2rem', '2rem'] : undefined}
      {...props}
    >
      {!isSmallUp && (
        <TextIcon color="green" size="md">
          <Translate id="cancel" />
        </TextIcon>
      )}
      {isSmallUp && <IconClose32 size="lg" color="green" />}
    </Button>
  )
}

export default CancelButton
