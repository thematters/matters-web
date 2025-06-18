import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconInfo from '@/public/static/icons/24px/information.svg'
import { featureSupportedChains } from '~/common/utils'
import {
  BillboardDialog,
  // BillboardExposureTracker,
  Icon,
  TextIcon,
  useBillboard,
} from '~/components'

import { AdSenseUnit } from './AdSense'
import styles from './styles.module.css'

type BillboardProps = {
  tokenId?: string
  type: string
}

export const Billboard = ({ tokenId }: BillboardProps) => {
  const [mount, setMount] = useState(false)

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
  // Note: useBillboard hook is kept for potential future use, but we don't need its return values
  // since AdSenseUnit doesn't depend on legacy billboard data
  useBillboard({
    id,
    chainId: network.id,
    operatorAddress,
    registryAddress,
  })

  if (!mount) {
    return null
  }

  // Only check for essential conditions since AdSenseUnit doesn't depend on legacy billboard data
  // if (!id) {
  //   return null
  // }

  return (
    <BillboardDialog>
      {({ openDialog: openBillboardDialog }) => {
        return (
          <div className={styles.billboard}>
            {/* <a
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
            </a> */}
            <AdSenseUnit
              style={{
                display: 'inline-block',
                width: '264px',
                height: '150px',
              }}
            />

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

            {/* <BillboardExposureTracker id={id} type={type} /> */}
          </div>
        )
      }}
    </BillboardDialog>
  )
}
