import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { CurationABI } from '~/common/utils'

export const useCurate = () => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CURATION_CONTRACT_ADDRESS as `0x${string}`,
    abi: CurationABI,
    functionName: 'curate',
  })

  return useContractWrite(config)
}
