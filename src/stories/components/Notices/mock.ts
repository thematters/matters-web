import {
  MOCK_ARTILCE,
  MOCK_CIRCLE,
  MOCK_CIRCLE_ARTICLE,
  MOCK_CIRCLE_COMMENT,
  MOCK_COMMENT,
  MOCK_MOMENT_LIKE,
  MOCK_PARENT_COMMENT,
  MOCK_TAG,
  MOCK_TRANSACTION,
  MOCK_USER,
} from '~/stories/mocks'

export const MOCK_NOTICE_LIST = [
  /**
   * User
   */
  // UserNewFollower: single actor
  {
    __typename: 'UserNotice' as any,
    id: 'UserNewFollower-01',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    userNoticeType: 'UserNewFollower' as any,
    user: MOCK_USER,
  },
  // UserNewFollower: multi actors
  {
    __typename: 'UserNotice' as any,
    id: 'UserNewFollower-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER, MOCK_USER, MOCK_USER],
    userNoticeType: 'UserNewFollower' as any,
    user: MOCK_USER,
  },

  /**
   * Article
   */
  // ArticlePublished
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticlePublished',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'ArticlePublished' as any,
    article: MOCK_ARTILCE,
  },
  // ArticleMentionedYou
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleMentionedYou',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'ArticleMentionedYou' as any,
    article: MOCK_ARTILCE,
  },
  // ArticleNewSubscriber
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleNewSubscriber',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'ArticleNewSubscriber' as any,
    article: MOCK_ARTILCE,
  },
  // ArticleNewSubscriber: multi actors
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleNewSubscriber-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER, MOCK_USER],
    articleNoticeType: 'ArticleNewSubscriber' as any,
    article: MOCK_ARTILCE,
  },
  // ArticleNewAppreciation
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleNewAppreciation',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'ArticleNewAppreciation' as any,
    article: MOCK_ARTILCE,
  },
  // ArticleNewAppreciation: multi actors
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleNewAppreciation-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER, MOCK_USER],
    articleNoticeType: 'ArticleNewAppreciation' as any,
    article: MOCK_ARTILCE,
  },
  // RevisedArticlePublished
  {
    __typename: 'ArticleNotice' as any,
    id: 'RevisedArticlePublished',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'RevisedArticlePublished' as any,
    article: MOCK_ARTILCE,
  },
  // RevisedArticleNotPublished
  {
    __typename: 'ArticleNotice' as any,
    id: 'RevisedArticleNotPublished',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'RevisedArticleNotPublished' as any,
    article: MOCK_ARTILCE,
  },
  // CircleNewArticle
  {
    __typename: 'ArticleNotice' as any,
    id: 'CircleNewArticle',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'CircleNewArticle' as any,
    article: MOCK_CIRCLE_ARTICLE,
  },

  /**
   * Article - Article
   */
  // ArticleNewCollected
  {
    __typename: 'ArticleArticleNotice' as any,
    id: 'ArticleNewCollected',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleArticleNoticeType: 'ArticleNewCollected' as any,
    article: MOCK_CIRCLE_ARTICLE,
    collection: MOCK_CIRCLE_ARTICLE,
  },

  /**
   * Comment
   */
  // CommentPinned
  {
    __typename: 'CommentNotice' as any,
    id: 'CommentPinned',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CommentPinned' as any,
    comment: MOCK_COMMENT,
  },
  // CommentMentionedYou:Article
  {
    __typename: 'CommentNotice' as any,
    id: 'CommentMentionedYou',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CommentMentionedYou' as any,
    comment: MOCK_COMMENT,
  },
  // CommentMentionedYou:Circle
  {
    __typename: 'CommentNotice' as any,
    id: 'CommentMentionedYou-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CommentMentionedYou' as any,
    comment: MOCK_CIRCLE_COMMENT,
  },
  // ArticleNewComment
  {
    __typename: 'CommentNotice' as any,
    id: 'ArticleNewComment',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'ArticleNewComment' as any,
    comment: MOCK_COMMENT,
  },
  // SubscribedArticleNewComment
  {
    __typename: 'CommentNotice' as any,
    id: 'SubscribedArticleNewComment',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'SubscribedArticleNewComment' as any,
    comment: MOCK_COMMENT,
  },
  // CircleNewBroadcast
  {
    __typename: 'CommentNotice' as any,
    id: 'CircleNewBroadcast',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CircleNewBroadcast' as any,
    comment: MOCK_CIRCLE_COMMENT,
  },
  // CircleNewDiscussion
  {
    __typename: 'CommentNotice' as any,
    id: 'CircleNewDiscussion',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CircleNewDiscussion' as any,
    comment: MOCK_CIRCLE_COMMENT,
  },
  {
    __typename: 'CommentNotice',
    id: 'MomentCommentMentionedYouNotice',
    unread: false,
    createdAt: '2024-06-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CommentMentionedYou',
    comment: {
      ...MOCK_COMMENT,
      type: 'moment',
      state: 'archived'
    },
  },
  {
    __typename: 'MomentNotice',
    id: 'MomentLikedNotice',
    unread: false,
    createdAt: '2020-07-10T07:29:17.682Z',
    actors: [MOCK_USER],
    momentNoticeType: 'MomentLiked',
    moment: MOCK_MOMENT_LIKE,
  },
  {
    __typename: 'MomentNotice',
    id: 'MomentMentionedNotice',
    unread: false,
    createdAt: '2020-07-10T07:29:17.682Z',
    actors: [MOCK_USER],
    momentNoticeType: 'MomentMentionedYou',
    moment: MOCK_MOMENT_LIKE,
  },
  /**
   * Comment - Comment
   */
  // CommentNewReply
  {
    __typename: 'CommentCommentNotice' as any,
    id: 'CommentNewReply-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentCommentNoticeType: 'CommentNewReply' as any,
    comment: MOCK_PARENT_COMMENT,
    reply: MOCK_COMMENT,
  },
  // CommentNewReply:Circle
  {
    __typename: 'CommentCommentNotice' as any,
    id: 'CommentNewReply-03',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentCommentNoticeType: 'CommentNewReply' as any,
    comment: MOCK_PARENT_COMMENT,
    reply: MOCK_CIRCLE_COMMENT,
  },

  /**
   * Article - Tag
   */
  // ArticleTagAdded
  {
    __typename: 'ArticleTagNotice' as any,
    id: 'ArticleTagAdded',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleTagNoticeType: 'ArticleTagAdded' as any,
    target: MOCK_ARTILCE,
    tag: MOCK_TAG,
  },
  // ArticleTagRemoved
  {
    __typename: 'ArticleTagNotice' as any,
    id: 'ArticleTagRemoved',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleTagNoticeType: 'ArticleTagRemoved' as any,
    target: MOCK_ARTILCE,
    tag: MOCK_TAG,
  },
  // ArticleTagUnselected
  {
    __typename: 'ArticleTagNotice' as any,
    id: 'ArticleTagUnselected',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleTagNoticeType: 'ArticleTagUnselected' as any,
    target: MOCK_ARTILCE,
    tag: MOCK_TAG,
  },

  /**
   *  Tag
   */
  // TagAdoption
  {
    __typename: 'TagNotice' as any,
    id: 'TagAdoption',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    tagNoticeType: 'TagAdoption' as any,
    tag: MOCK_TAG,
  },
  // TagLeave
  {
    __typename: 'TagNotice' as any,
    id: 'TagLeave',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    tagNoticeType: 'TagLeave' as any,
    tag: MOCK_TAG,
  },
  // TagAddEditor
  {
    __typename: 'TagNotice' as any,
    id: 'TagAddEditor',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    tagNoticeType: 'TagAddEditor' as any,
    tag: MOCK_TAG,
  },
  // TagLeaveEditor
  {
    __typename: 'TagNotice' as any,
    id: 'TagLeaveEditor',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    tagNoticeType: 'TagLeaveEditor' as any,
    tag: MOCK_TAG,
  },

  /**
   * Transaction
   */
  // PaymentReceivedDonation
  {
    __typename: 'TransactionNotice' as any,
    id: 'PaymentReceivedDonation',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    txNoticeType: 'PaymentReceivedDonation' as any,
    tx: MOCK_TRANSACTION,
  },
  // PaymentPayout
  {
    __typename: 'TransactionNotice' as any,
    id: 'PaymentPayout',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    txNoticeType: 'PaymentPayout' as any,
    tx: MOCK_TRANSACTION,
  },

  /**
   * Circcle
   */
  // CircleNewFollower: single actor
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleNewFollower',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    circleNoticeType: 'CircleNewFollower' as any,
    tx: MOCK_CIRCLE,
  },
  // CircleNewFollower: multi actors
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleNewFollower',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER, MOCK_USER, MOCK_USER],
    circleNoticeType: 'CircleNewFollower' as any,
    tx: MOCK_CIRCLE,
  },
  // CircleNewSubscriber
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleNewSubscriber',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    circleNoticeType: 'CircleNewSubscriber' as any,
    tx: MOCK_CIRCLE,
  },
  // CircleNewUnsubscriber
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleNewUnsubscriber',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    circleNoticeType: 'CircleNewUnsubscriber' as any,
    tx: MOCK_CIRCLE,
  },
  // CircleInvitation
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleInvitation',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    circleNoticeType: 'CircleInvitation' as any,
    circle: MOCK_CIRCLE,
  },

  /**
   * Misc
   */
  // OfficialAnnouncementNotice w/o link
  {
    __typename: 'OfficialAnnouncementNotice' as any,
    id: 'OfficialAnnouncementNotice-01',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    message: '恭喜！你已解鎖評論權限，快去參與討論吧。謝謝你喜歡 Matters 💗',
  },

  // OfficialAnnouncementNotice w/ link
  {
    __typename: 'OfficialAnnouncementNotice' as any,
    id: 'OfficialAnnouncementNotice-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    message:
      '恭喜！你的作品在社区内大获好评，现在你畅行无阻啦。快去赞赏他人并参与讨论吧。',
    link: `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
  },
]
