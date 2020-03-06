import Router from 'next/router'

import { Button, ButtonProps, Icon, useResponsive } from '~/components'

import { TEXT } from '~/common/enums'

export const BackButton: React.FC<ButtonProps> = props => {
  const isSmallUp = useResponsive('sm-up')
  const onBack = () => {
    Router.back()

    // TODO: if previous url isn't onsite
  }

  if (isSmallUp) {
    return (
      <Button
        aria-label={TEXT.zh_hant.close}
        bgColor="green-lighter"
        onClick={onBack}
        {...props}
      >
        <Icon.BackGreenLarge size="lg" />
      </Button>
    )
  }

  return (
    <Button aria-label={TEXT.zh_hant.close} onClick={onBack} {...props}>
      <Icon.LeftLarge size="lg" />
    </Button>
  )
}

export default BackButton
