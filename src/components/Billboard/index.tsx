import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconInfo from '@/public/static/icons/24px/information.svg'
import { analytics, featureSupportedChains } from '~/common/utils'
import {
  BillboardDialog,
  BillboardExposureTracker,
  Icon,
  TextIcon,
  useBillboard,
} from '~/components'

import styles from './styles.module.css'

type BillboardProps = {
  tokenId?: string
  type: string
}

export const Billboard = ({ tokenId, type }: BillboardProps) => {
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
  const { data, isError, isLoading } = useBillboard({
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

  return (
    <BillboardDialog>
      {({ openDialog: openBillboardDialog }) => {
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
          </div>
        )
      }}
    </BillboardDialog>
  )
}
