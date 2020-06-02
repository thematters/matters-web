import { useQuery } from '@apollo/react-hooks'
import Router from 'next/router'

import {
  Button,
  ButtonProps,
  IconBackLarge,
  IconLeftLarge,
  useResponsive,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { PATHS, TEXT } from '~/common/enums'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

type BackButtonProps = {
  mode?: 'black-solid'
} & ButtonProps

export const BackButton: React.FC<BackButtonProps> = ({ mode, ...props }) => {
  const isSmallUp = useResponsive('sm-up')
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })

  const onBack = () => {
    if (props.as || props.href || props.onClick) {
      if (props.onClick) {
        props.onClick()
      }
      return
    }

    const routeHistory = data?.clientPreference.routeHistory || []

    if (routeHistory.length > 0) {
      Router.back()
    } else {
      Router.push(PATHS.HOME)
    }
  }

  if (mode === 'black-solid') {
    return (
      <Button
        aria-label={TEXT.zh_hant.back}
        bgColor="half-black"
        onClick={onBack}
        {...props}
      >
        <IconBackLarge size="lg" color="white" />
      </Button>
    )
  }

  if (isSmallUp) {
    return (
      <Button
        aria-label={TEXT.zh_hant.back}
        bgColor="green-lighter"
        onClick={onBack}
        {...props}
      >
        <IconBackLarge size="lg" color="green" />
      </Button>
    )
  }

  return (
    <Button aria-label={TEXT.zh_hant.back} onClick={onBack} {...props}>
      <IconLeftLarge size="lg" />
    </Button>
  )
}

export default BackButton
