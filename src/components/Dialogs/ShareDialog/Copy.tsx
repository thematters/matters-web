import { FormattedMessage, useIntl } from 'react-intl'

import { CopyToClipboard, IconLink16, TextIcon } from '~/components'

import styles from './styles.css'

const Copy = ({ link }: { link: string }) => {
  const intl = useIntl()
  return (
    <section className="copy">
      <CopyToClipboard text={link}>
        <button
          aria-label={intl.formatMessage({
            defaultMessage: 'Copy Link',
            description: 'src/components/Dialogs/ShareDialog/Copy.tsx',
          })}
        >
          <TextIcon icon={<IconLink16 color="grey" />} spacing="base">
            <div className="text">
              <span>
                <FormattedMessage
                  defaultMessage="Copy Link"
                  description="src/components/Dialogs/ShareDialog/Copy.tsx"
                />
              </span>
            </div>
          </TextIcon>
        </button>
      </CopyToClipboard>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Copy
