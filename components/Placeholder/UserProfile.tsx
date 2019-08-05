import React from 'react'
import ContentLoader from 'react-content-loader'

import { Responsive } from '~/components'

import { LoaderProps } from './utils'

const XS = () => (
  <ContentLoader {...LoaderProps} width={328} height={313}>
    <path d="M0 0H328V120H0V0Z" />
    <rect x="13" y="103" width="67.5976" height="67.5976" rx="33.7988" stroke="white" stroke-width="4"/>
    <rect x="15" y="190.402" width="48.1524" height="21.8049" />
    <rect x="15" y="234.012" width="298" height="14.5366" />
    <rect x="15" y="255.817" width="194.427" height="14.5366" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 292.159H51.4222V312.146H15V292.159ZM89.5 292.159H125.922V312.146H89.5V292.159ZM200.422 292.159H164V312.146H200.422V292.159Z" />
  </ContentLoader>
)

const SM = () => (
  <ContentLoader {...LoaderProps} width={1080} height={503}>
    <path d="M0 0H1080V296C1080 298.209 1078.21 300 1076 300H4.00001C1.79087 300 0 298.209 0 296V0Z" />
    <rect x="186" y="266" width="144" height="144" rx="72" stroke="white" stroke-width="4" />
    <rect x="352" y="327" width="88" height="24" />
    <rect x="352" y="375" width="540" height="16" />
    <rect x="352" y="399" width="540" height="16" />
    <rect x="352" y="423" width="352" height="16" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M352 481H418V503H352V481ZM487 481H553V503H487V481ZM688 481H622V503H688V481Z" />
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
