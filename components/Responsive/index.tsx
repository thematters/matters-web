import React from 'react'
import MediaQuery from 'react-responsive'

import { BREAKPOINTS } from '~/common/enums'

const SmallDown: React.FC = props => (
  <MediaQuery maxWidth={BREAKPOINTS.SM - 1} {...props} />
)
const MediumDown: React.FC = props => (
  <MediaQuery maxWidth={BREAKPOINTS.MD - 1} {...props} />
)

const SmallUp: React.FC = props => (
  <MediaQuery minWidth={BREAKPOINTS.SM} {...props} />
)
const MediumUp: React.FC = props => (
  <MediaQuery minWidth={BREAKPOINTS.MD} {...props} />
)

const XSmall = SmallDown
const Small: React.FC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.SM}
    maxWidth={BREAKPOINTS.MD - 1}
    {...props}
  />
)
const Medium: React.FC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.MD}
    maxWidth={BREAKPOINTS.LG - 1}
    {...props}
  />
)
const Large: React.FC = props => (
  <MediaQuery
    minWidth={BREAKPOINTS.LG}
    maxWidth={BREAKPOINTS.LG - 1}
    {...props}
  />
)
const XLarge: React.FC = props => (
  <MediaQuery minWidth={BREAKPOINTS.XL} {...props} />
)

export const Responsive = {
  SmallDown,
  MediumDown,

  SmallUp,
  MediumUp,

  XSmall,
  Small,
  Medium,
  Large,
  XLarge
}
