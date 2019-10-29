import { useMediaQuery } from 'react-responsive'

import { BREAKPOINTS } from '~/common/enums'

interface Props {
  type:
    | 'small-down'
    | 'small-up'
    | 'medium-up'
    | 'large-up'
    | 'small'
    | 'xsmall'
    | 'medium'
    | 'large'
    | 'xlarge'
}

const useSmallDown = () => useMediaQuery({ maxWidth: BREAKPOINTS.SM - 1 })
const useSmallUp = () => useMediaQuery({ minWidth: BREAKPOINTS.SM })
const useMediaUp = () => useMediaQuery({ minWidth: BREAKPOINTS.MD })
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
    case 'small-down':
      return useSmallDown
    case 'small-up':
      return useSmallUp
    case 'medium-up':
      return useMediaUp
    case 'large-up':
      return useLargeUp
    case 'xsmall':
      return useXSmall
    case 'small':
      return useSmall
    case 'medium':
      return useMedium
    case 'large':
      return useLarge
    case 'xlarge':
      return useXLarge
  }
}
