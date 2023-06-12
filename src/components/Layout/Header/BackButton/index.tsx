import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { PATHS } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  IconBack32,
  IconLeft32,
  LanguageContext,
  Media,
} from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { ClientPreferenceQuery } from '~/gql/graphql'

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
  const { data } = useQuery<ClientPreferenceQuery>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })

  const onBack = () => {
    if (props.href || onClick) {
      onClick?.()
      return
    }

    const routeHistory = data?.clientPreference.routeHistory || []

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
        bgColor="halfBlack"
        onClick={onBack}
        {...props}
      >
        <IconBack32 size="lg" color="white" />
      </Button>
    )
  }

  return (
    <>
      <Media at="sm">
        <Button
          aria-label={translate({ id: 'back', lang })}
          onClick={onBack}
          {...props}
        >
          <IconLeft32 size="lg" />
        </Button>
      </Media>
      <Media greaterThan="sm">
        <Button
          aria-label={translate({ id: 'back', lang })}
          bgColor="greenLighter"
          onClick={onBack}
          {...props}
        >
          <IconBack32 size="lg" color="green" />
        </Button>
      </Media>
    </>
  )
}

export default BackButton
