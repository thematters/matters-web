import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconInfo from '@/public/static/icons/24px/information.svg'
import IconInfoFill from '@/public/static/icons/24px/information-fill.svg'
import { analytics, featureSupportedChains } from '~/common/utils'
import {
  BillboardDialog,
  BillboardExposureTracker,
  Icon,
  Media,
  TextIcon,
  useBillboard,
} from '~/components'

import { AdSenseUnit } from './AdSense'
import styles from './styles.module.css'

type BillboardProps = {
  tokenId?: string
  type: string
}

export const Billboard = ({ tokenId, type }: BillboardProps) => {
  const [mount, setMount] = useState(false)
  const [adsenseFilled, setAdsenseFilled] = useState(false)
  const router = useRouter()
  const GOOGLE_ADS_ELIGIBLE_ADDRESS =
    '0xE5c5260D776A0a549a1E289B70798B888DBA0a40'

  // The current version of wagmi does not support SSR, leading to dehydration
  // warnings since the SSR and CSR are out-of-sync. The `useEffect` ensure
  // that the initial render on the client matches the one on the server.
  useEffect(() => {
    setMount(true)
  })

  // collect vars
  const id = !isNaN(Number(tokenId)) ? Number(tokenId) : 0
  const operatorAddress = process.env
    .NEXT_PUBLIC_BILLBOARD_OPERATOR_ADDRESS as `0x${string}`
  const registryAddress = process.env
    .NEXT_PUBLIC_BILLBOARD_REGISTRY_ADDRESS as `0x${string}`
  const network = featureSupportedChains.billboard[0]

  const intl = useIntl()

  const adWidth = '264px'
  const adHeight = '148px'
  const adMaxWidth = adWidth
  const adMaxHeight = adHeight
  const adFormat = 'rectangle'
  const isResponsive = router.query.responsive === 'true'
  const { data, isError, isLoading, bidder } = useBillboard({
    id,
    chainId: network.id,
    operatorAddress,
    registryAddress,
  })

  if (!mount) {
    return null
  }

  if (!id || isError || isLoading || !data || !data.contentURI) {
    return null
  }
  console.log({ id, isError, isLoading, data, bidder })
  console.log({ registryAddress, GOOGLE_ADS_ELIGIBLE_ADDRESS })
  if (
    bidder?.toLocaleLowerCase() ===
    GOOGLE_ADS_ELIGIBLE_ADDRESS.toLocaleLowerCase()
  ) {
    return (
      <div className={styles.billboard}>
        <AdSenseUnit
          adFormat={adFormat}
          isResponsive={isResponsive}
          style={{
            display: 'inline-block',
            width: adWidth,
            height: adHeight,
            maxWidth: adMaxWidth,
            maxHeight: adMaxHeight,
            overflow: 'hidden',
          }}
          onAdFilled={() => setAdsenseFilled(true)}
        />

        {adsenseFilled && (
          <BillboardDialog>
            {({ openDialog: openBillboardDialog }) => {
              return (
                <>
                  <Media lessThan="md">
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
                  </Media>
                  <Media greaterThanOrEqual="md">
                    <button
                      className={styles.mdButton}
                      type="button"
                      aria-label={intl.formatMessage({
                        defaultMessage: "What's this?",
                        id: '4wOWfp',
                        description: 'src/components/Billboard/index.tsx',
                      })}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        openBillboardDialog()
                      }}
                    >
                      <Icon icon={IconInfoFill} size={24} />
                    </button>
                  </Media>
                  <BillboardExposureTracker id={id} type={type} />
                </>
              )
            }}
          </BillboardDialog>
        )}
      </div>
    )
  }

  return (
    <div className={styles.billboard}>
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
        <img src={data.contentURI} alt="ad" loading="lazy" />
      </a>
      <BillboardDialog>
        {({ openDialog: openBillboardDialog }) => {
          return (
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
          )
        }}
      </BillboardDialog>
      <BillboardExposureTracker id={id} type={type} />
    </div>
  )
}
