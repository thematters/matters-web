import { FormattedMessage, useIntl } from 'react-intl'

import { analytics } from '~/common/utils'
import { CopyToClipboard, IconLink16, TextIcon } from '~/components'

import styles from './styles.module.css'

const Copy = ({ link }: { link: string }) => {
  const intl = useIntl()

  // append utm_source to link
  const utm_source = 'share_copy'
  const url = new URL(link)
  url.searchParams.append('utm_source', utm_source)
  link = url.toString()

  return (
    <section className={styles.copy}>
      <CopyToClipboard text={link}>
        <button
          aria-label={intl.formatMessage({
            defaultMessage: 'Copy Link',
            id: 'u5aHb4',
          })}
          onClick={() => {
            analytics.trackEvent('share', {
              type: 'copy-url',
            })
          }}
        >
          <TextIcon icon={<IconLink16 color="grey" />} spacing="base">
            <div className={styles.text}>
              <span>
                <FormattedMessage defaultMessage="Copy Link" id="u5aHb4" />
              </span>
            </div>
          </TextIcon>
        </button>
      </CopyToClipboard>
    </section>
  )
}

export default Copy
