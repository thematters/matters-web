import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { GUIDE_LINKS, PATHS } from '~/common/enums'
import { Form, LanguageContext, Layout, Spacer, Translate } from '~/components'

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
          title={<Translate id="migrationSideBar" />}
          href={PATHS.MIGRATION}
        />
        <Form.List.Item
          role="link"
          title={<Translate id="term" />}
          href={PATHS.TOS}
        />
        <Form.List.Item
          role="link"
          title={<Translate id="openCommunity" />}
          htmlHref="https://github.com/thematters/developer-resource"
          htmlTarget="_blank"
        />
        <Form.List.Item
          role="link"
          title={<Translate id="downloadApp" />}
          href={GUIDE_LINKS.PWA[lang]}
        />
      </Form.List>

      <footer>
        <p>
          <Translate
            zh_hant="若你希望向 Matters 提出建議，或遭遇操作異常，請發送郵件至 "
            zh_hans="若你希望向 Matters 提出建议，或遭遇操作异常，请发送邮件至 "
            en="Please email"
          />
          <a
            className="u-link-green"
            href="mailto:ask@matters.news"
            target="_blank"
            rel="noreferrer"
          >
            ask@matters.news
          </a>
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
