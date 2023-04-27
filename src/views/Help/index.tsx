import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { EXTERNAL_LINKS, GUIDE_LINKS, PATHS } from '~/common/enums'
import { Form, LanguageContext, Layout, ResponsiveWrapper } from '~/components'

import styles from './styles.css'

const BaseHelp = () => {
  const { lang } = useContext(LanguageContext)
  const year = new Date().getFullYear()

  const intl = useIntl()
  return (
    <ResponsiveWrapper>
      <Form.List spacingX={0}>
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'About Us',
            description: '',
          })}
          href={PATHS.ABOUT}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Explore Matters',
            description: '',
          })}
          href={PATHS.GUIDE}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Matters Community',
            description: '',
          })}
          href={PATHS.COMMUNITY}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Migrate to Matters',
            description: '',
          })}
          href={PATHS.MIGRATION}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Term of Services',
            description: '',
          })}
          href={PATHS.TOS}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Open Source',
            description: '',
          })}
          htmlHref={EXTERNAL_LINKS.DEVELOPER_RESOURCE}
          htmlTarget="_blank"
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Download App',
            description: '',
          })}
          href={GUIDE_LINKS.PWA[lang]}
        />
      </Form.List>

      <footer>
        <p>
          <FormattedMessage
            defaultMessage="Please email"
            description="src/views/Help/index.tsx"
          />
          <a
            className="u-link-green"
            href="mailto:ask@matters.town"
            target="_blank"
            rel="noreferrer"
          >
            &nbsp; ask@matters.town
          </a>
          &nbsp;
          <FormattedMessage
            defaultMessage="for bug reports or suggestions. We will reply to you as soon we can!"
            description="src/views/Help/index.tsx"
          />
        </p>

        <p className="copyright">
          {'@ '}
          <span itemProp="copyrightYear">{year}</span>{' '}
          <span itemProp="copyrightHolder">Matters</span>
        </p>
      </footer>

      <style jsx>{styles}</style>
    </ResponsiveWrapper>
  )
}

const Help = () => (
  <Layout.Main>
    <Layout.Header left={<Layout.Header.Title id="helpCenter" />} />
    <BaseHelp />
  </Layout.Main>
)

export default Help
