const zh_hant = `
本頁是 2026 H1 透明度報告草稿。報告期間為 2026-01-01 至 2026-06-30，目前正在彙整並覆核正式統計數字。完成資料檢核前，本頁保留資料狀態與已知缺口，不將未驗證數字視為正式統計。平台內部處理統計的 server 匯出與 ObservableHQ 交叉檢核路徑已建立。

## 1. 報告期間與範圍

資料狀態：報告期間已結束，正式統計數字正在匯出與覆核。

本期預計涵蓋 Matters.town 站台上的文章、留言、動態、帳號處理、Community Watch、一般內容檢舉、申訴救濟、政府或法律請求、個人資料權利請求與重大政策變更。

## 2. Matters 內容治理架構

資料狀態：可先以文字說明。

本章應說明使用者檢舉、Community Watch、站方管理員、反濫用模型輔助與平台規則之間的關係。若模型僅用於候選提示或通知，也應明確標示。

## 3. 內容檢舉與處理統計

資料狀態：案件資料模型、server 匯出與 ObservableHQ 檢核路徑已補上，統計待部署與檢核後填入。

本章應揭露檢舉件數、內容類型、檢舉理由、處理結果、平均處理時間與資料缺口。一般內容檢舉可由 moderation case 與 moderation event 匯出，舊資料或部署前資料仍應標示為資料缺口。

## 4. Community Watch 處理統計

資料狀態：部分可由公開紀錄彙整。

本章應揭露色情廣告、濫發廣告、申訴、恢復、覆核與資料清除件數。公開紀錄可作為第一版主要資料來源。

## 5. 申訴、複查與恢復統計

資料狀態：案件與 Community Watch 聚合路徑已補上，email 申訴仍需結構化。

本章應揭露申訴件數、成立、不成立、部分成立、處理中、恢復內容與平均處理時間。若一般 email 申訴尚未結構化，應列為下一期改善。

## 6. 自動化與模型輔助處理

資料狀態：待與 production flag 與工程紀錄核對。

本章應揭露模型用途、是否直接影響可見性、人工審查角色、誤判救濟與重大變更。若某模型僅 shadow 或 notify-only，應明確標示。

主題說明請參考 [自動化與反濫用模型](/transparency/automation)。

## 7. 政府與法律請求

資料狀態：需由私有聚合 JSON 補入，若未提供應標示為尚未完整記錄。

本章應揭露聚合件數、法域或機關類型、請求類型、資料類型、回覆結果與使用者通知狀態。若本期才建立登錄流程，應如實標示。

## 8. 個人資料、資料分享與使用者權利

資料狀態：可由隱私政策摘要，個資權利請求需由私有聚合 JSON 補入。

本章應摘要個資蒐集、使用、分享、保存、使用者權利與請求管道。若尚未統計個資權利請求件數，應列入下一期改善。

## 9. 推薦系統與產品介面

資料狀態：尚未完整公開。

本章應說明熱門、最新、追蹤、標籤、內容狀態與 spam exclusion 如何影響可見性。第一版可先描述主要入口與待補工程確認項目。

主題說明請參考 [推薦與排序透明度](/transparency/recommendations)。

## 10. 資安與濫用防制

資料狀態：待彙整。

本章應揭露平台處理 spam、帳號濫用、資料風險與可用性事件的治理方式。不得揭露可被濫用的細節。

## 11. 規則、政策與模型變更紀錄

資料狀態：可由外部結構化變更紀錄補入，數字與摘要待審閱後填入。

本章應列出本期 ToS、Privacy、Community Watch 規則、反濫用模型與推薦規則的重大變更。

## 12. 外部回饋與下一期改善

資料狀態：待建立流程。

本章應列出使用者、研究者、社群或外部專家的回饋，以及採納、部分採納或未採納的原因。第一版可先列出下一期要補齊的資料。

## 本期已知缺口

- 一般內容檢舉的案件資料模型已補上，舊資料與部署前資料仍需標示缺口。
- 一般申訴尚未完整統計成立率、處理時間與結果。
- 政府或法律請求、個資權利請求與重大變更紀錄需要由資料維護者提供私有或公開安全的聚合 JSON。
- 自動化與模型輔助需要與 production flag、通知與處理結果對齊。
- 推薦與排序說明需要與實際產品與後端邏輯核對。

## 相關頁面

- [透明度中心](/transparency)
- [自動化與反濫用模型](/transparency/automation)
- [推薦與排序透明度](/transparency/recommendations)
- [數位素養資源](/transparency/digital-literacy)
- [申訴與救濟中心](/appeals)
- [Community Watch 公開紀錄](https://community-watch.matters.town/)
- [Community Watch 規則](https://community-watch.matters.town/rules/)
`

