import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { Button, HorizontalRule, SquareTabs, useRoute } from '~/components'

import styles from './styles.module.css'

const LikesTabs: React.FC = () => {
  const { isInPath } = useRoute()

  return (
    <>
      <section className={styles.tabs}>
        <SquareTabs spacing="sm">
          <SquareTabs.Tab
            selected={isInPath('ME_HISTORY_LIKES_SENT')}
            title={
              <Button href={PATHS.ME_HISTORY_LIKES_SENT}>
                <FormattedMessage defaultMessage="Likes Given" id="uM5qZr" />
              </Button>
            }
          />

          <SquareTabs.Tab
            selected={isInPath('ME_HISTORY_LIKES_RECEIVED')}
            title={
              <Button href={PATHS.ME_HISTORY_LIKES_RECEIVED}>
                <FormattedMessage defaultMessage="Likes Received" id="ZxgUKj" />
              </Button>
            }
          />
        </SquareTabs>
      </section>

      <HorizontalRule />
    </>
  )
}

export default LikesTabs
