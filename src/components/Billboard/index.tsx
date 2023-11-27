import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useContractRead } from 'wagmi'

import { BillboardABI, featureSupportedChains } from '~/common/utils'
import { IconNFTAD24, TextIcon } from '~/components'

import styles from './styles.module.css'

type BillboardProps = {
  tokenId: number
}

export const Billboard: React.FC<BillboardProps> = ({ tokenId }) => {
  const intl = useIntl()
  const [isOpened, setIsOpened] = useState(false)
  const targetNetork = featureSupportedChains.billboard[0]
  const { data, isError, isLoading } = useContractRead({
    address: process.env
      .NEXT_PUBLIC_BILLBOARD_CONTRACT_ADDRESS as `0x${string}`,
    abi: BillboardABI,
    functionName: 'getBoard',
    chainId: targetNetork.id,
    args: [BigInt(tokenId)],
    cacheTime: 60_000,
  })

  if (isLoading || isError || !data) {
    return null
  }

  return (
    <section className={styles.billboard}>
      <a
        href={data.redirectURI}
        target="_blank"
        // rel="noreferrer"
      >
        <img src={data.contentURI} alt="AD" />
      </a>

      <button
        type="button"
        aria-label={intl.formatMessage({
          defaultMessage: 'Why am I seeing this ad?',
          id: 'w7W92K',
          description: 'src/components/Billboard/index.tsx',
        })}
        className={styles.mark}
        onClick={() => setIsOpened(!isOpened)}
      >
        <TextIcon icon={<IconNFTAD24 />} size="xs">
          {isOpened ? (
            <a
              href={`https://billboard.matters.town/${tokenId}`}
              target="_blank"
            >
              <FormattedMessage
                defaultMessage="Why am I seeing this ad?"
                id="w7W92K"
                description="src/components/Billboard/index.tsx"
              />
            </a>
          ) : null}
        </TextIcon>
      </button>
    </section>
  )
}