const zh_hans = `
本页是 2026 H1 透明度报告草稿。报告期间为 2026-01-01 至 2026-06-30，目前正在汇整并复核正式统计数字。完成资料检核前，本页保留资料状态与已知缺口，不将未验证数字视为正式统计。平台内部处理统计的 server 汇出与 ObservableHQ 交叉检核路径已建立。

## 1. 报告期间与范围

资料状态：报告期间已结束，正式统计数字正在汇出与复核。

本期预计涵盖 Matters.town 站台上的文章、留言、动态、帐号处理、Community Watch、一般内容举报、申诉救济、政府或法律请求、个人资料权利请求与重大政策变更。

## 2. Matters 内容治理架构

资料状态：可先以文字说明。

本章应说明使用者举报、Community Watch、站方管理员、反滥用模型辅助与平台规则之间的关系。若模型仅用于候选提示或通知，也应明确标示。

## 3. 内容举报与处理统计

资料状态：案件资料模型、server 汇出与 ObservableHQ 检核路径已补上，统计待部署与检核后填入。

本章应揭露举报件数、内容类型、举报理由、处理结果、平均处理时间与资料缺口。一般内容举报可由 moderation case 与 moderation event 汇出，旧资料或部署前资料仍应标示为资料缺口。

## 4. Community Watch 处理统计

资料状态：部分可由公开记录汇整。

本章应揭露色情广告、滥发广告、申诉、恢复、复核与资料清除件数。公开记录可作为第一版主要资料来源。

## 5. 申诉、复查与恢复统计

资料状态：案件与 Community Watch 聚合路径已补上，email 申诉仍需结构化。

本章应揭露申诉件数、成立、不成立、部分成立、处理中、恢复内容与平均处理时间。若一般 email 申诉尚未结构化，应列为下一期改善。

## 6. 自动化与模型辅助处理

资料状态：待与 production flag 与工程记录核对。

本章应揭露模型用途、是否直接影响可见性、人工审查角色、误判救济与重大变更。若某模型仅 shadow 或 notify-only，应明确标示。

主题说明请参考 [自动化与反滥用模型](/transparency/automation)。

## 7. 政府与法律请求

资料状态：需由私有聚合 JSON 补入，若未提供应标示为尚未完整记录。

本章应揭露聚合件数、法域或机关类型、请求类型、资料类型、回复结果与使用者通知状态。若本期才建立登录流程，应如实标示。

## 8. 个人资料、资料分享与使用者权利

资料状态：可由隐私政策摘要，个资权利请求需由私有聚合 JSON 补入。

本章应摘要个资搜集、使用、分享、保存、使用者权利与请求管道。若尚未统计个资权利请求件数，应列入下一期改善。

## 9. 推荐系统与产品介面

资料状态：尚未完整公开。

本章应说明热门、最新、追踪、标签、内容状态与 spam exclusion 如何影响可见性。第一版可先描述主要入口与待补工程确认项目。

主题说明请参考 [推荐与排序透明度](/transparency/recommendations)。

## 10. 资安与滥用防制

资料状态：待汇整。

本章应揭露平台处理 spam、帐号滥用、资料风险与可用性事件的治理方式。不得揭露可被滥用的细节。

## 11. 规则、政策与模型变更记录

资料状态：可由外部结构化变更记录补入，数字与摘要待审阅后填入。

本章应列出本期 ToS、Privacy、Community Watch 规则、反滥用模型与推荐规则的重大变更。

## 12. 外部反馈与下一期改善

资料状态：待建立流程。

本章应列出使用者、研究者、社群或外部专家的反馈，以及采纳、部分采纳或未采纳的原因。第一版可先列出下一期要补齐的资料。

## 本期已知缺口

- 一般内容举报的案件资料模型已补上，旧资料与部署前资料仍需标示缺口。
- 一般申诉尚未完整统计成立率、处理时间与结果。
- 政府或法律请求、个资权利请求与重大变更记录需要由资料维护者提供私有或公开安全的聚合 JSON。
- 自动化与模型辅助需要与 production flag、通知与处理结果对齐。
- 推荐与排序说明需要与实际产品与后端逻辑核对。

## 相关页面

- [透明度中心](/transparency)
- [自动化与反滥用模型](/transparency/automation)
- [推荐与排序透明度](/transparency/recommendations)
- [数字素养资源](/transparency/digital-literacy)
- [申诉与救济中心](/appeals)
- [Community Watch 公开记录](https://community-watch.matters.town/)
- [Community Watch 规则](https://community-watch.matters.town/rules/)
`

