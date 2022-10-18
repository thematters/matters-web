import { ethers } from 'ethers'
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'

export const useAllowance = () => {
  const { address } = useAccount()

  return useContractRead({
    address: process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS || '',
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
  const { address } = useAccount()

  return useBalance({
    addressOrName: (addr || address) as `0x${string}`,
    token: (process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS ||
      '') as `0x${string}`,
  })
}

export const useApprove = () => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS || '',
    abi: erc20ABI,
    functionName: 'approve',
    args: [
      process.env.NEXT_PUBLIC_CURATION_CONTRACT_ADDRESS as `0x${string}`,
      ethers.constants.MaxUint256,
    ],
  })

  return useContractWrite(config)
}
