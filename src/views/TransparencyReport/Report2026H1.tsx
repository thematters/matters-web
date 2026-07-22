import ComplianceDoc from '~/views/ComplianceDoc'

import content from './content2026H1'

const title = {
  zh_hant: '2026 H1 透明度報告',
  zh_hans: '2026 H1 透明度报告',
  en: '2026 H1 Transparency Report',
}

const description = {
  zh_hant:
    'Matters 2026 H1 透明度報告，公開內容治理、申訴、政府要求、個資權利請求與重大變更的聚合統計。',
  zh_hans:
    'Matters 2026 H1 透明度报告，公开内容治理、申诉、政府请求、个资权利请求与重大变更的聚合统计。',
  en: 'Matters 2026 H1 transparency report covering aggregated content governance, appeals, government requests, privacy-rights requests, and material changes.',
}

const TransparencyReport2026H1 = () => (
  <ComplianceDoc title={title} description={description} content={content} />
)

export default TransparencyReport2026H1
