import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button } from '~/components'

import styles from './styles.module.css'

const StartWriting = () => {
  return (
    <section className={styles.startWriting}>
      <Button
        size={[null, '2rem']}
        spacing={[0, 'tight']}
        borderColor="green"
        borderActiveColor="greenDark"
        borderWidth="md"
        textColor="green"
        textActiveColor="greenDark"
        href={PATHS.ME_DRAFT_NEW}
        onClick={() => analytics.trackEvent('click_button', { type: 'write' })}
      >
        <FormattedMessage
          defaultMessage="Start writing"
          id="4sl6yu"
          description="src/views/User/Articles/UserArticles.tsx"
        />
      </Button>
    </section>
  )
}

export default StartWriting
