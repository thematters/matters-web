import Router from 'next/router'

import { Button, ButtonProps, Icon, useResponsive } from '~/components'

import { TEXT } from '~/common/enums'

type BackButtonProps = {
  mode?: 'black-solid'
} & ButtonProps

export const BackButton: React.FC<BackButtonProps> = ({ mode, ...props }) => {
  const isSmallUp = useResponsive('sm-up')
  const onBack = () => {
    Router.back()

    // TODO: if previous url isn't onsite
  }

  if (mode === 'black-solid') {
    return (
      <Button
        aria-label={TEXT.zh_hant.close}
        bgColor="half-black"
        onClick={onBack}
        {...props}
      >
        <Icon.BackLarge size="lg" color="white" />
      </Button>
    )
  }

  if (isSmallUp) {
    return (
      <Button
        aria-label={TEXT.zh_hant.close}
        bgColor="green-lighter"
        onClick={onBack}
        {...props}
      >
        <Icon.BackLarge size="lg" color="green" />
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
