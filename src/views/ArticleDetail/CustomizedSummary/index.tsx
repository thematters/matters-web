import summaryStyles from '~/common/styles/utils/content.article.css'

import styles from './styles.css'

interface CustomizedSummaryProps {
  summary?: string
}

const CustomizedSummary = ({ summary }: CustomizedSummaryProps) => {
  if (!summary) {
    return null
  }

  return (
    <section className="u-summary">
      {summary}
      <style jsx>{summaryStyles}</style>
      <style jsx>{styles}</style>
    </section>
  )
}

export default CustomizedSummary
