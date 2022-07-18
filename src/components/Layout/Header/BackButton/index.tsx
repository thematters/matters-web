import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  Button,
  ButtonProps,
  IconBack32,
  IconLeft32,
  LanguageContext,
  useResponsive,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { PATHS } from '~/common/enums'
import { translate } from '~/common/utils'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

type BackButtonProps = {
  mode?: 'black-solid'
  onClick?: () => void
} & ButtonProps

export const BackButton: React.FC<BackButtonProps> = ({
  mode,
  onClick,
  ...props
}) => {
  const { lang } = useContext(LanguageContext)

  const router = useRouter()
  const isSmallUp = useResponsive('sm-up')
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })

  const onBack = () => {
    if (props.href || onClick) {
      onClick?.()
      return
    }

    const routeHistory = data?.clientPreference.routeHistory || []

    console.log('onBack:', { routeHistory })

    if (routeHistory.length > 0) {
      router.back()
    } else {
      router.push(PATHS.HOME)
    }
  }

  if (mode === 'black-solid') {
    return (
      <Button
        aria-label={translate({ id: 'back', lang })}
        bgColor="half-black"
        onClick={onBack}
        {...props}
      >
        <IconBack32 size="lg" color="white" />
      </Button>
    )
  }

  if (isSmallUp) {
    return (
      <Button
        aria-label={translate({ id: 'back', lang })}
        bgColor="green-lighter"
        onClick={onBack}
        {...props}
      >
        <IconBack32 size="lg" color="green" />
      </Button>
    )
  }

  return (
    <Button
      aria-label={translate({ id: 'back', lang })}
      onClick={onBack}
      {...props}
    >
      <IconLeft32 size="lg" />
    </Button>
  )
}

export default BackButton
