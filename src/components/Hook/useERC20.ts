import { useContext } from 'react'
import { erc20Abi } from 'viem'
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from 'wagmi'

import { contract } from '~/common/enums'
import {
  CurationVaultABI,
  featureSupportedChains,
  fromGlobalId,
  MaxApprovedUSDTAmount,
  toCurationVaultUID,
} from '~/common/utils'
import { ViewerContext } from '~/components'

export const useAllowanceUSDT = (useCurationVault: boolean) => {
  const { address } = useAccount()

  return useReadContract({
    address: contract.Optimism.tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [
      address as `0x${string}`,
      useCurationVault
        ? contract.Optimism.curationVaultAddress
        : contract.Optimism.curationAddress,
    ],
  })
}

export const useBalanceUSDT = ({
  address: addr,
}: {
  address?: string | null
} = {}) => {
  const viewer = useContext(ViewerContext)
  const viewerEthAddress = viewer.info.ethAddress
  const targetNetwork = featureSupportedChains.curation[0]

  return useBalance({
    address: (addr || viewerEthAddress) as `0x${string}`,
    token: (contract.Optimism.tokenAddress || '') as `0x${string}`,
    chainId: targetNetwork.id,
    query: {
      gcTime: 5_000,
    },
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
    query: {
      gcTime: 5_000,
    },
  })
}

export const useVaultBalanceUSDT = () => {
  const viewer = useContext(ViewerContext)
  const viewerId = viewer.id
  const uid = toCurationVaultUID(fromGlobalId(viewerId).id)
  const targetNetwork = featureSupportedChains.curation[0]

  return useReadContract({
    address: contract.Optimism.curationVaultAddress,
    abi: CurationVaultABI,
    functionName: 'erc20Balances',
    args: [uid, contract.Optimism.tokenAddress],
    chainId: targetNetwork.id,
    query: {
      gcTime: 5_000,
    },
  })
}

export const useApproveUSDT = (useCurationVault: boolean) => {
  const { writeContract, ...rest } = useWriteContract()

  return {
    ...rest,
    write: () =>
      writeContract({
        address: contract.Optimism.tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [
          useCurationVault
            ? contract.Optimism.curationVaultAddress
            : contract.Optimism.curationAddress,
          MaxApprovedUSDTAmount,
        ],
      }),
  }
}
