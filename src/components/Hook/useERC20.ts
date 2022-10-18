import { BigNumber } from 'ethers/lib/ethers'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'

import { ERC20ABI } from '@/src/common/utils/contract'

export const useAllowance = () => {
  const { address } = useAccount()

  return useContractRead({
    address: process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS || '',
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [
      `0x${address?.slice(2)}`,
      `0x${process.env.NEXT_PUBLIC_CURATION_CONTRACT_ADDRESS?.slice(2)}`,
    ],
  })
}

export const useBalanceOf = () => {
  const { address } = useAccount()

  return useContractRead({
    address: process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS || '',
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [`0x${address?.slice(2)}`],
  })
}

export const useApprove = () => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS || '',
    abi: ERC20ABI,
    functionName: 'approve',
    args: [
      `0x${process.env.NEXT_PUBLIC_CURATION_CONTRACT_ADDRESS?.slice(2)}`,
      BigNumber.from(2).pow(256).sub(1),
    ],
  })

  return useContractWrite(config)
}
