import { createMedia } from '@artsy/fresnel'

import { BREAKPOINTS } from '~/common/enums'

const AppMedia = createMedia({
  breakpoints: {
    sm: 0,
    md: BREAKPOINTS.SM,
    lg: BREAKPOINTS.MD,
    xl: BREAKPOINTS.LG,
  },
})

export const mediaStyle = AppMedia.createMediaStyle()
export const { Media, MediaContextProvider } = AppMedia
