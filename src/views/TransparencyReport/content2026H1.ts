const zh_hant = `
本頁是 Matters 2026 H1 透明度報告。報告期間為 2026-01-01 至 2026-06-30，時區為 Asia/Taipei。統計於 2026-07-14 完成匯出與核定，並於 2026-07-24 完成正式收件信箱補充複核。

公開數字只包含聚合結果，不包含姓名、電子郵件、IP、內容原文、案件編號、內部備註、法律文件或附件。正數低於 5 件時統一顯示為 \`<5\`，降低從交叉分類反推出單一個案的風險。

## 1. 資料來源與範圍

站內統計由 production 唯讀資料庫的固定期間匯出產生。政府、法律與個資權利請求由私有法律及合規歷史底稿與正式收件信箱的唯讀搜尋補充，公開政策、模型與推薦變更則依已合併的 GitHub PR 整理。

一般內容檢舉與申訴的新案件資料模型尚未完整涵蓋舊制紀錄，因此相關 0 件只能解讀為本期結構化來源沒有可計入案件。Community Watch 公開紀錄的涵蓋較完整，可作為本期治理活動的主要量化資料。

## 2. Matters 內容治理架構

Matters 的治理由使用者檢舉、Community Watch、站方管理員與反濫用模型共同運作。模型會依不同場景提供分數、候選提示或通知，部分明確規則可影響內容能見度，但高風險與不確定案件保留人工覆核及申訴管道。

## 3. 結構化案件與申訴

- 結構化治理案件 0 件，資料狀態為部分涵蓋。
- 結構化申訴 0 件，維持、撤銷、部分撤銷、待處理與因申訴恢復均為 0 件。
- 本期沒有足以計算平均值、中位數或第 90 百分位的已結案結構化案件，處理時間標示為未記錄。

這些 0 件不代表平台沒有處理檢舉或申訴。舊制 email 與部署前案件沒有完整回填，下一期仍需改善來源涵蓋。

## 4. Community Watch

- 治理動作共 717 件。
- 色情廣告 661 件。
- 垃圾廣告 56 件。
- Community Watch 申訴 0 件。
- 工作人員主動恢復 \`<5\` 件。
- 工作人員人工覆核 \`<5\` 件。

主動恢復是工作人員自行覆核後的結果，沒有先發生申訴，因此不計入申訴成功。

## 5. 自動化與模型輔助

本期加入留言專用垃圾內容模型路由與備援、留言分級通知、動態專用模型路由，以及協同行為候選與人工覆核佇列。模型在不同介面可能扮演監測、通知、候選排序或能見度調節角色，不應把所有模型分數理解為自動刪除。

詳細用途、限制與申訴方式請參考 [自動化與反濫用模型](/transparency/automation)。

## 6. 政府與法律請求

2026 H1 政府與法律請求為 0 件。

核定時已檢查已知私有法律及合規歷史底稿，並於補充複核時直接搜尋正式收件信箱。歷史底稿最後一筆紀錄在 2025 年 7 月，正式信箱在本期也沒有政府或法律請求候選。公開報告只揭露本期聚合總數，不公開歷史個案與內部證據連結。

## 7. 個人資料權利請求

2026 H1 個資權利請求為 5 件，全部屬於使用者主動提出的帳號刪除或註銷請求。查詢、閱覽或複製為 0 件，更正為 0 件，刪除為 5 件，停止蒐集、處理或利用為 0 件。

補充複核使用固定期間與中英文權利請求關鍵詞搜尋正式收件信箱，以不同會話群組去重。公開報告只揭露聚合數字，不公開寄件者、帳號、主旨、往來內容或內部處理紀錄。

權利內容與聯絡管道請參考 [隱私政策與使用者協議](/tos) 及 [申訴與救濟中心](/appeals)。

## 8. 推薦與排序

本期新增熱門動態入口，調整熱門動態排序與時間衰減，並讓主題頻道的非置頂內容一致套用垃圾內容排除規則。完整入口、訊號、使用者控制與限制請參考 [推薦與排序透明度](/transparency/recommendations)。

## 9. 重大變更紀錄

本期核定 3 筆政策變更、4 筆模型與自動化變更、4 筆推薦與排序變更。

- 2026-05-17，Community Watch 前端進入 production。[PR #5901](https://github.com/thematters/matters-web/pull/5901)
- 2026-06-20，新增透明度、申訴、自動化、推薦與數位素養公開頁。[PR #5983](https://github.com/thematters/matters-web/pull/5983)
- 2026-06-30，協同行為處置加入帳號年齡與貢獻保護措施。[PR #4888](https://github.com/thematters/matters-server/pull/4888)
- 2026-06-15，加入留言專用垃圾內容模型路由與備援。[PR #4849](https://github.com/thematters/matters-server/pull/4849)
- 2026-06-16，加入留言垃圾內容分級通知。[PR #4852](https://github.com/thematters/matters-server/pull/4852)
- 2026-06-19，加入動態專用垃圾內容模型路由與備援。[PR #4860](https://github.com/thematters/matters-server/pull/4860)
- 2026-06-20，加入協同行為候選、人工覆核與稽核事件。[PR #4863](https://github.com/thematters/matters-server/pull/4863)
- 2026-06-02，新增熱門動態入口與候選內容查詢。[PR #5954](https://github.com/thematters/matters-web/pull/5954)
- 2026-06-04，調整熱門動態排序邏輯。[PR #4836](https://github.com/thematters/matters-server/pull/4836)
- 2026-06-16，調整熱門動態時間衰減。[PR #4853](https://github.com/thematters/matters-server/pull/4853)
- 2026-06-21，主題頻道一致套用垃圾內容排除規則。[PR #4864](https://github.com/thematters/matters-server/pull/4864)

## 10. 已知限制與下一期改善

- 舊制檢舉與 email 申訴沒有完整回填，無法提供完整成立率與處理時間。
- 結構化案件資料模型在本期後段才完成，需持續累積才能進行趨勢比較。
- 政府與法律請求已核定為 0 件；個資權利請求經正式收件信箱補充複核後修正為 5 件刪除請求。
- 後續應直接使用固定登錄表記錄政府、法律與個資權利請求，減少期末人工回溯。

## 機器可讀資料與相關頁面

- [2026 H1 公開聚合 JSON](/transparency/aggregate-transparency-metrics-2026-H1.public.json)
- [透明度中心](/transparency)
- [自動化與反濫用模型](/transparency/automation)
- [推薦與排序透明度](/transparency/recommendations)
- [數位素養資源](/transparency/digital-literacy)
- [申訴與救濟中心](/appeals)
- [Community Watch 公開紀錄](https://community-watch.matters.town/)
`

