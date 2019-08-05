import React from 'react'
import ContentLoader from 'react-content-loader'

import { Responsive } from '~/components'

import { LoaderProps } from './utils'

const XS = () => (
  <ContentLoader {...LoaderProps} width={328} height={245}>
    <rect x="0" y="0" rx="0" ry="0" width="328" height="120" />
    <circle cx="45" cy="135" r="35" />
    <rect x="15" y="175" rx="0" ry="0" width="151" height="15" />
    <rect x="15" y="200" rx="0" ry="0" width="295" height="15" />
    <rect x="15" y="225" rx="0" ry="0" width="80" height="15" />
    <rect x="110" y="225" rx="0" ry="0" width="80" height="15" />
    <rect x="210" y="225" rx="0" ry="0" width="80" height="15" />
  </ContentLoader>
)

const SM = () => (
  <ContentLoader {...LoaderProps} width={1080} height={460}>
    <rect x="0" y="0" rx="0" ry="0" width="1080" height="280" />
    <circle cx="258" cy="308" r="70" />
    <rect x="352" y="304" width="151" height="25" />
    <rect x="352" y="352" width="540" height="25" />
    <rect x="352" y="400" width="100" height="25" />
    <rect x="473" y="400" width="100" height="25" />
    <rect x="597" y="400" width="100" height="25" />
  </ContentLoader>
)

const UserProfile = () => (
  <>
    <Responsive.XSmall>
      <XS />
    </Responsive.XSmall>

    <Responsive.SmallUp>
      <SM />
    </Responsive.SmallUp>
  </>
)

export default UserProfile
