import React from 'react'
import ContentLoader from 'react-content-loader'

import { useResponsive } from '~/components/Hook'

import { LoaderProps } from './utils'

const XS = () => (
  <ContentLoader {...LoaderProps} width={320} height={309}>
    <path d="M84.24 112a35.02 35.02 0 0 0-66.48 0H0V0h320v112H84.24zM51 92a31 31 0 1 1 0 62 31 31 0 0 1 0-62zm-35 85h53v24H16v-24zm0 38h288v16H16v-16zm0 21h214v16H16v-16zm0 51h40.09v22H16v-22zm82 0h40.09v22H98v-22zm122.09 0v22H180v-22h40.09z" />
  </ContentLoader>
)

const SM = () => (
  <ContentLoader {...LoaderProps} width={704} height={385}>
    <path d="M133.05 195.55A70 70 0 0 0 70 156a70 70 0 0 0-63.05 39.55H0V0h704v195.55H133.05zM70 160a66 66 0 1 1 0 132 66 66 0 0 1 0-132zm115 63h88v24h-88v-24zm0 39h517v16H185v-16zm0 24h517v16H185v-16zm0 24h352v16H185v-16zm0 53h66v22h-66v-22zm135 0h66v22h-66v-22zm201 0v22h-66v-22h66z" />
  </ContentLoader>
)

const MD = () => (
  <ContentLoader {...LoaderProps} width={960} height={456}>
    <path
      fillRule="evenodd"
      d="M313 294h88v24h-88v-24zm0 39h540v16H313v-16zm0 24h540v16H313v-16zm0 24h352v16H313v-16zm0 53h66v22h-66v-22zm135 0h66v22h-66v-22zm201 0v22h-66v-22h66zM258.1 266.66A70 70 0 0 0 195 227a70 70 0 0 0-63.1 39.66H0V0h960v266.66H258.1zM195 231a66 66 0 1 1 0 132 66 66 0 0 1 0-132z"
    />
  </ContentLoader>
)

const LG = () => (
  <ContentLoader {...LoaderProps} width={1080} height={503}>
    <path
      fillRule="evenodd"
      d="M321.26 300a70 70 0 0 0-126.52 0H4a4 4 0 0 1-4-4V0h1080v296a4 4 0 0 1-4 4H321.26zM258 264a66 66 0 1 1 0 132 66 66 0 0 1 0-132zm118 63h88v24h-88v-24zm0 39h540v16H376v-16zm0 24h540v16H376v-16zm0 24h352v16H376v-16zm0 53h66v22h-66v-22zm135 0h66v22h-66v-22zm201 0v22h-66v-22h66z"
    />
  </ContentLoader>
)

const UserProfile = () => {
  const isXSmall = useResponsive({ type: 'xsmall' })
  const isSmall = useResponsive({ type: 'small' })
  const isMedium = useResponsive({ type: 'medium' })
  const isLargeUp = useResponsive({ type: 'large-up' })

  if (isXSmall) {
    return <XS />
  }

  if (isSmall) {
    return <SM />
  }

  if (isMedium) {
    return <MD />
  }

  if (isLargeUp) {
    return <LG />
  }

  return null
}

export default UserProfile
