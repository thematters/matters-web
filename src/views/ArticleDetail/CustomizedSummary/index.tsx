import { TEST_ID } from '~/common/enums'

interface CustomizedSummaryProps {
  summary?: string | null
}

const CustomizedSummary = ({ summary }: CustomizedSummaryProps) => {
  if (!summary) {
    return null
  }

  return (
    <section
      className="u-article-summary"
      data-test-id={TEST_ID.ARTICLE_SUMMARY}
    >
      {summary}
    </section>
  )
}

export default CustomizedSummary
