import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'

import { captureClicks } from '~/common/utils'
import { Head, LanguageContext, Layout } from '~/components'

type LocalizedContent = {
  zh_hant: string
  zh_hans: string
  en: string
}

type ComplianceDocProps = {
  title: LocalizedContent
  description: LocalizedContent
  content: LocalizedContent
}

const pickContent = (content: LocalizedContent, lang?: string | null) =>
  content[lang as keyof LocalizedContent] || content.zh_hant

const ComplianceDoc = ({ title, description, content }: ComplianceDocProps) => {
  const { lang } = useContext(LanguageContext)
  const pageTitle = pickContent(title, lang)

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.Title>{pageTitle}</Layout.Header.Title>}
      />

      <Head title={pageTitle} description={pickContent(description, lang)} />

      <Layout.Main.Spacing>
        <section className="u-content-article" onClick={captureClicks}>
          <ReactMarkdown>{pickContent(content, lang)}</ReactMarkdown>
        </section>
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default ComplianceDoc
