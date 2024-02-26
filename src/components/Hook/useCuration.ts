import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { contract } from '~/common/enums'
import { CurationABI } from '~/common/utils'

export const useCurate = () => {
  const { config } = usePrepareContractWrite({
    address: contract.Optimism.curationAddress,
    abi: CurationABI,
    functionName: 'curate',
  })

  return useContractWrite(config)
}
