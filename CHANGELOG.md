# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
