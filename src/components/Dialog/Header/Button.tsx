import {
  Button,
  ButtonProps,
  IconBack32,
  IconClose32,
  IconSpinner16,
  TextIcon,
  Translate,
} from '~/components'
import { useResponsive } from '~/components/Hook'

import { TEXT, TextId } from '~/common/enums'

interface CloseButtonProps {
  closeDialog: () => void
  textId?: TextId
}

export const CloseButton = ({ closeDialog, textId }: CloseButtonProps) => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <Button
      onClick={closeDialog}
      aria-label={TEXT.zh_hant[textId || 'cancel']}
      bgColor={isSmallUp ? 'green-lighter' : undefined}
      size={isSmallUp ? ['2rem', '2rem'] : undefined}
    >
      {!isSmallUp && (
        <TextIcon color="green" size="md">
          <Translate id={textId || 'cancel'} />
        </TextIcon>
      )}
      {isSmallUp && <IconClose32 size="lg" color="green" />}
    </Button>
  )
}

type BackButton = ButtonProps

export const BackButton: React.FC<BackButton> = (props) => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <Button
      aria-label={TEXT.zh_hant.previousStep}
      bgColor={isSmallUp ? 'green-lighter' : undefined}
      size={isSmallUp ? ['2rem', '2rem'] : undefined}
      {...props}
    >
      {!isSmallUp && (
        <TextIcon color="green" size="md">
          <Translate id="previousStep" />
        </TextIcon>
      )}
      {isSmallUp && <IconBack32 size="lg" color="green" />}
    </Button>
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
  const isSmallUp = useResponsive('sm-up')

  return (
    <Button
      {...buttonProps}
      size={isSmallUp ? [null, '2rem'] : undefined}
      spacing={isSmallUp ? [0, 'base'] : undefined}
      bgColor={isSmallUp ? 'green' : undefined}
    >
      <TextIcon
        color={isSmallUp ? 'white' : 'green'}
        size={isSmallUp ? 'md-s' : 'md'}
        weight="md"
        icon={loading && <IconSpinner16 size="sm" />}
      >
        {loading ? null : text}
      </TextIcon>
    </Button>
  )
}
