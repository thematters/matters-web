import ComplianceDoc from '~/views/ComplianceDoc'

import content from './content'

const title = {
  zh_hant: '自動化與反濫用模型',
  zh_hans: '自动化与反滥用模型',
  en: 'Automation and Anti-Abuse Models',
}

const description = {
  zh_hant:
    '說明 Matters 如何使用自動化、模型輔助與人工判斷處理內容治理與反濫用工作。',
  zh_hans:
    '说明 Matters 如何使用自动化、模型辅助与人工判断处理内容治理与反滥用工作。',
  en: 'How Matters uses automation, model assistance, and human judgment in content governance and anti-abuse work.',
}

const TransparencyAutomation = () => (
  <ComplianceDoc title={title} description={description} content={content} />
)

export default TransparencyAutomation
