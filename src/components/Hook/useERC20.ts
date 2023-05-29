import { useContext } from 'react'
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'

import { featureSupportedChains, MaxUint256 } from '~/common/utils'
import { ViewerContext } from '~/components'

export const useAllowanceUSDT = () => {
  const { address } = useAccount()

  return useContractRead({
    address: process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [
      address as `0x${string}`,
      process.env.NEXT_PUBLIC_CURATION_CONTRACT_ADDRESS as `0x${string}`,
    ],
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

  return useBalance({
    address: (addr || viewerEthAddress) as `0x${string}`,
    token: (process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS ||
      '') as `0x${string}`,
    chainId: targetNetwork.id,
    cacheTime: 5_000,
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
    cacheTime: 5_000,
  })
}

export const useApproveUSDT = () => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`,
    abi: erc20ABI,
    functionName: 'approve',
    args: [
      process.env.NEXT_PUBLIC_CURATION_CONTRACT_ADDRESS as `0x${string}`,
      MaxUint256,
    ],
  })

  return useContractWrite(config)
}
