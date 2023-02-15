import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  IconClose32,
  LanguageContext,
  Media,
  TextIcon,
} from '~/components'

const CancelButton = (props: ButtonProps) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Media at="sm">
        <Button aria-label={translate({ id: 'cancel', lang })} {...props}>
          <TextIcon color="green" size="md">
            <FormattedMessage defaultMessage="Cancel" description="Cancel button" />          </TextIcon>
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Button
          aria-label={translate({ id: 'cancel', lang })}
          bgColor="green-lighter"
          size={['2rem', '2rem']}
          {...props}
        >
          <IconClose32 size="lg" color="green" />
        </Button>
      </Media>
    </>
  )
}

export default CancelButton
