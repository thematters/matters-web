import ComplianceDoc from '~/views/ComplianceDoc'

import content from './content2026H1'

const title = {
  zh_hant: '2026 H1 透明度報告骨架',
  zh_hans: '2026 H1 透明度报告骨架',
  en: '2026 H1 Transparency Report Skeleton',
}

const description = {
  zh_hant:
    'Matters 2026 H1 透明度報告骨架，標示資料狀態、已知缺口與後續填報章節。',
  zh_hans:
    'Matters 2026 H1 透明度报告骨架，标示资料状态、已知缺口与后续填报章节。',
  en: 'Matters 2026 H1 transparency report skeleton with data status, known gaps, and reporting sections.',
}

const TransparencyReport2026H1 = () => (
  <ComplianceDoc title={title} description={description} content={content} />
)

export default TransparencyReport2026H1
