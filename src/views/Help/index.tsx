import { Form, Layout, Spacer, Translate } from '~/components'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'

import styles from './styles.css'

const Help = () => {
  const year = new Date().getFullYear()
  const downloadAppLink = toPath({
    page: 'articleDetail',
    article: {
      slug: 'guidance-如何让你的matters之旅更便捷',
      mediaHash: 'bafyreiayiuxi4qc2a7qpgjp3fe42wmaoppqykckcvtq4hiukl5pgs3dn2m',
      author: { userName: '1ampa55ag3' },
    },
  })

  return (
    <>
      <Form.List>
        <Form.List.Item title={<Translate id="about" />} {...PATHS.ABOUT} />
        <Form.List.Item title={<Translate id="guide" />} {...PATHS.GUIDE} />
        <Form.List.Item
          title={<Translate id="community" />}
          {...PATHS.COMMUNITY}
        />
        <Form.List.Item
          title={<Translate id="migrationSideBar" />}
          {...PATHS.MIGRATION}
        />
        <Form.List.Item title={<Translate id="term" />} {...PATHS.TOS} />
        <Form.List.Item
          title={<Translate id="openCommunity" />}
          href="https://github.com/thematters/developer-resource"
          htmlTarget="_blank"
        />
        <Form.List.Item
          title={<Translate id="downloadApp" />}
          {...downloadAppLink}
        />
      </Form.List>

      <footer>
        <p>
          <Translate
            zh_hant="若你希望向 Matters 提出建議，或遭遇操作異常，請發送郵件至 "
            zh_hans="若你希望向 Matters 提出建议，或遭遇操作异常，请发送邮件至 "
          />
          <a
            className="u-link-green"
            href="mailto:ask@matters.news"
            target="_blank"
          >
            ask@matters.news
          </a>
          <Translate
            zh_hant="，我們會儘快回覆！"
            zh_hans="，我们会尽快回复！"
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

export default () => (
  <Layout.Main bgColor="grey-lighter">
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="helpCenter" />}
    />

    <Spacer />

    <Help />

    <Spacer size="xxxloose" />
  </Layout.Main>
)
