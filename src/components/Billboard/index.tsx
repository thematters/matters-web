import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconInfo } from '@/public/static/icons/24px/information.svg'
// import { analytics, featureSupportedChains } from '~/common/utils'
import {
  BillboardDialog,
  BillboardExposureTracker,
  Icon,
  TextIcon,
  // useBillboard,
} from '~/components'

import styles from './styles.module.css'

type BillboardProps = {
  tokenId?: string
  type: string
}

export const Billboard = ({ tokenId, type }: BillboardProps) => {
  // collect vars
  const id = !isNaN(Number(tokenId)) ? Number(tokenId) : 0
  // const operatorAddress = process.env
  //   .NEXT_PUBLIC_BILLBOARD_OPERATOR_ADDRESS as `0x${string}`
  // const registryAddress = process.env
  //   .NEXT_PUBLIC_BILLBOARD_REGISTRY_ADDRESS as `0x${string}`
  // const network = featureSupportedChains.billboard[0]

  const intl = useIntl()
  // const { data, isError, isLoading } = useBillboard({
  //   id,
  //   chainId: network.id,
  //   operatorAddress,
  //   registryAddress,
  // })

  // if (!id || isError || isLoading || !data || !data.contentURI) {
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
            <div className={styles.genieeContainer}>
              <div
                data-cptid="1584662_matters.town_528x296_banner_responsive"
                style={{ display: 'inline-block' }}
              ></div>
              <script
                id="geniee-banner"
                dangerouslySetInnerHTML={{
                  __html: `
                  window.gnshbrequest.cmd.push(function() {
                    window.gnshbrequest.applyPassback("1584662_matters.town_528x296_banner_responsive", "[data-cptid='1584662_matters.town_528x296_banner_responsive']");
                  });
                `,
                }}
              />
            </div>

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
