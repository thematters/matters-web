import ComplianceDoc from '~/views/ComplianceDoc'

import content from './content'

const title = {
  zh_hant: '申訴與救濟中心',
  zh_hans: '申诉与救济中心',
  en: 'Appeals and Remedies',
}

const description = {
  zh_hant:
    '整理 Matters 使用者的檢舉、申訴、個人資料權利、著作權與平台處理救濟管道。',
  zh_hans:
    '整理 Matters 使用者的举报、申诉、个人资料权利、著作权与平台处理救济管道。',
  en: 'Report, appeal, privacy, copyright, and remedy channels for Matters users.',
}

const Appeals = () => (
  <ComplianceDoc title={title} description={description} content={content} />
)

export default Appeals
