import React from 'react'
import ContentLoader from 'react-content-loader'

import { useResponsive } from '~/components/Hook'

import { LoaderProps } from './utils'

const XS = () => (
  <ContentLoader {...LoaderProps} width={343} height={533}>
    <path d="M0 177h343v16H0v-16zm0 30h343v16H0v-16zm0 30h343v16H0v-16zm0 30h343v16H0v-16zm0 30h343v16H0v-16zm0 30h56.5v16H0v-16zm0 40h343v16H0v-16zm0 30h343v16H0v-16zm0 30h343v16H0v-16zm0 30h343v16H0v-16zm0 30h343v16H0v-16zm0 30h56.5v16H0v-16zM0 76h170v24H0V76zm0 38h123v12H0v-12zM49 2h80v16H49V2zm0 20h137v16H49V22zM20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0z" />
  </ContentLoader>
)

const MD = () => (
  <ContentLoader {...LoaderProps} width={623} height={533}>
    <path d="M15 177h608v16H15v-16zm0 30h608v16H15v-16zm0 30h608v16H15v-16zm0 30h608v16H15v-16zm0 30h608v16H15v-16zm0 30h336.5v16H15v-16zm0 40h608v16H15v-16zm0 30h608v16H15v-16zm0 30h608v16H15v-16zm0 30h608v16H15v-16zm0 30h608v16H15v-16zm0 30h336.5v16H15v-16zm1-441h450v24H16V76zm0 38h123v12H16v-12zM49 2h80v16H49V2zm0 20h417v16H49V22zM20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0z" />
  </ContentLoader>
)

const LG = () => (
  <ContentLoader {...LoaderProps} width={688} height={533}>
    <path d="M15 177h673v16H15v-16zm0 30h673v16H15v-16zm0 30h673v16H15v-16zm0 30h673v16H15v-16zm0 30h673v16H15v-16zm0 30h336.5v16H15v-16zm0 40h673v16H15v-16zm0 30h673v16H15v-16zm0 30h673v16H15v-16zm0 30h673v16H15v-16zm0 30h673v16H15v-16zm0 30h336.5v16H15v-16zm1-441h499v24H16V76zm0 38h123v12H16v-12zM49 2h80v16H49V2zm0 20h466v16H49V22zM20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0z" />
  </ContentLoader>
)

const ArticleDetail = () => {
  const isXSmall = useResponsive({ type: 'xsmall' })()
  const isSmall = useResponsive({ type: 'small' })()
  const isMedium = useResponsive({ type: 'medium' })()
  const isLarge = useResponsive({ type: 'large' })()
  const isXLarge = useResponsive({ type: 'xlarge' })()

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

export default ArticleDetail
