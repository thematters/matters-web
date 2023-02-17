import { WagmiConfig } from 'wagmi'

import { wagmiClient } from '~/common/utils'

/**
 * Currently, we don't use this component on <Root>
 * since wallet-related features aren't enabled globally,
 * and for smaller bundle size.
 *
 * Please use this component on-demand.
 */
export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
}
