import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { curationABI } from '~/common/utils'

export const useCurate = () => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CURATION_CONTRACT_ADDRESS || '',
    abi: curationABI,
    functionName: 'curate',
  })

  return useContractWrite(config)
}
