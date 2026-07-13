const zh_hant = `
本頁說明 Matters 在內容治理與反濫用工作中，如何使用自動化、模型輔助與人工判斷。以下狀態依 2026 年 7 月 13 日的 production 設定整理。模型版本、功能開關與處理統計將隨透明度報告定期更新。

## 基本原則

- 不以未經覆核的模型分數作為限制使用者帳號的唯一依據。
- 明確區分模型提示、模型輔助、人工審查與自動化處理。
- 影響內容可見性或帳號狀態時，應提供可理解的處理理由與申訴管道。
- 不公開可被濫用來規避偵測的完整門檻、特徵或操作細節。
- 反濫用資料若用於訓練或評測，應盡量降低個資與危險連結暴露。

## 自動化角色

Matters 會用以下標籤描述模型或自動化在個案中的角色。

- none 表示未使用模型或自動化。
- suggested 表示模型只提供候選或提示，仍需人工判斷。
- assisted 表示模型結果協助排序、分流或提示審查者。
- automated 表示系統在符合條件時自動改變內容可見性或狀態。

若某個功能只在 shadow、dry-run 或 notify-only 模式運作，透明度報告應明確標示。

## 目前使用中的系統

### 文章垃圾內容分類

- production 部署識別碼為 article-spam-model-v20251229。
- 使用範圍為文章發布時的垃圾內容評分、探索分發與主題頻道過濾。
- 自動化角色為 automated。全站垃圾內容偵測與主題頻道過濾目前均已啟用。
- 達到系統條件的文章可能不進入部分探索、搜尋索引或後續分發流程。管理員仍可覆核及更正判定。
- 使用者可透過[申訴與救濟中心](/appeals)要求重新檢視。

### 留言垃圾內容評分

- production 部署識別碼為 spam-comment-model-service。
- 使用範圍為留言垃圾內容評分與管理員審查通知。
- 自動化角色為 assisted。評分與 notify-only 通知目前已啟用。
- 自動收合目前未啟用，模型分數本身不會隱藏或刪除留言。採取處理措施前仍需人工判斷。
- Community Watch 的處理範圍與權限另依其公開規則辦理。

### 動態垃圾內容評分

- production 部署識別碼為 moment-spam-model-service。
- 使用範圍為動態垃圾內容評分與管理員審查排序。
- 自動化角色為 assisted。模型分數本身不會自動隱藏、刪除或限制動態。
- 是否採取處理措施由管理員依內容與相關證據判斷。

### 協同行為與垃圾群組偵測

- 本系統是規則與聚合流程，沒有單一模型版本。
- 使用範圍為發現疑似協同垃圾行為，並將待審查成員暫時排除於部分探索頁面。
- 自動化角色為 automated，且每個候選群組均須由管理員覆核。
- 管理員可確認處理、排除誤判或解除限制。若同一成員仍屬於其他有效案件，相關限制可能繼續存在。

### Discovery probation

- 此功能開關截至本頁檢視日為停用狀態。
- 停用期間不會透過此機制改變內容或帳號狀態。

## Community Watch

Community Watch 第一階段由受託使用者處理明確垃圾留言，理由限於「色情廣告」與「濫發廣告」。規則明定 AI 不得直接刪除留言。AI 或模型若被使用，只能作為候選檢測、提示或後續評測資料來源。

## 使用者通知與申訴

若內容或帳號因使用者檢舉、Community Watch、管理員處理、模型輔助或自動化而受到限制，通知應盡量說明處理來源、公開理由、可申訴管道與可補充資料。

目前申訴管道請參考[申訴與救濟中心](/appeals)。

## 資料與隱私

反濫用資料可能包含使用者內容、處理理由、覆核結果與時間戳。若資料用於訓練或評測，應盡量去識別化、避免散播垃圾連結或色情內容，並保留必要的人工理由與覆核結果。

## 後續定期揭露

- 每期模型輔助與自動化處理的案件數及比例。
- 模型相關誤判、申訴、維持原決定與恢復統計。
- 重大模型、處理模式或門檻變更紀錄。
- 統計期間、資料來源、低件數保護與資料限制。

## 相關頁面

- [透明度中心](/transparency)
- [2026 H1 透明度報告](/transparency/2026-h1)
- [申訴與救濟中心](/appeals)
- [Community Watch 規則](https://community-watch.matters.town/rules/)
`

