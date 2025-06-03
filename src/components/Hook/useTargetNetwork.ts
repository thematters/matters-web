import { useEffect } from 'react'
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi'

import { featureSupportedChains } from '~/common/utils'

export const useCurationNetwork = () => {
  const { disconnect } = useDisconnect()
  const { switchChain, isPending, error } = useSwitchChain()
  const { chain: currentChain } = useAccount()

  const targetNetork = featureSupportedChains.curation[0]
  const isUnsupportedNetwork = currentChain?.id !== targetNetork.id
  const targetChainId = targetNetork.id

  const switchToTargetNetwork = async () => {
    if (!switchChain) return
    switchChain({ chainId: targetChainId })
  }

  // disconnect if failed to switch network
  useEffect(() => {
    if (!error) return
    if (error.name === 'UserRejectedRequestError') return

    disconnect()
  }, [error])

  return {
    isUnsupportedNetwork,
    isSwitchingNetwork: isPending,
    switchNetwork: switchChain,
    switchToTargetNetwork,
  }
}
