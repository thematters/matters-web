# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.10.0] - 2019-07-29

### Changed

- Remove response tip. #345
- Fix missing custom `<meta>` tags in UserArticle page #344
- Store feed sorter type in local via Apollo. #343
- CommentDraft @client; Remove <SelfActivationModal>; #341
- Local Schema for "Official.gatewayUrls" #340

## [1.9.0] - 2019-07-02

### Changed

- Fix styles of about page #336
- Alter article's design in Response #335
- Infinite article feed in the search result page #334
- Clear search input after the user selected search results #333
- Alter meta tags of user profile pages #332
- Share to Douban #327

## [1.8.0] - 2019-06-24

### Changed

- Fix for Response tip when user is logged out #312
- Redesign of related articles block #314 #325
- Update FAQ #315
- Fix response count #316
- Change fetch policy for Response query #317
- Fix unable to register #320
- Convert specific html tag in summary #321
- Like button optimization & additional analytic events #322
- Update IPFS entry icon #324

## [1.7.0] - 2019-05-14

### Added

- Enable dropping image into editor #246
- Add extend article button in article detail page #252
- Expandable collectedBy articles #253
- Audio Support #254
- Self activation by comment #255
- Add cover selector #256
- Events trackers for collection #263
- Add author picker into signup procedure #266
- Notice dot for "Follow" page #268

### Changed

- Alter singleFileUpload for asset mapping #251
- Alter same domain checker for editor #257
- Simplify publishing procedure #258
- Update collection expand icon #259
- Make signup profile step unskipped #260
- Update password rule #261
- Fix text copy #262
- Revise descriptions #264
- Add "ASSET_DOMAIN" env to fix dups upload image by "createImageMatcher" #265
- URI munging #267
- Fix typo #269 #270
- Alter publishing state toast #271
- No longer need a cover to publish an article #272
- Enable collection for all #273
- Fix audio player button show as playing state #274

## [1.6.1] - 2019-04-30

### Added

- Add Collection notice #247

### Changed

- Fix memory leak caused by inMemoryCache #243
- Create collection in article sidebar #244
- Add editing support for collection popover #244
- Fix comment count #245

## [1.6.0] - 2019-04-27

### Added

- Sentry bug tracker #240

### Changed

- Add error handler for changing password #238
- Add "email_reset_confirm" code type #239

## [1.5.0] - 2019-04-25

### Added

- Allow partner to edit collections #230
- HTTP Basic Authentication for testing enviroments #231

# Changed

- Disable publish button if draft content, title or publishState is incorrect #225
- Fix incorrect style of related article digest and wrap "<Actions>" #226
- Update style of sidebar collection #229
- Analytics & iframe sandbox #232
- Fix & Update collection related issues #233
- Remove sidebar sticky feature #234
- Fix reversed condition #235

## [1.4.0] - 2019-04-20

### Added

- Article mention notification #217
- PWA #204
- [Disabled] Collection #207 #209 #210 #212 #213
- [Disabled] Persist Cache #211

# Changed

- Add "fb:app_id" and "og:title" meta tags
- Enhance error handing #218

## [1.3.0] - 2019-04-09

### Added

- Editor: Caption #178
- Editor: Auto upload external images #190
- Editor: Embed LikeButton #194

# Changed

- Removes extra line breaks #188
- Set cover to be first image #190
- Fix issues with analytics and add new events #190
- Summarize content of notice comment #192
- Use `notice.reply.content` as `CommentNewReplyNotice`'s content #192
- Fix polling requests read data from the cache #193
- Auto open comments drawer #194
- Fix upload same file again not working issue #195
- Restrict editor formats for pasted content #197
- Update upload file size limit to 5MB #198

## [1.2.0] - 2019-04-02

### Added

- Editor: Embed - YouTube, Vimeo and JSFiddle #166
- Editor: @user #169
- Editor: SmartBreak #168 #170
- About Page #180
- OpenSearch #176

# Changed

- Fix notice dropdown positioning issue with max-height #167

## [1.1.1] - 2019-03-28

### Added

- Monitor EB memory usage in CloudWatch

## [1.0.1] - 2019-03-21

### Added

- Invitation page #142
- On-boarding badge #145

### Changed

- Customize feature for on-boarding user #143
- Improve password regexp #146
- Fix comment form related issues #152

## [1.1.0] - 2019-03-25

### Added

- Realtime comments update with GraphQL Subscriptions
- Rich Text support for `<CommentForm>`

### Changed

- New UI of HomeFeed Switcher
- Fix unlogged user click MAT button effect