const en = `
This page is the draft 2026 H1 transparency report. The reporting period ran from 2026-01-01 to 2026-06-30, and final metrics are now being compiled and reviewed. Until validation is complete, this page documents data status and known gaps without treating unverified figures as final. The server export and ObservableHQ cross-check path for internal moderation metrics has been prepared.

## 1. Reporting period and scope

Data status: reporting period complete; final metrics are being exported and reviewed.

This report is expected to cover articles, comments, moments, account actions, Community Watch, ordinary content reports, appeals, government or legal requests, personal data rights requests, and major policy changes.

## 2. Matters content governance structure

Data status: text can be added first.

This section should explain how user reports, Community Watch, staff admins, anti-abuse model support, and platform rules work together. If a model is only used for hints or notifications, that should be stated clearly.

## 3. Content reports and moderation statistics

Data status: case data model, server export, and ObservableHQ cross-check path added. Metrics are pending deployment and review.

This section should disclose report counts, content types, reasons, outcomes, average handling time, and data gaps. Ordinary content reports can be exported from moderation cases and moderation events. Legacy data and pre-deployment records should still be marked as data gaps.

## 4. Community Watch statistics

Data status: partially available from public records.

This section should disclose porn ad, spam ad, appeal, restore, review, and data-clearing counts. Public records can be the main source for the first version.

## 5. Appeals, reviews, and restorations

Data status: case and Community Watch aggregate paths have been added. Email appeals still need structured records.

This section should disclose appeal counts, upheld, reversed, partially upheld, pending cases, restored content, and average handling time. If email appeals are not structured yet, mark that as an improvement for the next period.

## 6. Automation and model-assisted actions

Data status: needs production flag and engineering record review.

This section should disclose model purpose, whether visibility is affected, human review roles, appeal paths, and major changes. If a model is shadow-only or notify-only, state that clearly.

See [Automation and Anti-Abuse Models](/transparency/automation) for the topic page.

## 7. Government and legal requests

Data status: requires a private aggregate JSON file. If not provided, this section should remain marked as not fully recorded.

This section should disclose aggregated counts, jurisdiction or agency type, request type, data type, response outcome, and user notice status. If the logging process was created during this period, state that clearly.

## 8. Personal data, data sharing, and user rights

Data status: can summarize the Privacy Policy. Personal data rights request counts require a private aggregate JSON file.

This section should summarize data collection, use, sharing, retention, user rights, and request channels. If personal data rights requests are not counted yet, list that as an improvement.

## 9. Recommendation systems and product interfaces

Data status: not fully public.

This section should explain how hot, latest, following, tags, content states, and spam exclusion affect visibility. The first version can describe main entry points and items that still require engineering confirmation.

See [Recommendation and Ranking Transparency](/transparency/recommendations) for the topic page.

## 10. Security and abuse prevention

Data status: to be collected.

This section should disclose how the platform handles spam, account abuse, data risk, and availability incidents. It should not disclose details that would help abuse.

## 11. Rule, policy, and model change log

Data status: can be filled from public-safe structured change logs after review.

This section should list major changes to Terms, Privacy Policy, Community Watch rules, anti-abuse models, and recommendation rules.

## 12. External feedback and next improvements

Data status: process pending.

This section should list feedback from users, researchers, the community, or external experts, along with adopted, partially adopted, or not adopted responses. The first version can list data to improve for the next period.

## Known gaps for this period

- The case data model for ordinary content reports has been added. Legacy and pre-deployment records still need to be marked as data gaps.
- Ordinary appeals do not yet have complete statistics for success rate, handling time, and outcomes.
- Government or legal requests, personal data rights requests, and major change logs require private or public-safe aggregate JSON from data maintainers.
- Automation and model assistance need alignment with production flags, notices, and outcomes.
- Recommendation and ranking explanations need review against actual product and backend logic.

## Related pages

- [Transparency Center](/transparency)
- [Automation and Anti-Abuse Models](/transparency/automation)
- [Recommendation and Ranking Transparency](/transparency/recommendations)
- [Digital Literacy Resources](/transparency/digital-literacy)
- [Appeals and Remedies](/appeals)
- [Community Watch records](https://community-watch.matters.town/)
- [Community Watch rules](https://community-watch.matters.town/rules/)
`

const content = {
  zh_hant,
  zh_hans,
  en,
}

export default content
