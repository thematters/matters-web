# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.3.0] - 2020-04-09

### Added

- Canvas Fingerprint #898

### Changed

- View Mode analytics #922
- Dialog Enhancement #860
- Add "Segoe UI", "Roboto" & Arial to font stacks #913
- Remove htmlFor of label wrapped up migration file upload input. #899
- Add space for `<figcaption>` #912
- Fix native sharing #903 #913

## [3.2.0] - 2020-03-27

### Added

- ReCaptcha #845

### Changed

- Boost Performance #864
- Layout Enhancement #843
- Revise Nav icons #858
- Prettier 2.0 #868
- Change SignUpButton to LoginButton in <Wall> #869
- Fix broken trackers #875
- Change `first` of InfinteScroll to 20 #862 #861
- Fix collection articles are lost while editing #859
- Hide <SideFooter> in mobile #863
- Fix FCM cannot be unsubscribed #865
- Alter message for get push token error #870
- Fix unable to type spaces in the article editor on Firefox #871
- Fix @user will cause scroll to top in the article editor #884

## [3.1.0] - 2020-03-20

### Added

- View Mode #834
- Civic Liker Ring #833

### Changed

- Add confirm dialog for comment collapse. #826
- Scroll to top if tap active nav item #831
- Flip `<SideNav>` in small viewport #831
- Hide mixed cards from latest home feed #832
- Fix `<CivicLikerButton>` is auto closed by state update #830
- Remove extra suffix comma of notice #829
- Remove comment voted related notification and setting. #824

## [3.0.0] - 2020-03-18

### Added

- Migration Page #760 #784 #798
- Help Center #812

### Revamp

- Revamp: Layout #764
- Revamp: CommentForm #757
- Revamp: Homepage #779 #789
- Revamp: Article Detail Page #801
- Revamp: Search Page #780

### Changed

- Show current account in OAuth page #813
- Using `@reach/alert` #799
- Fix segment script #762
- Fix unpacking result throwing empty message. #800

## [2.8.0] - 2020-02-28

### Revamp

- Revamp: `<Dialog>` & `<DropdownDialog>` #689 #712
- Revamp: Forms #716 #736 #744 #747 #748
- Revamp: Appreciations #703
- Refactor: `<Menu>`, `<SearchBar>` #662
- Refactor: `<Translate>` & `translate` support using `id` #719

### Changed

- Create infinite list using `react-virtualized` #697 #701 #706
- Enhance Responsive #742
- Tree shaking and article detail query refactor #678
- Dynamic Imports: `<Dialog>` and `firebase` #700
- Revamp FollowButton for sizing. #727
- Add extra footer #734
- Add react hook for window resize. #690
- Add back collapsed comments #710
- Add back missing refresh button of sidebar authors #704
- Skip polling if the user hasn't logged in #688

## [2.7.0] - 2020-02-06

### Added

- Recommendation test page #625
- Add selected feed under tag page #650 #654 #659

### Revamp

- Refactor: `<Comment>`, `<UserDigest>`, `<ArticleDigest>` #609 #658 #661
- Refactor: `<Button>` #651
- Refactor: `Toast` #667
- Refactor: New Icons #647

### Changed

- Change tag detail API names and params. #617
- Restructure of tag detail page #616
- Remove close button of Toast #663
- Change the default value of setup Liker ID form to "bind" #665
- Disable `generateInDevMode` to boost in local development #612
- Fix potential memory leak after calling register API. #655
- Remove extra spaces with `display: inline-flex` #668
- Enhance DnD experience of `<CollectionEditor>`; #676

## [2.6.0] - 2020-01-13

### Revamp

- Refactor: Alter CSS variables for Matters 3.0
- Refactor: Using SVGR #576
- Refactor: i18n #584

### Changed

- Add more test cases for home page. #557 #575
- Feed dedupe #574
- Allow onboarding user to appreciate articles #592
- Bump deps #559 #558 #567 #568 #569 #582 #580 #578 #587 #581

## [2.5.1] - 2019-12-31

### Changed

