import React from 'react'
import MediaQuery from 'react-responsive'

import { BREAKPOINTS } from '~/common/enums'

const SmallDown: React.SFC = props => (
  <MediaQuery maxWidth={BREAKPOINTS.Small - 1} {...props} />
)
const MediumDown: React.SFC = props => (
  <MediaQuery maxWidth={BREAKPOINTS.Medium - 1} {...props} />
)
const MediumUp: React.SFC = props => (
  <MediaQuery minWidth={BREAKPOINTS.Medium} {...props} />
)

const XSmall = SmallDown
const Small: React.SFC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.Small}
    maxWidth={BREAKPOINTS.Medium - 1}
    {...props}
  />
)
const Medium: React.SFC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.Medium}
    maxWidth={BREAKPOINTS.Large - 1}
    {...props}
  />
)
const Large: React.SFC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.Large}
    maxWidth={BREAKPOINTS.XLarge - 1}
    {...props}
  />
)
const XLarge: React.SFC = props => (
  <MediaQuery minWidth={BREAKPOINTS.XLarge} {...props} />
)

export const Responsive = {
  SmallDown,
  MediumDown,
  MediumUp,

  XSmall,
  Small,
  Medium,
  Large,
  XLarge
}
