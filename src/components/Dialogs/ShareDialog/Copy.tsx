import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconLink from '@/public/static/icons/24px/link.svg'
import { REFERRAL_QUERY_REFERRAL_KEY } from '~/common/enums'
import { analytics } from '~/common/utils'
import { CopyToClipboard, Icon, TextIcon, ViewerContext } from '~/components'

import styles from './styles.module.css'

const Copy = ({ link }: { link: string }) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)

  // append utm_source to link
  const utm_source = 'share_copy'
  const url = new URL(link)
  url.searchParams.append('utm_source', utm_source)
  if (viewer.userName) {
    url.searchParams.append(REFERRAL_QUERY_REFERRAL_KEY, viewer.userName)
  }
  link = url.toString()

  return (
    <section className={styles.copy}>
      <CopyToClipboard text={link}>
        {({ copyToClipboard }) => (
          <button
            aria-label={intl.formatMessage({
              defaultMessage: 'Copy Link',
              id: 'u5aHb4',
            })}
            onClick={() => {
              analytics.trackEvent('share', {
                type: 'copy-url',
              })
              copyToClipboard()
            }}
          >
            <TextIcon
              icon={<Icon icon={IconLink} size={24} />}
              spacing={16}
              size={16}
              color="black"
            >
              <div className={styles.text}>
                <span>
                  <FormattedMessage defaultMessage="Copy Link" id="u5aHb4" />
                </span>
              </div>
            </TextIcon>
          </button>
        )}
      </CopyToClipboard>
    </section>
  )
}

export default Copy