- Reuse <SignUpComplete> in setup LikeCoin flow #563
- Update onboarding and punish sections of FAQ #563

## [2.5.0] - 2019-12-27

### Added

- BDD #537

### Changed

- Onboarding User Restrictions #545
- Tiny style fix for expandable user description #547
- Hide status code #546
- Bug fixes of user deletion #548 #549
- Update editor's version. #550
- Allow "@matters.news" to use "+" sign #551

## [2.4.0] - 2019-12-13

### Added

- Error handling for LikeCoin #523
- Optional Chaining #527
- UI components for managing tag #528
- More analytics #531

### Changed

- Auto re-subscribe push without toast #524
- Fix language switching #525
- Fix audio player does not work on mobile devices #526
- Filter out inactive user articles for admin user #529
- Fix admin user cannot see archived articles on their profile page #530
- Enhance UI of inactive user/article #533
- Update styles of comment and article digest in feed #534

## [2.3.0] - 2019-11-28

### Added

- Collapse Comment #516

### Changed

- Clap Effect #510
- Style fixes and related article avatar #515
- Use `.length` instead of `countWordsLength` to count description #514
- Close publish modal if it's been published #512
- Add option to disable `+` sign in `isValidateEmail` #519

## [2.2.0] - 2019-11-20

### Added

- Web Push Notification #496 #503 #504 #506
- New Followee Feed #497

### Changed

- Field-level error message #495
- Editor refactor. #494 #501
- Require user to setup Liker ID first in OAuth Authorize page #498
- Add safety check for if article is live or not. #500 #507

## [2.1.1] - 2019-10-31

### Changed

- Fix form bugs with `useFormik` #487
- Update pageview & prevent likebutton insertion #486 #489
- Show userName in search user popper #490

## [2.1.0] - 2019-10-29

### Added

- Block User #481

### Changed

- Apollo with React Hooks! #450
- Show userName in profile area #479
- Error Codes: remove `USER_FOLLOW_FAILED`, add `ACTION_FAILED` #480

## [2.0.1] - 2019-10-21

### Changed

- Update About Page

## [2.0.0] - 2019-10-15

### Added

- LikeCoin

### Changed

- Next.js 9

## [1.14.1] - 2019-10-12

### Changed

- Update ToS and Privacy

## [1.14.0] - 2019-10-03

### Added

- Ad wall #402 #403 #412
- Featured comments #408
- Add back segment page tracking #417

### Changed

- Update cache after commenting #413
- Update user follower's number after clicking button #416
- Fix responses update handler #422
- Update `/guide` page; Revert mid-autumn logo; #423
- Allow admin to change special display name (e.g. Matty) #429
- Analytics optimization #431
- Fix translations #432

## [1.13.0] - 2019-09-02

### Added

- Comment URL #392

### Changed

- New UI of Modals #390 #389 #395 #397
- Update SignUp flow and user name length validation #389

## [1.12.0] - 2019-08-23

### Added

- Add sticky UI for user profile articles #375
- Add english version of ToS #384

### Changed

- Update the redirect logic of logic/register flow #374
- Fix copyToClipboard #373
- Add APQ support #376
- Change the calculation of articles. #377
- Reuse `<CommentContent>` in `<NoticeComemnt>` to show different content by states #378
- Fix error message not shown in `<UserNameForm.Confirm>` #379
- Skip follow step of the sign up flow #380
- HTTP 301 redirection for legacy article link; Add canonical meta tag; #381
- Update UserProfile based on latest UI #385
- New UI of Comment and Comment List #386

## [1.11.1] - 2019-08-07

### Added

- Show userName in the comment list #369

### Changed

- Fix missing qs in OAuth authorize page #368

## [1.11.0] - 2019-08-06

### Added

- PoC of OAuth login with LikeCoin #354
- Add UI for user word count #353
- Add profile cover #356 #358 #361 #364 #365

### Changed

- Add grey background to code block #355
- Line Clamp #357
- Alter alignment of related articles. #363
- Support scroll to child comment; Remove unused codes; #360
- Open IPFS Gateways #362

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
