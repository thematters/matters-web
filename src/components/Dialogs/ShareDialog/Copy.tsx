import { FormattedMessage, useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import { CopyToClipboard, IconLink16, TextIcon } from '~/components'

import styles from './styles.module.css'

const Copy = ({ link }: { link: string }) => {
  const intl = useIntl()
  return (
    <section className={styles['copy']}>
      <CopyToClipboard text={link}>
        <button
          aria-label={intl.formatMessage({
            defaultMessage: 'Copy Link',
            description: '',
          })}
          onClick={() => {
            analytics.trackEvent('share', {
              type: 'copy-url',
            })
          }}
        >
          <TextIcon icon={<IconLink16 color="grey" />} spacing="base">
            <div className={styles['text']}>
              <span>
                <FormattedMessage defaultMessage="Copy Link" description="" />
              </span>
            </div>
          </TextIcon>
        </button>
      </CopyToClipboard>
    </section>
  )
}

export default Copy
