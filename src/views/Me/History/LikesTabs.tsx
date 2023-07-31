import { PATHS } from '~/common/enums'
import {
  HorizontalRule,
  SegmentedTabs,
  Translate,
  useRoute,
} from '~/components'

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
            <Translate id="likesSent" />
          </SegmentedTabs.Tab>

          <SegmentedTabs.Tab
            href={PATHS.ME_HISTORY_LIKES_RECEIVED}
            selected={isInPath('ME_HISTORY_LIKES_RECEIVED')}
          >
            <Translate id="likesReceived" />
          </SegmentedTabs.Tab>
        </SegmentedTabs>
      </section>

      <HorizontalRule />
    </>
  )
}

export default LikesTabs