const zh_hans = `
本页说明 Matters 在内容治理与反滥用工作中，如何使用自动化、模型辅助与人工判断。以下状态依 2026 年 7 月 13 日的 production 设置整理。模型版本、功能开关与处理统计将随透明度报告定期更新。

## 基本原则

- 不以未经复核的模型分数作为限制使用者帐号的唯一依据。
- 明确区分模型提示、模型辅助、人工审查与自动化处理。
- 影响内容可见性或帐号状态时，应提供可理解的处理理由与申诉管道。
- 不公开可被滥用来规避侦测的完整门槛、特征或操作细节。
- 反滥用资料若用于训练或评测，应尽量降低个资与危险连结暴露。

## 自动化角色

Matters 会用以下标签描述模型或自动化在个案中的角色。

- none 表示未使用模型或自动化。
- suggested 表示模型只提供候选或提示，仍需人工判断。
- assisted 表示模型结果协助排序、分流或提示审查者。
- automated 表示系统在符合条件时自动改变内容可见性或状态。

若某个功能只在 shadow、dry-run 或 notify-only 模式运作，透明度报告应明确标示。

## 目前使用中的系统

### 文章垃圾内容分类

- production 部署识别码为 article-spam-model-v20251229。
- 使用范围为文章发布时的垃圾内容评分、探索分发与主题频道过滤。
- 自动化角色为 automated。全站垃圾内容侦测与主题频道过滤目前均已启用。
- 达到系统条件的文章可能不进入部分探索、搜索索引或后续分发流程。管理员仍可复核及更正判定。
- 使用者可透过[申诉与救济中心](/appeals)要求重新检视。

### 留言垃圾内容评分

- production 部署识别码为 spam-comment-model-service。
- 使用范围为留言垃圾内容评分与管理员审查通知。
- 自动化角色为 assisted。评分与 notify-only 通知目前已启用。
- 自动收合目前未启用，模型分数本身不会隐藏或删除留言。采取处理措施前仍需人工判断。
- Community Watch 的处理范围与权限另依其公开规则办理。

### 动态垃圾内容评分

- production 部署识别码为 moment-spam-model-service。
- 使用范围为动态垃圾内容评分与管理员审查排序。
- 自动化角色为 assisted。模型分数本身不会自动隐藏、删除或限制动态。
- 是否采取处理措施由管理员依内容与相关证据判断。

### 协同行为与垃圾群组侦测

- 本系统是规则与聚合流程，没有单一模型版本。
- 使用范围为发现疑似协同垃圾行为，并将待审查成员暂时排除于部分探索页面。
- 自动化角色为 automated，且每个候选群组均须由管理员复核。
- 管理员可确认处理、排除误判或解除限制。若同一成员仍属于其他有效案件，相关限制可能继续存在。

### Discovery probation

- 此功能开关截至本页检视日为停用状态。
- 停用期间不会透过此机制改变内容或帐号状态。

## Community Watch

Community Watch 第一阶段由受托使用者处理明确垃圾留言，理由限于「色情广告」与「滥发广告」。规则明定 AI 不得直接删除留言。AI 或模型若被使用，只能作为候选检测、提示或后续评测资料来源。

## 使用者通知与申诉

若内容或帐号因使用者举报、Community Watch、管理员处理、模型辅助或自动化而受到限制，通知应尽量说明处理来源、公开理由、可申诉管道与可补充资料。

目前申诉管道请参考[申诉与救济中心](/appeals)。

## 资料与隐私

反滥用资料可能包含使用者内容、处理理由、复核结果与时间戳。若资料用于训练或评测，应尽量去识别化、避免散播垃圾连结或色情内容，并保留必要的人工理由与复核结果。

## 后续定期揭露

- 每期模型辅助与自动化处理的案件数及比例。
- 模型相关误判、申诉、维持原决定与恢复统计。
- 重大模型、处理模式或门槛变更记录。
- 统计期间、资料来源、低件数保护与资料限制。

## 相关页面

- [透明度中心](/transparency)
- [2026 H1 透明度报告](/transparency/2026-h1)
- [申诉与救济中心](/appeals)
- [Community Watch 规则](https://community-watch.matters.town/rules/)
`

