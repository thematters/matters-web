import ComplianceDoc from '~/views/ComplianceDoc'

import content from './content'

const title = {
  zh_hant: '數位素養資源',
  zh_hans: '数字素养资源',
  en: 'Digital Literacy Resources',
}

const description = {
  zh_hant:
    '整理 Matters 使用者理解檢舉、申訴、個人資料、Community Watch 與推薦系統的基礎資源。',
  zh_hans:
    '整理 Matters 使用者理解举报、申诉、个人资料、Community Watch 与推荐系统的基础资源。',
  en: 'Resources for understanding reporting, appeals, personal data, Community Watch, and recommendation systems on Matters.',
}

const DigitalLiteracy = () => (
  <ComplianceDoc title={title} description={description} content={content} />
)

export default DigitalLiteracy
