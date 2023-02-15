import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { GUIDE_LINKS, PATHS } from '~/common/enums'
import { Form, LanguageContext, Layout, Spacer } from '~/components'

import styles from './styles.css'

const BaseHelp = () => {
  const { lang } = useContext(LanguageContext)
  const year = new Date().getFullYear()

  const intl = useIntl()
  return (
    <>
      <Form.List>
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'About Us',
            description: 'src/views/Help/index.tsx',
          })}
          href={PATHS.ABOUT}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Explore Matters',
            description: 'src/views/Help/index.tsx',
          })}
          href={PATHS.GUIDE}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Matters Community',
            description: 'src/views/Help/index.tsx',
          })}
          href={PATHS.COMMUNITY}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Migrate to Matters',
            description: 'src/views/Help/index.tsx',
          })}
          href={PATHS.MIGRATION}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Term of Services',
            description: 'src/views/Help/index.tsx',
          })}
          href={PATHS.TOS}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Open Source',
            description: 'src/views/Help/index.tsx',
          })}
          htmlHref="https://github.com/thematters/developer-resource"
          htmlTarget="_blank"
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: 'Download App',
            description: 'src/views/Help/index.tsx',
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
            href="mailto:ask@matters.news"
            target="_blank"
            rel="noreferrer"
          >
            &nbsp; ask@matters.news
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
    </>
  )
}

const Help = () => (
  <Layout.Main smBgColor="grey-lighter">
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="helpCenter" />}
    />

    <Spacer />

    <BaseHelp />

    <Spacer size="xxxloose" />
  </Layout.Main>
)

export default Help