const en = `
This page explains how Matters uses automation, model assistance, and human judgment in content governance and anti-abuse work. The statuses below reflect production configuration reviewed on July 13, 2026. Model versions, feature flags, and handling metrics will be updated through periodic transparency reports.

## Principles

- Do not use unreviewed model scores as the sole basis for restricting a user account.
- Clearly distinguish model hints, model assistance, human review, and automated actions.
- When content visibility or account state is affected, provide understandable reasons and appeal channels.
- Do not disclose exact thresholds, features, or operational details that would help abuse.
- When anti-abuse data is used for training or evaluation, reduce exposure of personal data and harmful links.

## Automation roles

Matters uses the following labels to describe the role of models or automation in a case.

- none means no model or automation was used.
- suggested means the model only provided a candidate or hint.
- assisted means the model helped rank, route, or inform review.
- automated means the system changed visibility or state when configured conditions were met.

If a feature is shadow-only, dry-run, or notify-only, the transparency report should state that clearly.

## Systems currently in use

### Article spam classification

- Production deployment identifier is article-spam-model-v20251229.
- The system scores articles during publication and informs discovery distribution and topic-channel filtering.
- Its automation role is automated. Global spam detection and topic-channel filtering are currently enabled.
- Articles meeting configured conditions may be withheld from some discovery, search indexing, or downstream distribution processes. Staff can review and correct the classification.
- Users may request another review through [Appeals and Remedies](/appeals).

### Comment spam scoring

- Production deployment identifier is spam-comment-model-service.
- The system scores comments and sends staff review alerts.
- Its automation role is assisted. Scoring and notify-only alerts are currently enabled.
- Automatic collapsing is not enabled. A model score alone does not hide or delete a comment, and staff judgment is required before enforcement.
- Community Watch has separate published rules governing its scope and permissions.

### Moment spam scoring

- Production deployment identifier is moment-spam-model-service.
- The system scores moments and helps order staff review.
- Its automation role is assisted. A model score alone does not hide, delete, or restrict a moment.
- Staff decide whether to act after reviewing the content and related evidence.

### Coordinated behavior and spam-ring detection

- This is a rules and aggregation pipeline, not a single versioned model.
- It identifies suspected coordinated spam behavior and temporarily excludes pending members from some discovery surfaces.
- Its automation role is automated, and every candidate ring requires staff review.
- Staff can confirm action, dismiss a false positive, or lift restrictions. Restrictions may remain if the same member is still part of another active case.

### Discovery probation

- This feature flag was disabled on the review date.
- While disabled, it does not change content or account state.

## Community Watch

Community Watch is handled by trusted users in its first phase. The scope is limited to clear porn ads and spam ads. The rules state that AI may not directly remove comments. AI or models may only be used for candidate detection, hints, or later evaluation data.

## User notice and appeals

If content or an account is restricted due to user reports, Community Watch, staff action, model assistance, or automation, notices should explain the source, public reason, appeal channel, and useful context the user may provide.

Current appeal channels are listed on [Appeals and Remedies](/appeals).

## Data and privacy

Anti-abuse data may include user content, handling reasons, review outcomes, and timestamps. When used for training or evaluation, Matters should reduce identifiability, avoid spreading spam links or sexual content, and preserve necessary human reasons and review outcomes.

## Future periodic disclosures

- Counts and ratios of model-assisted and automated handling for each period.
- Model-related mistakes, appeals, upheld decisions, and restorations.
- Major model, handling-mode, or threshold change logs.
- Reporting periods, data sources, low-count protections, and data limitations.

## Related pages

- [Transparency Center](/transparency)
- [2026 H1 Transparency Report](/transparency/2026-h1)
- [Appeals and Remedies](/appeals)
- [Community Watch rules](https://community-watch.matters.town/rules/)
`

const content = {
  zh_hant,
  zh_hans,
  en,
}

export default content
