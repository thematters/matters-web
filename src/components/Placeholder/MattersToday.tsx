import React from 'react'
import ContentLoader from 'react-content-loader'

import { useResponsive } from '~/components/Hook'

import { LoaderProps } from './utils'

const XS = () => (
  <ContentLoader {...LoaderProps} width={375} height={330}>
    <path d="M0 0h375v206H0V0zm116 330v-20h130v20H44v-20h64v20h8zM16 234h343v28H16v-28zm0 36h251v28H16v-28zm10 60c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z" />
  </ContentLoader>
)

const MD = () => (
  <ContentLoader {...LoaderProps} width={639} height={330}>
    <path d="M0 0h639v206H0V0zm100 330v-20h130v20H28v-20h64v20h8zM0 234h607v28H0v-28zm0 36h336v28H0v-28zm10 60c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z" />
  </ContentLoader>
)

const LG = () => (
  <ContentLoader {...LoaderProps} width={704} height={330}>
    <path d="M0 0h704v206H0V0zm100 330v-20h130v20H28v-20h64v20h8zM0 234h672v28H0v-28zm0 36h336v28H0v-28zm10 60c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z" />
  </ContentLoader>
)

const MattersToday = () => {
  const isXSmall = useResponsive({ type: 'xs' })()
  const isSmall = useResponsive({ type: 'sm' })()
  const isMedium = useResponsive({ type: 'md' })()
  const isLarge = useResponsive({ type: 'lg' })()
  const isXLarge = useResponsive({ type: 'xl' })()

  if (isXSmall) {
    return <XS />
  }

  if (isSmall) {
    return <LG />
  }

  if (isMedium) {
    return <MD />
  }

  if (isLarge || isXLarge) {
    return <LG />
  }

  return null
}

export default MattersToday
