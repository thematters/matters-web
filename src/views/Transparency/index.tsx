import ComplianceDoc from '~/views/ComplianceDoc'

import content from './content'

const title = {
  zh_hant: '透明度中心',
  zh_hans: '透明度中心',
  en: 'Transparency Center',
}

const description = {
  zh_hant:
    '整理 Matters 內容治理、申訴救濟、Community Watch 與透明度報告資訊。',
  zh_hans:
    '整理 Matters 内容治理、申诉救济、Community Watch 与透明度报告资讯。',
  en: 'Public information about Matters content governance, appeals, Community Watch, and transparency reporting.',
}

const Transparency = () => (
  <ComplianceDoc title={title} description={description} content={content} />
)

export default Transparency
