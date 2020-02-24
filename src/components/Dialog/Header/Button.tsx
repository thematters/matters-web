import { forwardRef } from 'react'

import { Button, ButtonProps, Icon, TextIcon, Translate } from '~/components'
import { useResponsive } from '~/components/Hook'

import { TEXT } from '~/common/enums'

interface CloseButtonProps {
  close: () => void
  ref: React.Ref<any>
}

export const CloseButton = forwardRef(({ close }: CloseButtonProps, ref) => {
  const isSmallUp = useResponsive({ type: 'sm-up' })()

  if (!process.browser) {
    return null
  }

  return (
    <Button
      onClick={close}
      aria-label="關閉"
      ref={ref}
      bgColor={isSmallUp ? 'grey-lighter' : undefined}
      bgHoverColor={isSmallUp ? 'green-lighter' : undefined}
      size={isSmallUp ? ['2rem', '2rem'] : undefined}
    >
      {!isSmallUp && (
        <TextIcon color="green" size="md">
          <Translate
            zh_hant={TEXT.zh_hant.cancel}
            zh_hans={TEXT.zh_hans.cancel}
          />
        </TextIcon>
      )}
      {isSmallUp && <Icon.CloseGreenMedium size="lg" />}
    </Button>
  )
})

type RightButtonProps = {
  text: string | React.ReactNode
  loading?: boolean
} & ButtonProps

export const RightButton: React.FC<RightButtonProps> = ({
  text,
  loading,
  ...buttonProps
}) => {
  const isSmallUp = useResponsive({ type: 'sm-up' })()

  if (!process.browser) {
    return null
  }

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
        icon={loading && <Icon.Spinner size="sm" />}
      >
        {loading ? null : text}
      </TextIcon>
    </Button>
  )
}
