import { useContext } from 'react'

import { translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  IconClose32,
  LanguageContext,
  TextIcon,
  Translate,
  useResponsive,
} from '~/components'

const CancelButton = (props: ButtonProps) => {
  const { lang } = useContext(LanguageContext)

  const isSmallUp = useResponsive('sm-up')

  return (
    <Button
      aria-label={translate({ id: 'cancel', lang })}
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
