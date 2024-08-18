import { useEffect } from 'react'
import { Chain } from 'viem'
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi'

export const useTargetNetwork = (target: Chain) => {
  const { disconnect } = useDisconnect()
  const { chain: currentChain } = useAccount()
  const { switchChain, isPending, error } = useSwitchChain()

  const isUnsupportedNetwork = currentChain?.id !== target.id
  const targetChainId = target.id

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
    switchChain,
    switchToTargetNetwork,
  }
}
