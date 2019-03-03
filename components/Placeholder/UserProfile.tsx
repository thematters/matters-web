import React from 'react'
import ContentLoader from 'react-content-loader'

import { Responsive } from '~/components/Responsive'

import { LoaderProps } from './utils'

const XS = () => (
  <ContentLoader {...LoaderProps} width={328} height={226}>
    <path d="M0 90h46v27H0V90zm0 39h328v16H0v-16zm0 57h62v16H0v-16zm118 0h62v16h-62v-16zM12 210h39v16H12v-16zm118 0h39v16h-39v-16zM35 0c19.33 0 35 15.67 35 35S54.33 70 35 70 0 54.33 0 35 15.67 0 35 0z" />
  </ContentLoader>
)

const SM = () => (
  <ContentLoader
    {...LoaderProps}
    width={516}
    height={140}
    style={{ height: 140 }}
  >
    <path d="M188 3h46v27h-46V3zm0 39h328v16H188V42zm0 57h62v16h-62V99zm118 0h62v16h-62V99zm-106 24h39v16h-39v-16zm118 0h39v16h-39v-16zM70 0c38.66 0 70 31.34 70 70s-31.34 70-70 70S0 108.66 0 70 31.34 0 70 0z" />
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
