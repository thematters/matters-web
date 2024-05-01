import { FormattedMessage, useIntl } from 'react-intl'
import { useContractRead } from 'wagmi'

import { ReactComponent as IconInfo } from '@/public/static/icons/24px/information.svg'
import { analytics, BillboardABI, featureSupportedChains } from '~/common/utils'
import {
  BillboardDialog,
  BillboardExposureTracker,
  Icon,
  Spinner,
  TextIcon,
} from '~/components'

import styles from './styles.module.css'

type BillboardProps = {
  tokenId?: string
  type: string
}

export const Billboard = ({ tokenId, type }: BillboardProps) => {
  // collect vars
  const id = !isNaN(Number(tokenId)) ? Number(tokenId) : 0
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

  if (!id || isError || !data || !data.contentURI) {
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
                <a
                  href={data.redirectURI}
                  target="_blank"
                  onClick={() =>
                    analytics.trackEvent('click_billboard', {
                      id,
                      type,
                      target: data.redirectURI,
                    })
                  }
                >
                  <img src={data.contentURI} alt="ad" />
                </a>
                <button
                  className={styles.button}
                  type="button"
                  aria-label={intl.formatMessage({
                    defaultMessage: "What's this?",
                    id: '4wOWfp',
                    description: 'src/components/Billboard/index.tsx',
                  })}
                  onClick={openBillboardDialog}
                >
                  <TextIcon icon={<Icon icon={IconInfo} />} size={12}>
                    <FormattedMessage
                      defaultMessage="What's this?"
                      id="4wOWfp"
                      description="src/components/Billboard/index.tsx"
                    />
                  </TextIcon>
                </button>
                <BillboardExposureTracker id={id} type={type} />
              </>
            )}
          </div>
        )
      }}
    </BillboardDialog>
  )
}
