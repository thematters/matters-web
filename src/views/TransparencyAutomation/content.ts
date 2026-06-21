const zh_hant = `
本頁說明 Matters 在內容治理與反濫用工作中，如何使用自動化、模型輔助與人工判斷。第一版先公開原則與邊界，實際模型版本、production flag 與統計數字仍需在透明度報告中定期更新。

## 基本原則

- 不以未經覆核的模型分數作為處理使用者的唯一依據。
- 明確區分模型提示、模型輔助、人工審查與自動化處理。
- 影響內容可見性或帳號狀態時，應提供可理解的處理理由與申訴管道。
- 不公開可被濫用來規避偵測的完整門檻、特徵或操作細節。
- 反濫用資料若用於訓練或評測，應盡量降低個資與危險連結暴露。

## 自動化角色

Matters 會用以下方式描述模型或自動化在個案中的角色。

- none 表示未使用模型或自動化。
- suggested 表示模型只提供候選或提示，仍需人工判斷。
- assisted 表示模型結果協助排序、分流或提示審查者。
- automated 表示系統在符合條件時自動改變內容可見性或狀態。

若某個功能目前只在 shadow、dry-run 或 notify-only 模式運作，透明度報告應明確標示。

## Community Watch

Community Watch 第一階段由受託使用者處理明確垃圾留言，理由限於「色情廣告」與「濫發廣告」。規則明定 AI 不得直接刪除留言。AI 或模型若被使用，只能作為候選檢測、提示或後續評測資料來源。

## Spam 與濫用偵測

Matters 的反濫用工作可能使用留言、文章或動態相關訊號來協助發現 spam、廣告導流、重複內容或其他濫用行為。模型輸出可能用於告警、排序審查佇列、提供人工提示，或在特定功能開關啟用時影響內容可見性。

正式透明度報告應揭露每期使用的模式、影響範圍、是否直接處理內容、人工審查角色、申訴數與恢復數。

## 使用者通知與申訴

若內容或帳號因使用者檢舉、Community Watch、管理員處理、模型輔助或自動化而受到限制，通知應盡量說明處理來源、公開理由、可申訴管道與可補充資料。

目前申訴管道請參考 [申訴與救濟中心](/appeals)。

## 資料與隱私

反濫用資料可能包含使用者內容、處理理由、覆核結果與時間戳。若資料用於訓練或評測，應盡量去識別化、避免散播垃圾連結或色情內容，並保留必要的人工理由與覆核結果。

## 本頁尚待補齊

- 每個 production 模型的版本、用途與狀態。
- 每期模型輔助與自動化處理比例。
- 模型導致的誤判、申訴與恢復統計。
- 重大模型或門檻變更紀錄。

## 相關頁面

- [透明度中心](/transparency)
- [2026 H1 透明度報告骨架](/transparency/2026-h1)
- [申訴與救濟中心](/appeals)
- [Community Watch 規則](https://community-watch.matters.town/rules/)
`

const zh_hans = `
本页说明 Matters 在内容治理与反滥用工作中，如何使用自动化、模型辅助与人工判断。第一版先公开原则与边界，实际模型版本、production flag 与统计数字仍需在透明度报告中定期更新。

## 基本原则

- 不以未经复核的模型分数作为处理使用者的唯一依据。
- 明确区分模型提示、模型辅助、人工审查与自动化处理。
- 影响内容可见性或帐号状态时，应提供可理解的处理理由与申诉管道。
- 不公开可被滥用来规避侦测的完整门槛、特征或操作细节。
- 反滥用资料若用于训练或评测，应尽量降低个资与危险连结暴露。

## 自动化角色

Matters 会用以下方式描述模型或自动化在个案中的角色。

- none 表示未使用模型或自动化。
- suggested 表示模型只提供候选或提示，仍需人工判断。
- assisted 表示模型结果协助排序、分流或提示审查者。
- automated 表示系统在符合条件时自动改变内容可见性或状态。

若某个功能目前只在 shadow、dry-run 或 notify-only 模式运作，透明度报告应明确标示。

## Community Watch

Community Watch 第一阶段由受托使用者处理明确垃圾留言，理由限于「色情广告」与「滥发广告」。规则明定 AI 不得直接删除留言。AI 或模型若被使用，只能作为候选检测、提示或后续评测资料来源。

## Spam 与滥用侦测

Matters 的反滥用工作可能使用留言、文章或动态相关讯号来协助发现 spam、广告导流、重复内容或其他滥用行为。模型输出可能用于告警、排序审查伫列、提供人工提示，或在特定功能开关启用时影响内容可见性。

正式透明度报告应揭露每期使用的模式、影响范围、是否直接处理内容、人工审查角色、申诉数与恢复数。

## 使用者通知与申诉

若内容或帐号因使用者举报、Community Watch、管理员处理、模型辅助或自动化而受到限制，通知应尽量说明处理来源、公开理由、可申诉管道与可补充资料。

目前申诉管道请参考 [申诉与救济中心](/appeals)。

## 资料与隐私

反滥用资料可能包含使用者内容、处理理由、复核结果与时间戳。若资料用于训练或评测，应尽量去识别化、避免散播垃圾连结或色情内容，并保留必要的人工理由与复核结果。

## 本页尚待补齐

- 每个 production 模型的版本、用途与状态。
- 每期模型辅助与自动化处理比例。
- 模型导致的误判、申诉与恢复统计。
- 重大模型或门槛变更记录。

## 相关页面

- [透明度中心](/transparency)
- [2026 H1 透明度报告骨架](/transparency/2026-h1)
- [申诉与救济中心](/appeals)
- [Community Watch 规则](https://community-watch.matters.town/rules/)
`

const en = `
This page explains how Matters uses automation, model assistance, and human judgment in content governance and anti-abuse work. This first version publishes principles and boundaries. Actual model versions, production flags, and metrics should be updated through transparency reports.

## Principles

- Do not use unreviewed model scores as the sole basis for user-facing enforcement.
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

## Community Watch

Community Watch is handled by trusted users in its first phase. The scope is limited to clear porn ads and spam ads. The rules state that AI may not directly remove comments. AI or models may only be used for candidate detection, hints, or later evaluation data.

## Spam and abuse detection

Matters anti-abuse work may use comment, article, or moment signals to help identify spam, ad routing, repeated content, or other abuse. Model output may be used for alerts, review queue ranking, human hints, or visibility changes when a specific feature flag is enabled.

Formal transparency reports should disclose the mode used in each period, affected surfaces, whether content was directly handled, human review roles, appeals, and restorations.

## User notice and appeals

If content or an account is restricted due to user reports, Community Watch, staff action, model assistance, or automation, notices should explain the source, public reason, appeal channel, and useful context the user may provide.

Current appeal channels are listed on [Appeals and Remedies](/appeals).

## Data and privacy

Anti-abuse data may include user content, handling reasons, review outcomes, and timestamps. When used for training or evaluation, Matters should reduce identifiability, avoid spreading spam links or sexual content, and preserve necessary human reasons and review outcomes.

## To be completed

- Version, purpose, and status for each production model.
- Model-assisted and automated action ratios for each reporting period.
- Mistake, appeal, and restoration metrics related to models.
- Major model or threshold change logs.

## Related pages

- [Transparency Center](/transparency)
- [2026 H1 Transparency Report Skeleton](/transparency/2026-h1)
- [Appeals and Remedies](/appeals)
- [Community Watch rules](https://community-watch.matters.town/rules/)
`

const content = {
  zh_hant,
  zh_hans,
  en,
}

export default content
