import { useContractRead } from 'wagmi'

import { BillboardABI, featureSupportedChains } from '~/common/utils'

import styles from './styles.module.css'

export const Billboard = () => {
  const targetNetork = featureSupportedChains.billboard[0]
  const { data, isError, isLoading } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_BILLBOARD_CONTRACT_ADDRESS as `0x${string}`,
    abi: BillboardABI,
    functionName: 'getBoard',
    chainId: targetNetork.id,
    args: [BigInt(1)],
    cacheTime: 60_000,
  })

  if (isLoading || isError || !data) {
    return null
  }

  return (
    <a
      className={styles.billboard}
      href={data.redirectURI}
      target="_blank"
      // rel="noreferrer"
    >
      <img src={data.contentURI} alt="AD" />
    </a>
  )
}
