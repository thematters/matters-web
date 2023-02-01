import type { GetStaticPropsContext } from 'next'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import { GUIDE_LINKS, PATHS } from '~/common/enums'
import loadIntlMessages from '~/common/utils/loadIntlMessages'
import { Form, LanguageContext, Layout, Spacer, Translate } from '~/components'

import styles from './styles.css'

export async function getStaticProps({
  defaultLocale,
  locale,
}: GetStaticPropsContext) {
  return {
    props: {
      intlMessages: await loadIntlMessages(locale as string, defaultLocale),
    },
  }
}

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
            defaultMessage: '關於我們',
            description: '關於',
          })}
          href={PATHS.ABOUT}
        />
        <Form.List.Item
          role="link"
          title={intl.formatMessage({
            defaultMessage: '玩轉 Matters 實用指南',
            description: '指南',
          })}
          href={PATHS.GUIDE}
        />
        <Form.List.Item
          role="link"
          title={<Translate id="community" />}
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
          <Translate
            zh_hant="，我們會儘快回覆！"
            zh_hans="，我们会尽快回复！"
            en="for bug reports or suggestions. We will reply to you as soon we can!"
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
