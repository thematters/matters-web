import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import IMAGE_CAMPAIGN_PORTAL from '@/public/static/images/campaign-portal.png'
import { Icon, ResponsiveImage, TextIcon } from '~/components'

import styles from './styles.module.css'

const Portal = () => {
  return (
    <div>
      <Link className={styles.container} href="/">
        <section className={styles.text}>
          <TextIcon
            icon={<Icon icon={IconRight} size={20} />}
            color="white"
            placement="left"
            weight="medium"
            size={16}
          >
            <FormattedMessage
              defaultMessage="Apply to curate an event"
              id="ze7hPz"
              description="src/views/Campaigns/Portal/index.tsx"
            />
          </TextIcon>
        </section>
        <section className={styles.portal}>
          <ResponsiveImage url={IMAGE_CAMPAIGN_PORTAL.src} width={264} />
        </section>
      </Link>
    </div>
  )
}

export default Portal
