import { createMedia } from '@artsy/fresnel'

import { BREAKPOINTS } from '~/common/enums'

const AppMedia = createMedia({
  breakpoints: {
    sm: 0,
    md: BREAKPOINTS.MD,
    lg: BREAKPOINTS.LG,
    xl: BREAKPOINTS.XL,
  },
})

export const mediaStyle = AppMedia.createMediaStyle()
export const { Media, MediaContextProvider } = AppMedia
