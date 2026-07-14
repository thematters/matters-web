const zh_hant = `
本頁說明 Matters 主要內容入口如何排序、推薦或排除內容。以下狀態依 2026 年 7 月 13 日的公開程式與 production 功能開關整理。為降低操弄風險，本頁公開主要訊號、人工介入與使用者控制，不公開精確權重、門檻或時間窗。

## 基本原則

- Matters 沒有一套套用於所有頁面的單一推薦演算法，不同入口依其目的採用不同方式。
- 應區分時間排序、互動加權、人工精選、主題分流與使用者自行選擇。
- 反濫用或帳號狀態可能先決定內容是否進入候選池，再由各入口排序。
- 主要排序或排除規則有重大變更時，應記錄目的、影響範圍與檢視日期。

## 主要內容入口

### Matters 精選

- 由管理員建立主題、選擇文章並設定部分置頂內容，屬於人工策展。
- 已發布的主題會取代上一個主題，歷史精選文章則依策展資料的更新順序顯示。
- 僅顯示有效文章，並排除目前受探索限制的作者。

### 熱門文章

- 從近期有效文章建立候選池，主要考量不重複讀者、非作者留言及符合條件的贊助等互動。
- 越近期的互動影響越大，並使用作者規模校正降低既有追蹤者優勢。
- 候選文章還須通過最低互動條件。管理員可將特定文章排除於熱門頁。
- 垃圾內容、受限制作者、特定專屬活動文章及申訴專區文章不進入候選池。

### 最新文章

- 主要依文章發布順序由新到舊排列，不使用個人化互動分數。
- 已分流至啟用中主題頻道的文章通常不重複出現在一般最新頁，作者選擇不參與頻道分流時不受此排除。
- 垃圾內容、專屬活動文章與受探索限制的作者會被排除。

### 追蹤動態

- 依時間顯示使用者所追蹤作者的文章與動態，以及使用者所追蹤標籤的文章活動。
- 已封鎖的作者與使用者自己的活動會被排除。
- 同一作者在短時間連續發布多則動態時，介面可能合併顯示，避免單一作者佔滿頁面。
- 此入口主要由使用者的追蹤選擇形成，不使用熱門文章的互動分數。

### 標籤與主題頻道

- 標籤文章可依最新或熱門顯示，並可包含人工置頂文章。
- 主題頻道依文章與頻道的相關性分流，通過目前相關性條件的文章才會進入。管理員可置頂、調整順序或移除錯誤分流。
- 策展頻道由管理員選擇與排序，屬於人工策展。
- 主題頻道目前已啟用獨立的垃圾內容過濾。

### 熱門動態

- 此功能目前已啟用，從近期有效動態建立候選池。
- 主要考量按讚與非作者留言，越近期的互動影響越大。
- 系統會限制同一作者在一段時間內可進入候選池的動態數，降低洗版影響。
- 候選內容須來自已核准進入動態熱門頁的作者，並排除已被 Community Watch 處理或帳號狀態受限的內容。

### 搜尋與作者頁

- 搜尋由使用者輸入查詢，作者頁則由使用者直接選擇作者，兩者不屬於個人化推薦。
- 搜尋結果仍會受到內容狀態、帳號狀態與反濫用排除規則影響。

## 反濫用與內容狀態

探索入口通常只納入有效內容。文章垃圾內容分數、管理員覆核結果、垃圾群組限制、帳號凍結或封存，以及特定 Community Watch 處理結果，都可能使內容離開部分候選池。

Discovery probation 截至本頁檢視日為停用狀態，不會透過此機制改變內容可見性。模型與自動化角色另見[自動化與反濫用模型](/transparency/automation)。

## 使用者可控制的項目

- 在熱門、最新、追蹤、標籤、主題頻道與其他入口間自行切換。
- 追蹤或取消追蹤作者及標籤。
- 封鎖特定使用者，使其不出現在自己的追蹤動態。
- 使用搜尋、直接造訪作者頁或保存直接連結，不經由推薦入口閱讀。
- 變更介面語言。介面語言目前不等同於推薦權重偏好。

目前沒有可供使用者調整熱門權重、查看單篇「推薦原因」或關閉所有站方排序的統一控制。新增相關控制時，本頁應同步更新。

## 2025 年後主要變更

- 2025 年 1 月，公開程式將垃圾內容排除納入熱門文章的預設流程。
- 2025 年 4 月，作者與標籤推薦改以快取候選池及近期互動訊號產生。
- 2025 年 7 月，熱門文章改用近期閱讀、留言與贊助訊號，加入時間衰減與作者規模校正；主題頻道同期擴充階層與置頂機制。
- 2025 年 8 月，標籤與策展頻道的人工排序及置頂能力完成整合。
- 2026 年 6 月，熱門動態候選池、互動加權及單一作者防洗版限制上線並持續調整。
- 2026 年 7 月，熱門、最新、精選、頻道與搜尋的受限作者排除規則加強；discovery probation 以停用狀態完成預備部署。

上述日期依公開程式變更紀錄整理。實際權重、門檻與分流細節可能因反濫用需要調整，重大影響變更應於後續透明度報告補記。

## 申訴與更正

若內容因反濫用判定或帳號限制而離開探索入口，使用者可透過[申訴與救濟中心](/appeals)要求重新檢視。一般排序位置會隨時間、互動與策展更新變動，無法保證特定內容取得固定曝光。

## 相關頁面

- [透明度中心](/transparency)
- [自動化與反濫用模型](/transparency/automation)
- [2026 H1 透明度報告](/transparency/2026-h1)
- [申訴與救濟中心](/appeals)
`

