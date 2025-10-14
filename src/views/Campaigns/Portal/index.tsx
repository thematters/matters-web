import { FormattedMessage } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import IMAGE_CAMPAIGN_PORTAL from '@/public/static/images/campaign-portal.png'
import { Icon, ResponsiveImage, TextIcon } from '~/components'

import styles from './styles.module.css'

const Portal = () => {
  const application = process.env.NEXT_PUBLIC_CAMPAIGN_APPLICATION_LINK || ''
  return (
    <div>
      <a className={styles.container} href={application} target="_blank">
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
      </a>
    </div>
  )
}

export default Portal
