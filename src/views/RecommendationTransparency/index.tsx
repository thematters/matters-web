import ComplianceDoc from '~/views/ComplianceDoc'

import content from './content'

const title = {
  zh_hant: '推薦與排序透明度',
  zh_hans: '推荐与排序透明度',
  en: 'Recommendation and Ranking Transparency',
}

const description = {
  zh_hant: '說明 Matters 內容入口、排序因素、可見性限制與使用者可控制項。',
  zh_hans: '说明 Matters 内容入口、排序因素、可见性限制与使用者可控制项。',
  en: 'How Matters explains content entry points, ranking factors, visibility restrictions, and user controls.',
}

const RecommendationTransparency = () => (
  <ComplianceDoc title={title} description={description} content={content} />
)

export default RecommendationTransparency
