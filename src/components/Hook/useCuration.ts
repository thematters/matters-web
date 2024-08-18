import { useSimulateContract, useWriteContract } from 'wagmi'

import { contract } from '~/common/enums'
import { CurationABI } from '~/common/utils'

export const useCurate = () => {
  const { data } = useSimulateContract({
    address: contract.Optimism.curationAddress,
    abi: CurationABI,
    functionName: 'curate',
  })
  const simulateRequest = data?.request
  const result = useWriteContract()

  return { ...result, simulateRequest }
}
