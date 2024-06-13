import { useEffect } from 'react'
import { Chain, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'

export const useTargetNetwork = (target: Chain) => {
  const { disconnect } = useDisconnect()
  const { chain: currentChain } = useNetwork()
  const { switchNetwork, isLoading, error } = useSwitchNetwork()

  const isUnsupportedNetwork = currentChain?.id !== target.id
  const targetChainId = target.id

  const switchToTargetNetwork = async () => {
    if (!switchNetwork) return
    switchNetwork(targetChainId)
  }

  // disconnect if failed to switch network
  useEffect(() => {
    if (!error) return
    if (error.name === 'UserRejectedRequestError') return

    disconnect()
  }, [error])

  return {
    isUnsupportedNetwork,
    isSwitchingNetwork: isLoading,
    switchNetwork,
    switchToTargetNetwork,
  }
}