const zh_hans = `
本页说明 Matters 主要内容入口如何排序、推荐或排除内容。以下状态依 2026 年 7 月 13 日的公开代码与 production 功能开关整理。为降低操弄风险，本页公开主要讯号、人工介入与使用者控制，不公开精确权重、门槛或时间窗。

## 基本原则

- Matters 没有一套套用于所有页面的单一推荐演算法，不同入口依其目的采用不同方式。
- 应区分时间排序、互动加权、人工精选、主题分流与使用者自行选择。
- 反滥用或帐号状态可能先决定内容是否进入候选池，再由各入口排序。
- 主要排序或排除规则有重大变更时，应记录目的、影响范围与检视日期。

## 主要内容入口

### Matters 精选

- 由管理员建立主题、选择文章并设定部分置顶内容，属于人工策展。
- 已发布的主题会取代上一个主题，历史精选文章则依策展资料的更新顺序显示。
- 仅显示有效文章，并排除目前受探索限制的作者。

### 热门文章

- 从近期有效文章建立候选池，主要考量不重复读者、非作者留言及符合条件的赞助等互动。
- 越近期的互动影响越大，并使用作者规模校正降低既有追踪者优势。
- 候选文章还须通过最低互动条件。管理员可将特定文章排除于热门页。
- 垃圾内容、受限制作者、特定专属活动文章及申诉专区文章不进入候选池。

### 最新文章

- 主要依文章发布顺序由新到旧排列，不使用个人化互动分数。
- 已分流至启用中主题频道的文章通常不重复出现在一般最新页，作者选择不参与频道分流时不受此排除。
- 垃圾内容、专属活动文章与受探索限制的作者会被排除。

### 追踪动态

- 依时间显示使用者所追踪作者的文章与动态，以及使用者所追踪标签的文章活动。
- 已封锁的作者与使用者自己的活动会被排除。
- 同一作者在短时间连续发布多则动态时，介面可能合并显示，避免单一作者占满页面。
- 此入口主要由使用者的追踪选择形成，不使用热门文章的互动分数。

### 标签与主题频道

- 标签文章可依最新或热门显示，并可包含人工置顶文章。
- 主题频道依文章与频道的相关性分流，通过目前相关性条件的文章才会进入。管理员可置顶、调整顺序或移除错误分流。
- 策展频道由管理员选择与排序，属于人工策展。
- 主题频道目前已启用独立的垃圾内容过滤。

### 热门动态

- 此功能目前已启用，从近期有效动态建立候选池。
- 主要考量按赞与非作者留言，越近期的互动影响越大。
- 系统会限制同一作者在一段时间内可进入候选池的动态数，降低洗版影响。
- 候选内容须来自已核准进入动态热门页的作者，并排除已被 Community Watch 处理或帐号状态受限的内容。

### 搜索与作者页

- 搜索由使用者输入查询，作者页则由使用者直接选择作者，两者不属于个人化推荐。
- 搜索结果仍会受到内容状态、帐号状态与反滥用排除规则影响。

## 反滥用与内容状态

探索入口通常只纳入有效内容。文章垃圾内容分数、管理员复核结果、垃圾群组限制、帐号冻结或封存，以及特定 Community Watch 处理结果，都可能使内容离开部分候选池。

Discovery probation 截至本页检视日为停用状态，不会透过此机制改变内容可见性。模型与自动化角色另见[自动化与反滥用模型](/transparency/automation)。

## 使用者可控制的项目

- 在热门、最新、追踪、标签、主题频道与其他入口间自行切换。
- 追踪或取消追踪作者及标签。
- 封锁特定使用者，使其不出现在自己的追踪动态。
- 使用搜索、直接造访作者页或保存直接连结，不经由推荐入口阅读。
- 变更介面语言。介面语言目前不等同于推荐权重偏好。

目前没有可供使用者调整热门权重、查看单篇「推荐原因」或关闭所有站方排序的统一控制。新增相关控制时，本页应同步更新。

## 2025 年后主要变更

- 2025 年 1 月，公开代码将垃圾内容排除纳入热门文章的预设流程。
- 2025 年 4 月，作者与标签推荐改以快取候选池及近期互动讯号产生。
- 2025 年 7 月，热门文章改用近期阅读、留言与赞助讯号，加入时间衰减与作者规模校正；主题频道同期扩充阶层与置顶机制。
- 2025 年 8 月，标签与策展频道的人工排序及置顶能力完成整合。
- 2026 年 6 月，热门动态候选池、互动加权及单一作者防洗版限制上线并持续调整。
- 2026 年 7 月，热门、最新、精选、频道与搜索的受限作者排除规则加强；discovery probation 以停用状态完成预备部署。

上述日期依公开代码变更记录整理。实际权重、门槛与分流细节可能因反滥用需要调整，重大影响变更应于后续透明度报告补记。

## 申诉与更正

若内容因反滥用判定或帐号限制而离开探索入口，使用者可透过[申诉与救济中心](/appeals)要求重新检视。一般排序位置会随时间、互动与策展更新变动，无法保证特定内容取得固定曝光。

## 相关页面

- [透明度中心](/transparency)
- [自动化与反滥用模型](/transparency/automation)
- [2026 H1 透明度报告](/transparency/2026-h1)
- [申诉与救济中心](/appeals)
`

