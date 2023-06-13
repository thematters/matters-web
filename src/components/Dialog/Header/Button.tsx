import { useContext } from 'react'

import { TextId } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  IconBack32,
  IconClose32,
  IconSpinner16,
  LanguageContext,
  Media,
  TextIcon,
  Translate,
} from '~/components'

interface CloseButtonProps {
  closeDialog: () => void
  textId?: TextId
}

export const CloseButton = ({ closeDialog, textId }: CloseButtonProps) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Media at="sm">
        <Button
          onClick={closeDialog}
          aria-label={translate({ id: textId || 'cancel', lang })}
        >
          <TextIcon color="green" size="md">
            <Translate id={textId || 'cancel'} />
          </TextIcon>
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Button
          onClick={closeDialog}
          aria-label={translate({ id: textId || 'cancel', lang })}
          bgColor="greenLighter"
          size={['2rem', '2rem']}
        >
          <IconClose32 size="lg" color="green" />
        </Button>
      </Media>
    </>
  )
}

type BackButton = ButtonProps

export const BackButton: React.FC<BackButton> = (props) => {
  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Media at="sm">
        <Button aria-label={translate({ id: 'previousStep', lang })} {...props}>
          <TextIcon color="green" size="md">
            <Translate id="previousStep" />
          </TextIcon>
        </Button>
      </Media>

      <Media greaterThan="sm">
        <Button
          aria-label={translate({ id: 'previousStep', lang })}
          bgColor="greenLighter"
          size={['2rem', '2rem']}
          {...props}
        >
          <IconBack32 size="lg" color="green" />
        </Button>
      </Media>
    </>
  )
}

type RightButtonProps = {
  text: string | React.ReactNode
  loading?: boolean
} & ButtonProps

export const RightButton: React.FC<RightButtonProps> = ({
  text,
  loading,
  ...buttonProps
}) => {
  return (
    <>
      <Media at="sm">
        <Button {...buttonProps}>
          <TextIcon
            color="green"
            size="md"
            weight="md"
            icon={loading && <IconSpinner16 size="sm" />}
          >
            {loading ? null : text}
          </TextIcon>
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Button
          {...buttonProps}
          size={[null, '2rem']}
          spacing={[0, 'base']}
          bgColor="green"
        >
          <TextIcon
            color="white"
            size="mdS"
            weight="md"
            icon={loading && <IconSpinner16 size="sm" />}
          >
            {loading ? null : text}
          </TextIcon>
        </Button>
      </Media>
    </>
  )
}
