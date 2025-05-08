import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as IconInfo } from '@/public/static/icons/24px/information.svg'
import {
  BillboardDialog,
  BillboardExposureTracker,
  Icon,
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

  const intl = useIntl()

  return (
    <BillboardDialog>
      {({ openDialog: openBillboardDialog }) => {
        return (
          <div className={styles.billboard}>
            <div className={styles.genieeContainer}>
              <iframe
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <script>
                        window.gnshbrequest = window.gnshbrequest || {cmd:[]};
                        window.gnshbrequest.cmd.push(function() {
                          window.gnshbrequest.applyPassback("1584662_matters.town_528x296_banner_responsive", "[data-cptid='1584662_matters.town_528x296_banner_responsive']");
                        });
                      </script>
                      <script async src="https://cpt.geniee.jp/hb/v1/222058/2731/wrapper.min.js"></script>
                    </head>
                    <body>
                      <div data-cptid="1584662_matters.town_528x296_banner_responsive" style="display: inline-block"></div>
                    </body>
                  </html>
                `}
                style={{ width: '16.5rem', height: 'auto', border: 'none' }}
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
