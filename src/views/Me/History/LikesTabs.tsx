import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { HorizontalRule, SegmentedTabs, useRoute } from '~/components'

import styles from './styles.module.css'

const LikesTabs: React.FC = () => {
  const { isInPath } = useRoute()

  return (
    <>
      <section className={styles.tabs}>
        <SegmentedTabs>
          <SegmentedTabs.Tab
            href={PATHS.ME_HISTORY_LIKES_SENT}
            selected={isInPath('ME_HISTORY_LIKES_SENT')}
          >
            <FormattedMessage defaultMessage="Likes Given" id="uM5qZr" />
          </SegmentedTabs.Tab>

          <SegmentedTabs.Tab
            href={PATHS.ME_HISTORY_LIKES_RECEIVED}
            selected={isInPath('ME_HISTORY_LIKES_RECEIVED')}
          >
            <FormattedMessage defaultMessage="Likes Received" id="ZxgUKj" />
          </SegmentedTabs.Tab>
        </SegmentedTabs>
      </section>

      <HorizontalRule />
    </>
  )
}

export default LikesTabs
