import { useContext } from 'react'
import { erc20Abi } from 'viem'
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
  useSimulateContract,
  useWriteContract,
} from 'wagmi'

import { contract } from '~/common/enums'
import { featureSupportedChains, MaxApprovedUSDTAmount } from '~/common/utils'
import { ViewerContext } from '~/components'

export const useAllowanceUSDT = () => {
  const { address } = useAccount()

  return useReadContract({
    address: contract.Optimism.tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address as `0x${string}`, contract.Optimism.curationAddress],
  })
}

export const useBalanceUSDT = ({
  address: addr,
}: {
  address?: string | null
}) => {
  const viewer = useContext(ViewerContext)
  const viewerEthAddress = viewer.info.ethAddress
  const targetNetwork = featureSupportedChains.curation[0]

  const account = (addr || viewerEthAddress) as `0x${string}`
  const tokenAddress = (contract.Optimism.tokenAddress || '') as `0x${string}`

  return useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account],
        chainId: targetNetwork.id,
      },
    ],
  })
}

export const useBalanceEther = ({
  address: addr,
}: {
  address?: string | null
}) => {
  const viewer = useContext(ViewerContext)
  const viewerEthAddress = viewer.info.ethAddress
  const targetNetwork = featureSupportedChains.curation[0]

  return useBalance({
    address: (addr || viewerEthAddress) as `0x${string}`,
    chainId: targetNetwork.id,
  })
}

export const useApproveUSDT = () => {
  const { data } = useSimulateContract({
    address: contract.Optimism.tokenAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contract.Optimism.curationAddress, MaxApprovedUSDTAmount],
  })
  const simulateRequest = data?.request
  const result = useWriteContract()

  return { ...result, simulateRequest }
}