const en = `
This page explains how Matters ranks, recommends, or excludes content across its main discovery surfaces. The statuses below reflect public code and production feature flags reviewed on July 13, 2026. To reduce manipulation risk, this page discloses primary signals, human intervention, and user controls without publishing exact weights, thresholds, or time windows.

## Principles

- Matters does not use one recommendation algorithm across every page. Each surface uses a method suited to its purpose.
- Chronological ordering, engagement ranking, human curation, topic routing, and user choice should be distinguished.
- Anti-abuse and account state may determine whether content enters a candidate pool before a surface ranks it.
- Major changes to ranking or exclusion rules should record their purpose, affected scope, and review date.

## Main content surfaces

### Matters Picks

- Staff create a topic, select articles, and designate some pinned items. This is human curation.
- Publishing a topic replaces the previous topic. Historical picks are shown according to the curation data's update order.
- Only active articles are shown, and authors currently restricted from discovery are excluded.

### Hottest articles

- A candidate pool is built from recent active articles. Primary engagement signals include unique readers, comments from people other than the author, and qualifying support transactions.
- More recent engagement has greater influence. Author-size normalization reduces the advantage of an established follower base.
- Candidates must also meet minimum engagement conditions. Staff may exclude a specific article from Hottest.
- Spam, restricted authors, some exclusive campaign articles, and Complaint Area articles are excluded from the pool.

### Newest articles

- Articles are primarily ordered from newest to oldest and do not use personalized engagement scores.
- Articles routed to enabled topic channels generally do not also appear in the general Newest feed. This exclusion does not apply when the author has opted out of channel routing.
- Spam, exclusive campaign articles, and authors restricted from discovery are excluded.

### Following activity

- Activity is ordered by time and includes articles and moments from followed authors, plus article activity for followed tags.
- Blocked authors and the viewer's own activity are excluded.
- When one author posts several moments in a short period, the interface may group them to keep one author from filling the feed.
- This surface is primarily shaped by user follow choices and does not use the Hottest article engagement score.

### Tags and channels

- Tag articles can be shown by newest or hottest and may include manually pinned articles.
- Topic channels route articles according to article-channel relevance. Only articles meeting the current relevance conditions enter. Staff may pin, reorder, or remove incorrect routing.
- Curation channels are selected and ordered by staff and are therefore human-curated.
- Topic channels currently have a separate spam filter enabled.

### Hottest moments

- This feature is currently enabled and builds a pool from recent active moments.
- Primary signals are likes and comments from people other than the author, with more recent engagement carrying more influence.
- The system limits how many moments from one author can enter within a time window to reduce flooding.
- Candidates must come from authors approved for the moment feed. Content handled by Community Watch or restricted by account state is excluded.

### Search and author pages

- Search is driven by a user's query, and an author page is opened through a direct user choice. Neither is a personalized recommendation surface.
- Search results are still affected by content state, account state, and anti-abuse exclusions.

## Anti-abuse and content state

Discovery surfaces generally include active content only. Article spam scores, staff review outcomes, spam-ring restrictions, frozen or archived accounts, and some Community Watch outcomes can remove content from candidate pools.

Discovery probation was disabled on the review date and does not currently change visibility. See [Automation and Anti-Abuse Models](/transparency/automation) for model and automation roles.

## User controls

- Switch among Hottest, Newest, Following, tags, topic channels, and other entry points.
- Follow or unfollow authors and tags.
- Block a user so they do not appear in the viewer's Following activity.
- Use search, visit an author page directly, or keep a direct link instead of relying on a recommendation surface.
- Change interface language. Interface language is not currently a recommendation-weight preference.

There is currently no unified control for changing Hottest weights, seeing a per-item recommendation reason, or disabling all platform ranking. This page should be updated when such controls are added.

## Major changes since 2025

- January 2025, public code made spam exclusion part of the default Hottest article flow.
- April 2025, author and tag recommendations moved to cached candidate pools built from recent engagement signals.
- July 2025, Hottest articles moved to recent read, comment, and support signals with time decay and author-size normalization. Topic channels also gained hierarchy and pinning support.
- August 2025, manual ordering and pinning were integrated across tag and curation channels.
- June 2026, the Hottest moments candidate pool, engagement weighting, and per-author anti-flood limit were introduced and tuned.
- July 2026, restricted-author exclusions were strengthened across Hottest, Newest, Picks, channels, and search. Discovery probation was prepared in a disabled state.

These dates are based on public code change records. Exact weights, thresholds, and routing details may change for anti-abuse reasons. Changes with material impact should be added to later transparency reports.

## Appeals and corrections

When anti-abuse classification or an account restriction removes content from discovery, users may request another review through [Appeals and Remedies](/appeals). Ordinary ranking positions change with time, engagement, and curation and do not guarantee fixed exposure for any item.

## Related pages

- [Transparency Center](/transparency)
- [Automation and Anti-Abuse Models](/transparency/automation)
- [2026 H1 Transparency Report](/transparency/2026-h1)
- [Appeals and Remedies](/appeals)
`

const content = {
  zh_hant,
  zh_hans,
  en,
}

export default content
