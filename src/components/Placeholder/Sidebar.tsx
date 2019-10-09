import React from 'react'
import ContentLoader from 'react-content-loader'

import { LoaderProps } from './utils'

const SidebarLoader = () => (
  <ContentLoader {...LoaderProps} width={328} height={643}>
    <path d="M256 60h72v72h-72V60zM0 62h100v13H0V62zm0 76h100v13H0v-13zm0-53h234v15H0V85zm0 24h117v15H0v-15zm256 74h72v72h-72v-72zM0 185h100v13H0v-13zm0 76h100v13H0v-13zm0-53h234v15H0v-15zm0 24h117v15H0v-15zm256 74h72v72h-72v-72zM0 308h100v13H0v-13zm0 76h100v13H0v-13zm0-53h234v15H0v-15zm0 24h117v15H0v-15zm256 74h72v72h-72v-72zM0 431h100v13H0v-13zm0 76h100v13H0v-13zm0-53h234v15H0v-15zm0 24h117v15H0v-15zm256 74h72v72h-72v-72zM0 554h100v13H0v-13zm0 76h100v13H0v-13zm0-53h234v15H0v-15zm0 24h117v15H0v-15zM0 0h87v28H0V0z" />
  </ContentLoader>
)

export default SidebarLoader
