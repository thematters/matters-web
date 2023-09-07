import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as SupporterListRocket } from '@/public/static/images/supporter-list-rocket.svg'
import { GUIDE_LINKS, PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import { Button, LanguageContext, TextIcon } from '~/components'

import styles from './styles.module.css'

const EmptyAnalytics = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <section className={styles.content}>
      <p>
        <FormattedMessage
          defaultMessage="You haven‘t published any articles yet, so there is no data available. Create one now to introduce yourself!"
          description="src/views/Me/Analytics/EmptyAnalytics/index.tsx"
        />
      </p>
      <section className={styles.rocket}>
        <SupporterListRocket />
      </section>
      <Button
        size={['19.5rem', '3rem']}
        spacing={[0, 0]}
        bgColor="green"
        href={PATHS.ME_DRAFT_NEW}
        onClick={() => analytics.trackEvent('click_button', { type: 'write' })}
      >
        <TextIcon color="white" weight="md">
          <FormattedMessage defaultMessage="Start Creating" />
        </TextIcon>
      </Button>

      <section className={styles.tips}>
        <p>
          <FormattedMessage
            defaultMessage="Want to know more? Check the "
            description="src/views/Me/Analytics/EmptyAnalytics/index.tsx"
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.authorToolbox[lang]}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage defaultMessage="tutorial" />
          </a>
        </p>
      </section>
    </section>
  )
}

export default EmptyAnalytics
