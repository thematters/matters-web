import { TEST_ID } from '~/common/enums'
import summaryStyles from '~/common/styles/utils/content.article.css'

interface CustomizedSummaryProps {
  summary?: string | null
}

const CustomizedSummary = ({ summary }: CustomizedSummaryProps) => {
  if (!summary) {
    return null
  }

  return (
    <section className="u-summary" data-test-id={TEST_ID.ARTICLE_SUMMARY}>
      {summary}
      <style jsx>{summaryStyles}</style>
    </section>
  )
}

export default CustomizedSummary
