import { useQuery } from '@apollo/react-hooks'

import CLIENT_INFO from '~/components/GQL/queries/clientInfo'

import { BREAKPOINTS } from '~/common/enums'

import { ClientInfo } from '~/components/GQL/queries/__generated__/ClientInfo'

type Type =
  | 'sm-down'
  | 'sm-up'
  | 'md-up'
  | 'lg-up'
  | 'sm'
  | 'xs'
  | 'md'
  | 'lg'
  | 'xl'

export const useResponsive = (type: Type) => {
  const { data } = useQuery<ClientInfo>(CLIENT_INFO, {
    variables: { id: 'local' }
  })
  const isPhone = data?.clientInfo.isPhone
  const isTablet = data?.clientInfo.isTablet
  const defaultWidth = isPhone
    ? BREAKPOINTS.SM
    : isTablet
    ? BREAKPOINTS.MD
    : BREAKPOINTS.LG
  const width = data?.clientInfo.viewportSize.width || defaultWidth

  if (!width) {
    return false
  }

  switch (type) {
    case 'sm-down':
      return width < BREAKPOINTS.SM - 1
    case 'sm-up':
      return width >= BREAKPOINTS.SM
    case 'md-up':
      return width >= BREAKPOINTS.MD
    case 'lg-up':
      return width >= BREAKPOINTS.LG
    case 'xs':
      return width < BREAKPOINTS.SM - 1
    case 'sm':
      return width >= BREAKPOINTS.SM && width < BREAKPOINTS.MD - 1
    case 'md':
      return width >= BREAKPOINTS.MD && width < BREAKPOINTS.LG - 1
    case 'lg':
      return width >= BREAKPOINTS.LG && width < BREAKPOINTS.XL - 1
    case 'xl':
      return width >= BREAKPOINTS.XL
  }
}
