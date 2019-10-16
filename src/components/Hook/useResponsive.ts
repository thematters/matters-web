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

export const useResponsive = ({ type }: Props) => {
  switch (type) {
    case 'small-down':
      return useMediaQuery({ maxWidth: BREAKPOINTS.SM - 1 })
    case 'small-up':
      return useMediaQuery({ minWidth: BREAKPOINTS.SM })
    case 'medium-up':
      return useMediaQuery({ minWidth: BREAKPOINTS.MD })
    case 'large-up':
      return useMediaQuery({ minWidth: BREAKPOINTS.LG })
    case 'xsmall':
      return useMediaQuery({ maxWidth: BREAKPOINTS.SM - 1 })
    case 'small':
      return useMediaQuery({
        minWidth: BREAKPOINTS.SM,
        maxWidth: BREAKPOINTS.MD - 1
      })
    case 'medium':
      return useMediaQuery({
        minWidth: BREAKPOINTS.MD,
        maxWidth: BREAKPOINTS.LG - 1
      })
    case 'large':
      return useMediaQuery({
        minWidth: BREAKPOINTS.LG,
        maxWidth: BREAKPOINTS.XL - 1
      })
    case 'xlarge':
      return useMediaQuery({
        minWidth: BREAKPOINTS.XL
      })
  }
}
