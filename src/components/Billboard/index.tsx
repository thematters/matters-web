import { FormattedMessage, useIntl } from 'react-intl'
import { useContractRead } from 'wagmi'

import { BillboardABI, featureSupportedChains } from '~/common/utils'
import { BillboardDialog, IconInfo24, Spinner, TextIcon } from '~/components'

import styles from './styles.module.css'

type BillboardProps = {
  tokenId?: number
}

export const Billboard = ({ tokenId }: BillboardProps) => {
  // collect vars
  const id = tokenId || process.env.NEXT_PUBLIC_BILLBOARD_TOKEN_ID || 0
  const address = process.env.NEXT_PUBLIC_BILLBOARD_ADDRESS as `0x${string}`
  const network = featureSupportedChains.billboard[0]

  const intl = useIntl()
  const { data, isError, isLoading } = useContractRead({
    address,
    abi: BillboardABI,
    functionName: 'getBoard',
    chainId: network.id,
    args: [BigInt(id)],
    cacheTime: 60_000,
  })

  if (isError || !data) {
    return null
  }

  return (
    <BillboardDialog>
      {({ openDialog: openBillboardDialog }) => {
        return (
          <div className={styles.billboard}>
            {isLoading && <Spinner />}
            {!isLoading && (
              <>
                <a href={data.redirectURI} target="_blank">
                  <img src={data.contentURI} alt="ad" />
                </a>
                <button
                  className={styles.button}
                  type="button"
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Why am I seeing this?',
                    id: 'S5LvpB',
                    description: 'src/components/Billboard/index.tsx',
                  })}
                  onClick={openBillboardDialog}
                >
                  <TextIcon icon={<IconInfo24 />} size="xs">
                    <FormattedMessage
                      defaultMessage="Why am I seeing this?"
                      id="S5LvpB"
                      description="src/components/Billboard/index.tsx"
                    />
                  </TextIcon>
                </button>
              </>
            )}
          </div>
        )
      }}
    </BillboardDialog>
  )
}
