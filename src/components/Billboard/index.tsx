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
              <iframe src="https://web-ad.matters.town/" width={264} />
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
