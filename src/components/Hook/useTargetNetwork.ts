import { Chain, useNetwork, useSwitchNetwork } from 'wagmi'

export const useTargetNetwork = (target: Chain) => {
  const { chain: currentChain } = useNetwork()
  const { switchNetwork, isLoading } = useSwitchNetwork()

  const isUnsupportedNetwork = currentChain?.id !== target.id
  const targetChainId = target.id

  const switchToTargetNetwork = async () => {
    if (!switchNetwork) return
    switchNetwork(targetChainId)
  }

  return {
    isUnsupportedNetwork,
    isSwitchingNetwork: isLoading,
    switchNetwork,
    switchToTargetNetwork,
  }
}
