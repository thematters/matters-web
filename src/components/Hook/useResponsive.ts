import { useMediaQuery } from 'react-responsive'

import { BREAKPOINTS } from '~/common/enums'

interface Props {
  type:
    | 'sm-down'
    | 'sm-up'
    | 'md-up'
    | 'lg-up'
    | 'sm'
    | 'xs'
    | 'md'
    | 'lg'
    | 'xl'
}

const useSmallDown = () => useMediaQuery({ maxWidth: BREAKPOINTS.SM - 1 })
const useSmallUp = () => useMediaQuery({ minWidth: BREAKPOINTS.SM })
const useMediumUp = () => useMediaQuery({ minWidth: BREAKPOINTS.MD })
const useLargeUp = () => useMediaQuery({ minWidth: BREAKPOINTS.LG })
const useXSmall = () => useMediaQuery({ maxWidth: BREAKPOINTS.SM - 1 })
const useSmall = () =>
  useMediaQuery({
    minWidth: BREAKPOINTS.SM,
    maxWidth: BREAKPOINTS.MD - 1
  })
const useMedium = () =>
  useMediaQuery({
    minWidth: BREAKPOINTS.MD,
    maxWidth: BREAKPOINTS.LG - 1
  })
const useLarge = () =>
  useMediaQuery({
    minWidth: BREAKPOINTS.LG,
    maxWidth: BREAKPOINTS.XL - 1
  })
const useXLarge = () =>
  useMediaQuery({
    minWidth: BREAKPOINTS.XL
  })

export const useResponsive = ({ type }: Props) => {
  switch (type) {
    case 'sm-down':
      return useSmallDown
    case 'sm-up':
      return useSmallUp
    case 'md-up':
      return useMediumUp
    case 'lg-up':
      return useLargeUp
    case 'xs':
      return useXSmall
    case 'sm':
      return useSmall
    case 'md':
      return useMedium
    case 'lg':
      return useLarge
    case 'xl':
      return useXLarge
  }
}
