import { readContract } from '@wagmi/core'
import { useEffect, useState } from 'react'

import { BillboardOperatorABI, BillboardRegistryABI } from '~/common/utils'

// custom hook level enums
enum BillboardQueryStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

type Props = {
  id: number
  chainId: number
  operatorAddress: `0x${string}`
  registryAddress: `0x${string}`
}

export const useBillboard = ({
  id,
  chainId,
  operatorAddress,
  registryAddress,
}: Props) => {
  const [status, setStatus] = useState<BillboardQueryStatus>(
    BillboardQueryStatus.IDLE
  )
  const [data, setData] = useState<Record<string, any>>({})

  const isLoading = status === BillboardQueryStatus.LOADING
  const isError = status === BillboardQueryStatus.ERROR

  useEffect(() => {
    if (isLoading) {
      return
    }

    ;(async () => {
      try {
        setStatus(BillboardQueryStatus.LOADING)

        const tokenId = BigInt(id)
        const currEpoch = await readContract({
          abi: BillboardOperatorABI,
          address: operatorAddress,
          chainId,
          functionName: 'getLatestEpoch',
          args: [tokenId],
        })

        if (currEpoch < 2n) {
          return
        }

        const epoch = currEpoch - 2n
        const bidder = await readContract({
          abi: BillboardRegistryABI,
          address: registryAddress,
          chainId,
          functionName: 'highestBidder',
          args: [tokenId, epoch],
        })
        const bid = await readContract({
          abi: BillboardOperatorABI,
          address: operatorAddress,
          chainId,
          functionName: 'getBid',
          args: [tokenId, epoch, bidder],
        })

        if (bid && bid.isWon) {
          setData({
            ...(bid.contentURI ? { contentURI: bid.contentURI } : {}),
            ...(bid.redirectURI ? { redirectURI: bid.redirectURI } : {}),
          })
        }

        setStatus(BillboardQueryStatus.LOADED)
      } catch (error) {
        setStatus(BillboardQueryStatus.ERROR)
      }
    })()
  }, [])

  return { data, isLoading, isError }
}
