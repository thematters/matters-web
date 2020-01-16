import React from 'react'
import ContentLoader from 'react-content-loader'

import { useResponsive } from '~/components/Hook'

import { LoaderProps } from './utils'

const XS: React.FC = () => (
  <ContentLoader {...LoaderProps} width={343} height={631}>
    <path d="M203 288h140v77H203v-77zM24 382h130v14H24v-14zm146 0h114v14H170v-14zM24 322h142v14H24v-14zm0 24h142v14H24v-14zM0 290h120v20H0v-20zm28-27h80v14H28v-14zm-18 17c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm30 314h68c8.837 0 16 7.163 16 16s-7.163 16-16 16H40c-8.837 0-16-7.163-16-16s7.163-16 16-16zm-16-83h142v14H24v-14zm0 24h142v14H24v-14zm0 24h107.5v14H24v-14zm179-114h140v186H203V445zM0 475h120v20H0v-20zm28-27h80v14H28v-14zm-18 17c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm14-268h130v14H24v-14zm146 0h114v14H170v-14zM24 137h225v14H24v-14zm0 24h225v14H24v-14zM0 101h120v20H0v-20zm28-27h80v14H28V74zM10 91C4.477 91 0 86.523 0 81s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zM0 0h87v28H0V0z" />
  </ContentLoader>
)

const MD: React.FC = props => (
  <ContentLoader {...LoaderProps} width={639} height={631}>
    <path d="M499 288h140v77H499v-77zM24 382h130v14H24v-14zm146 0h130v14H170v-14zM24 322h422v14H24v-14zm0 24h422v14H24v-14zM0 290h400v20H0v-20zm28-27h80v14H28v-14zm-18 17c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm30 314h68c8.837 0 16 7.163 16 16s-7.163 16-16 16H40c-8.837 0-16-7.163-16-16s7.163-16 16-16zm100 9h130v14H140v-14zM24 511h422v14H24v-14zm0 24h422v14H24v-14zm0 24h243.5v14H24v-14zm475-114h140v186H499V445zM0 475h400v20H0v-20zm28-27h80v14H28v-14zm-18 17c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm14-268h130v14H24v-14zm146 0h130v14H170v-14zM24 137h521v14H24v-14zm0 24h521v14H24v-14zM0 101h400v20H0v-20zm28-27h80v14H28V74zM10 91C4.477 91 0 86.523 0 81s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zM0 0h87v28H0V0z" />
  </ContentLoader>
)

const LG: React.FC = props => (
  <ContentLoader {...LoaderProps} width={704} height={631}>
    <path d="M564 288h140v77H564v-77zM24 382h130v14H24v-14zm146 0h130v14H170v-14zM24 322h487v14H24v-14zm0 24h487v14H24v-14zM0 290h400v20H0v-20zm28-27h80v14H28v-14zm-18 17c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm30 314h68c8.837 0 16 7.163 16 16s-7.163 16-16 16H40c-8.837 0-16-7.163-16-16s7.163-16 16-16zm100 9h130v14H140v-14zM24 511h487v14H24v-14zm0 24h487v14H24v-14zm0 24h243.5v14H24v-14zm540-114h140v186H564V445zM0 475h400v20H0v-20zm28-27h80v14H28v-14zm-18 17c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm14-268h130v14H24v-14zm146 0h130v14H170v-14zM24 137h586v14H24v-14zm0 24h586v14H24v-14zM0 101h400v20H0v-20zm28-27h80v14H28V74zM10 91C4.477 91 0 86.523 0 81s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zM0 0h87v28H0V0z" />
  </ContentLoader>
)

const ArticleDigestList = () => {
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

export default ArticleDigestList
