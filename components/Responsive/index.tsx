import React from 'react'
import MediaQuery from 'react-responsive'

import { BREAKPOINTS } from '~/common/enums'

const SmallDown: React.SFC = props => (
  <MediaQuery maxWidth={BREAKPOINTS.SM - 1} {...props} />
)
const MediumDown: React.SFC = props => (
  <MediaQuery maxWidth={BREAKPOINTS.MD - 1} {...props} />
)
const MediumUp: React.SFC = props => (
  <MediaQuery minWidth={BREAKPOINTS.MD} {...props} />
)

const XSmall = SmallDown
const Small: React.SFC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.SM}
    maxWidth={BREAKPOINTS.MD - 1}
    {...props}
  />
)
const Medium: React.SFC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.MD}
    maxWidth={BREAKPOINTS.LG - 1}
    {...props}
  />
)
const Large: React.SFC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.LG}
    maxWidth={BREAKPOINTS.LG - 1}
    {...props}
  />
)
const XLarge: React.SFC = props => (
  <MediaQuery minWidth={BREAKPOINTS.XL} {...props} />
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
