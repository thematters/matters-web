import { readContract } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { mainnet, optimism, optimismSepolia, sepolia } from 'wagmi/chains'

import { STORAGE_KEY_BILLBOARD } from '~/common/enums'
import {
  BillboardOperatorABI,
  BillboardRegistryABI,
  storage,
  wagmiConfig,
} from '~/common/utils'

// custom hook level enums
enum QueryStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

type BillboardData = {
  contentURI: string
  redirectURI: string
  expired: number
}

type Props = {
  id: number
  chainId:
    | typeof mainnet.id
    | typeof optimism.id
    | typeof sepolia.id
    | typeof optimismSepolia.id
  operatorAddress: `0x${string}`
  registryAddress: `0x${string}`
}

export const useBillboard = ({
  id,
  chainId,
  operatorAddress,
  registryAddress,
}: Props) => {
  const [status, setStatus] = useState<QueryStatus>(QueryStatus.IDLE)

  const data = storage.get(STORAGE_KEY_BILLBOARD) as BillboardData | null
  const ttl = 3 * 60 * 1000

  const isLoading = status === QueryStatus.LOADING
  const isError = status === QueryStatus.ERROR

  const resetData = () => {
    storage.set(STORAGE_KEY_BILLBOARD, {
      contentURI: '',
      redirectURI: '',
      expired: Date.now() + ttl,
    })
  }

  // fetch board cotent if data is expired
  useEffect(() => {
    if (isLoading) {
      return
    }

    if (data?.expired && data.expired >= Date.now()) {
      return
    }

    ;(async () => {
      try {
        setStatus(QueryStatus.LOADING)

        const tokenId = BigInt(id)
        const currEpoch = await readContract(wagmiConfig, {
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
        const bidder = await readContract(wagmiConfig, {
          abi: BillboardRegistryABI,
          address: registryAddress,
          chainId,
          functionName: 'highestBidder',
          args: [tokenId, epoch],
        })
        const bid = await readContract(wagmiConfig, {
          abi: BillboardOperatorABI,
          address: operatorAddress,
          chainId,
          functionName: 'getBid',
          args: [tokenId, epoch, bidder],
        })

        if (bid && bid.isWon) {
          storage.set(STORAGE_KEY_BILLBOARD, {
            contentURI: bid.contentURI,
            redirectURI: bid.redirectURI,
            expired: Date.now() + ttl,
          })
        } else {
          // if no running ad or it hasn't been cleared yet
          resetData()
        }

        setStatus(QueryStatus.LOADED)
      } catch {
        resetData()
        setStatus(QueryStatus.ERROR)
      }
    })()
  }, [])

  return { data, isLoading, isError }
}