const zh_hans = `
本页是 Matters 2026 H1 透明度报告。报告期间为 2026-01-01 至 2026-06-30，时区为 Asia/Taipei。统计于 2026-07-14 完成汇出与核定，并于 2026-07-24 完成正式收件信箱补充复核。

公开数字只包含聚合结果，不包含姓名、电子邮件、IP、内容原文、案件编号、内部备注、法律文件或附件。正数低于 5 件时统一显示为 \`<5\`，降低从交叉分类反推出单一个案的风险。

## 1. 资料来源与范围

站内统计由 production 只读资料库的固定期间汇出产生。政府、法律与个人资料权利请求由私有法律及合规历史底稿与正式收件信箱的只读搜寻补充，公开政策、模型与推荐变更则依已合并的 GitHub PR 整理。

一般内容举报与申诉的新案件资料模型尚未完整涵盖旧制记录，因此相关 0 件只能解读为本期结构化来源没有可计入案件。Community Watch 公开记录的涵盖较完整，可作为本期治理活动的主要量化资料。

## 2. Matters 内容治理架构

Matters 的治理由使用者举报、Community Watch、站方管理员与反滥用模型共同运作。模型会依不同场景提供分数、候选提示或通知，部分明确规则可影响内容能见度，但高风险与不确定案件保留人工复核及申诉管道。

## 3. 结构化案件与申诉

- 结构化治理案件 0 件，资料状态为部分涵盖。
- 结构化申诉 0 件，维持、撤销、部分撤销、待处理与因申诉恢复均为 0 件。
- 本期没有足以计算平均值、中位数或第 90 百分位的已结案结构化案件，处理时间标示为未记录。

这些 0 件不代表平台没有处理举报或申诉。旧制 email 与部署前案件没有完整回填，下一期仍需改善来源涵盖。

## 4. Community Watch

- 治理动作共 717 件。
- 色情广告 661 件。
- 垃圾广告 56 件。
- Community Watch 申诉 0 件。
- 工作人员主动恢复 \`<5\` 件。
- 工作人员人工复核 \`<5\` 件。

主动恢复是工作人员自行复核后的结果，没有先发生申诉，因此不计入申诉成功。

## 5. 自动化与模型辅助

本期加入留言专用垃圾内容模型路由与备援、留言分级通知、动态专用模型路由，以及协同行为候选与人工复核队列。模型在不同界面可能扮演监测、通知、候选排序或能见度调节角色，不应把所有模型分数理解为自动删除。

详细用途、限制与申诉方式请参考 [自动化与反滥用模型](/transparency/automation)。

## 6. 政府与法律请求

2026 H1 政府与法律请求为 0 件。

核定时已检查已知私有法律及合规历史底稿，并在补充复核时直接搜寻正式收件信箱。历史底稿最后一笔记录在 2025 年 7 月，正式信箱在本期也没有政府或法律请求候选。公开报告只披露本期聚合总数，不公开历史个案与内部证据链接。

## 7. 个人资料权利请求

2026 H1 个人资料权利请求为 5 件，全部属于使用者主动提出的帐号删除或注销请求。查询、阅览或复制为 0 件，更正为 0 件，删除为 5 件，停止搜集、处理或利用为 0 件。

补充复核使用固定期间与中英文权利请求关键词搜寻正式收件信箱，以不同会话群组去重。公开报告只揭露聚合数字，不公开寄件者、帐号、主旨、往来内容或内部处理记录。

权利内容与联系管道请参考 [隐私政策与使用者协议](/tos) 及 [申诉与救济中心](/appeals)。

## 8. 推荐与排序

本期新增热门动态入口，调整热门动态排序与时间衰减，并让主题频道的非置顶内容一致套用垃圾内容排除规则。完整入口、信号、使用者控制与限制请参考 [推荐与排序透明度](/transparency/recommendations)。

## 9. 重大变更记录

本期核定 3 笔政策变更、4 笔模型与自动化变更、4 笔推荐与排序变更。

- 2026-05-17，Community Watch 前端进入 production。[PR #5901](https://github.com/thematters/matters-web/pull/5901)
- 2026-06-20，新增透明度、申诉、自动化、推荐与数字素养公开页。[PR #5983](https://github.com/thematters/matters-web/pull/5983)
- 2026-06-30，协同行为处置加入帐号年龄与贡献保护措施。[PR #4888](https://github.com/thematters/matters-server/pull/4888)
- 2026-06-15，加入留言专用垃圾内容模型路由与备援。[PR #4849](https://github.com/thematters/matters-server/pull/4849)
- 2026-06-16，加入留言垃圾内容分级通知。[PR #4852](https://github.com/thematters/matters-server/pull/4852)
- 2026-06-19，加入动态专用垃圾内容模型路由与备援。[PR #4860](https://github.com/thematters/matters-server/pull/4860)
- 2026-06-20，加入协同行为候选、人工复核与稽核事件。[PR #4863](https://github.com/thematters/matters-server/pull/4863)
- 2026-06-02，新增热门动态入口与候选内容查询。[PR #5954](https://github.com/thematters/matters-web/pull/5954)
- 2026-06-04，调整热门动态排序逻辑。[PR #4836](https://github.com/thematters/matters-server/pull/4836)
- 2026-06-16，调整热门动态时间衰减。[PR #4853](https://github.com/thematters/matters-server/pull/4853)
- 2026-06-21，主题频道一致套用垃圾内容排除规则。[PR #4864](https://github.com/thematters/matters-server/pull/4864)

## 10. 已知限制与下一期改善

- 旧制举报与 email 申诉没有完整回填，无法提供完整成立率与处理时间。
- 结构化案件资料模型在本期后段才完成，需持续累积才能进行趋势比较。
- 政府与法律请求已核定为 0 件；个人资料权利请求经正式收件信箱补充复核后修正为 5 件删除请求。
- 后续应直接使用固定登录表记录政府、法律与个人资料权利请求，减少期末人工回溯。

## 机器可读资料与相关页面

- [2026 H1 公开聚合 JSON](/transparency/aggregate-transparency-metrics-2026-H1.public.json)
- [透明度中心](/transparency)
- [自动化与反滥用模型](/transparency/automation)
- [推荐与排序透明度](/transparency/recommendations)
- [数字素养资源](/transparency/digital-literacy)
- [申诉与救济中心](/appeals)
- [Community Watch 公开记录](https://community-watch.matters.town/)
`

