import React from 'react'
import MediaQuery from 'react-responsive'

import { BREAKPOINTS } from '~/common/enums'

const SmallDown: React.SFC = props => (
  <MediaQuery maxWidth={BREAKPOINTS.SMALL - 1} {...props} />
)
const MediumDown: React.SFC = props => (
  <MediaQuery maxWidth={BREAKPOINTS.MEDIUM - 1} {...props} />
)
const MediumUp: React.SFC = props => (
  <MediaQuery minWidth={BREAKPOINTS.MEDIUM} {...props} />
)

const XSmall = SmallDown
const Small: React.SFC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.SMALL}
    maxWidth={BREAKPOINTS.MEDIUM - 1}
    {...props}
  />
)
const Medium: React.SFC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.MEDIUM}
    maxWidth={BREAKPOINTS.LARGE - 1}
    {...props}
  />
)
const Large: React.SFC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.LARGE}
    maxWidth={BREAKPOINTS.XLARGE - 1}
    {...props}
  />
)
const XLarge: React.SFC = props => (
  <MediaQuery minWidth={BREAKPOINTS.XLARGE} {...props} />
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