const en = `
This is the Matters 2026 H1 Transparency Report. The reporting period is 2026-01-01 through 2026-06-30 in Asia/Taipei. Export and review were completed on 2026-07-14, followed by a supplemental review of the official inbox on 2026-07-24.

Published figures contain aggregate results only. They exclude names, email addresses, IP addresses, original content, case identifiers, internal notes, legal documents, and attachments. Positive counts below 5 are shown as \`<5\` to reduce re-identification risk across categories.

## 1. Sources and scope

On-platform metrics come from a fixed-period export of the read-only production database. Government, legal, and privacy-rights request counts are supplemented by the private legal and compliance history and read-only searches of the official inbox. Public policy, model, and recommendation changes are compiled from merged GitHub pull requests.

The new case schema for ordinary reports and appeals does not fully cover legacy records. A zero in those sections only means that the structured source contains no countable cases for this period. Community Watch public records have stronger coverage and provide the primary quantitative account of governance activity.

## 2. Matters content governance

Matters governance combines user reports, Community Watch, staff administration, and anti-abuse models. Depending on the surface, models provide scores, candidate signals, or notifications. Some explicit rules can affect visibility, while high-risk and uncertain cases retain human review and appeal paths.

## 3. Structured cases and appeals

- Structured moderation cases: 0, with partial coverage.
- Structured appeals: 0. Upheld, reversed, partially reversed, pending, and appeal-based restorations are all 0.
- There are not enough resolved structured cases to calculate average, median, or 90th-percentile handling time. Handling time is marked not recorded.

These zeros do not mean that the platform handled no reports or appeals. Legacy email and pre-deployment cases were not fully backfilled and remain a coverage gap for the next report.

## 4. Community Watch

- Total governance actions: 717.
- Porn ads: 661.
- Spam ads: 56.
- Community Watch appeals: 0.
- Proactive staff restorations: \`<5\`.
- Staff reviews: \`<5\`.

Proactive restorations followed staff review without a preceding appeal, so they are not counted as successful appeals.

## 5. Automation and model assistance

This period added a comment-specific spam model route and fallback, graded comment notifications, a moment-specific model route, and a coordinated-behavior candidate and human-review queue. Depending on the surface, models can monitor, notify, rank candidates, or adjust visibility. A model score should not be read as automatic deletion in every case.

See [Automation and Anti-Abuse Models](/transparency/automation) for purposes, limitations, and appeal paths.

## 6. Government and legal requests

Government and legal requests in 2026 H1: 0.

The review covered the known private legal and compliance history and included direct searches of the official inbox during the supplemental review. The history's latest entry is from July 2025, and the official inbox contained no government or legal request candidates for this period. This report publishes only the H1 aggregate and does not expose historical cases or internal evidence links.

## 7. Personal data rights requests

Personal data rights requests in 2026 H1: 5. All were user-initiated account deletion or closure requests. Access or copy: 0; correction: 0; deletion: 5; restriction: 0.

The supplemental review used fixed-period searches for Chinese and English rights-request terms and deduplicated results by conversation thread. The public report discloses aggregate counts only and excludes senders, account identifiers, subjects, message content, and internal handling records.

See the [Privacy Policy and Terms](/tos) and [Appeals and Remedies](/appeals) for rights and contact channels.

## 8. Recommendations and ranking

This period added the Hot Moments entry point, adjusted Hot Moments ranking and time decay, and made non-pinned topic-channel content consistently honor spam exclusion. See [Recommendation and Ranking Transparency](/transparency/recommendations) for surfaces, signals, user controls, and limitations.

## 9. Material changes

The reviewed change log contains 3 policy changes, 4 model and automation changes, and 4 recommendation and ranking changes.

- 2026-05-17: Community Watch frontend entered production. [PR #5901](https://github.com/thematters/matters-web/pull/5901)
- 2026-06-20: transparency, appeals, automation, recommendation, and digital-literacy pages were added. [PR #5983](https://github.com/thematters/matters-web/pull/5983)
- 2026-06-30: coordinated-behavior actions gained account-age and contribution safeguards. [PR #4888](https://github.com/thematters/matters-server/pull/4888)
- 2026-06-15: a comment-specific spam model route and fallback were added. [PR #4849](https://github.com/thematters/matters-server/pull/4849)
- 2026-06-16: graded comment-spam notifications were added. [PR #4852](https://github.com/thematters/matters-server/pull/4852)
- 2026-06-19: a moment-specific spam model route and fallback were added. [PR #4860](https://github.com/thematters/matters-server/pull/4860)
- 2026-06-20: coordinated-behavior candidates, human review, and audit events were added. [PR #4863](https://github.com/thematters/matters-server/pull/4863)
- 2026-06-02: the Hot Moments entry point and candidate query were added. [PR #5954](https://github.com/thematters/matters-web/pull/5954)
- 2026-06-04: Hot Moments ranking was adjusted. [PR #4836](https://github.com/thematters/matters-server/pull/4836)
- 2026-06-16: Hot Moments time decay was adjusted. [PR #4853](https://github.com/thematters/matters-server/pull/4853)
- 2026-06-21: topic-channel content consistently adopted spam exclusion. [PR #4864](https://github.com/thematters/matters-server/pull/4864)

## 10. Known limitations and next improvements

- Legacy reports and email appeals were not fully backfilled, so complete outcome rates and handling times are unavailable.
- The structured case schema was completed late in the period and needs continued accumulation before trend comparisons are meaningful.
- Government and legal requests were confirmed as 0. The supplemental official-inbox review corrected personal data rights requests to 5 deletion requests.
- Future government, legal, and privacy-rights requests should enter a fixed register as they arrive to reduce end-of-period reconstruction.

## Machine-readable data and related pages

- [2026 H1 public aggregate JSON](/transparency/aggregate-transparency-metrics-2026-H1.public.json)
- [Transparency Center](/transparency)
- [Automation and Anti-Abuse Models](/transparency/automation)
- [Recommendation and Ranking Transparency](/transparency/recommendations)
- [Digital Literacy Resources](/transparency/digital-literacy)
- [Appeals and Remedies](/appeals)
- [Community Watch records](https://community-watch.matters.town/)
`

const content = {
  zh_hant,
  zh_hans,
  en,
}

export default content
