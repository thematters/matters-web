/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  MOCK_ARTILCE,
  MOCK_BLOCKCHAIN_TRANSACTION,
  MOCK_CIRCLE,
  MOCK_CIRCLE_ARTICLE,
  MOCK_CIRCLE_COMMENT,
  MOCK_COLLECTION,
  MOCK_COMMENT,
  MOCK_MOMENT,
  MOCK_MOMENT_COMMENT,
  MOCK_MOMENT_LIKE,
  MOCK_PARENT_COMMENT,
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
    userNoticeType: 'UserNewFollower',
    user: MOCK_USER,
  },
  // UserNewFollower: multi actors
  {
    __typename: 'UserNotice' as any,
    id: 'UserNewFollower-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER, MOCK_USER, MOCK_USER],
    userNoticeType: 'UserNewFollower',
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
    articleNoticeType: 'ArticlePublished',
    article: MOCK_ARTILCE,
  },
  // ArticleMentionedYou
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleMentionedYou',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'ArticleMentionedYou',
    article: MOCK_ARTILCE,
  },
  // ArticleNewSubscriber
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleNewSubscriber',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'ArticleNewSubscriber',
    article: MOCK_ARTILCE,
  },
  // ArticleNewSubscriber: multi actors
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleNewSubscriber-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER, MOCK_USER],
    articleNoticeType: 'ArticleNewSubscriber',
    article: MOCK_ARTILCE,
  },
  // ArticleNewAppreciation
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleNewAppreciation',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'ArticleNewAppreciation',
    article: MOCK_ARTILCE,
  },
  // ArticleNewAppreciation: multi actors
  {
    __typename: 'ArticleNotice' as any,
    id: 'ArticleNewAppreciation-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER, MOCK_USER],
    articleNoticeType: 'ArticleNewAppreciation',
    article: MOCK_ARTILCE,
  },
  // RevisedArticlePublished
  {
    __typename: 'ArticleNotice' as any,
    id: 'RevisedArticlePublished',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'RevisedArticlePublished',
    article: MOCK_ARTILCE,
  },
  // RevisedArticleNotPublished
  {
    __typename: 'ArticleNotice' as any,
    id: 'RevisedArticleNotPublished',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'RevisedArticleNotPublished',
    article: MOCK_ARTILCE,
  },
  // CircleNewArticle
  {
    __typename: 'ArticleNotice' as any,
    id: 'CircleNewArticle',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    articleNoticeType: 'CircleNewArticle',
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
    articleArticleNoticeType: 'ArticleNewCollected',
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
    commentNoticeType: 'CommentPinned',
    comment: MOCK_COMMENT,
  },
  // CommentMentionedYou:Article
  {
    __typename: 'CommentNotice' as any,
    id: 'CommentMentionedYou',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CommentMentionedYou',
    comment: MOCK_COMMENT,
  },
  // CommentMentionedYou:Circle
  {
    __typename: 'CommentNotice' as any,
    id: 'CommentMentionedYou-02',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CommentMentionedYou',
    comment: MOCK_CIRCLE_COMMENT,
  },
  // ArticleNewComment
  {
    __typename: 'CommentNotice' as any,
    id: 'ArticleNewComment',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'ArticleNewComment',
    comment: MOCK_COMMENT,
  },
  // CircleNewBroadcast
  {
    __typename: 'CommentNotice' as any,
    id: 'CircleNewBroadcast',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CircleNewBroadcast',
    comment: MOCK_CIRCLE_COMMENT,
  },
  // CircleNewDiscussion
  {
    __typename: 'CommentNotice' as any,
    id: 'CircleNewDiscussion',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CircleNewDiscussion',
    comment: MOCK_CIRCLE_COMMENT,
  },
  // CommentLiked
  {
    __typename: 'CommentNotice' as any,
    id: 'CommentLikedNotice',
    unread: false,
    createdAt: '2024-06-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CommentLiked',
    comment: MOCK_CIRCLE_COMMENT,
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
   * Collection
   */
  {
    __typename: 'CollectionNotice' as any,
    id: 'CollectionNewLike',
    unread: false,
    createdAt: '2024-07-24T07:29:17.682Z',
    actors: [MOCK_USER],
    target: MOCK_COLLECTION,
  },
  /**
   * Moment
   */
  // MomentLiked
  {
    __typename: 'MomentNotice' as any,
    id: 'MomentLikedNotice',
    unread: false,
    createdAt: '2020-07-10T07:29:17.682Z',
    actors: [MOCK_USER],
    momentNoticeType: 'MomentLiked',
    moment: MOCK_MOMENT_LIKE,
  },
  // CommentLiked:Moment
  {
    __typename: 'CommentNotice' as any,
    id: 'MomentCommentLikedNotice',
    unread: false,
    createdAt: '2024-06-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CommentLiked',
    comment: MOCK_MOMENT_COMMENT,
  },
  // MomentNewComment
  {
    __typename: 'CommentNotice' as any,
    id: 'MomentNewCommentNotice',
    unread: false,
    createdAt: '2024-06-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'MomentNewComment',
    comment: MOCK_MOMENT_COMMENT,
  },
  // CommentMentionedYou:Circle
  {
    __typename: 'CommentNotice' as any,
    id: 'CommentMentionedYou-03',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    commentNoticeType: 'CommentMentionedYou',
    comment: MOCK_MOMENT_COMMENT,
  },
  // MomentMentionedYou
  {
    __typename: 'MomentNotice' as any,
    id: 'MomentMentionedNotice',
    unread: false,
    createdAt: '2020-07-10T07:29:17.682Z',
    actors: [MOCK_USER],
    momentNoticeType: 'MomentMentionedYou',
    moment: MOCK_MOMENT,
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
    txNoticeType: 'PaymentReceivedDonation',
    tx: MOCK_TRANSACTION,
  },
  // WithdrewLockedTokens
  {
    __typename: 'TransactionNotice' as any,
    id: 'WithdrewLockedTokens',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    txNoticeType: 'WithdrewLockedTokens',
    tx: { ...MOCK_TRANSACTION, blockchainTx: MOCK_BLOCKCHAIN_TRANSACTION },
  },

  /**
   * Circle
   */
  // CircleNewFollower: single actor
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleNewFollower',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    circleNoticeType: 'CircleNewFollower',
    tx: MOCK_CIRCLE,
  },
  // CircleNewFollower: multi actors
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleNewFollower',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER, MOCK_USER, MOCK_USER],
    circleNoticeType: 'CircleNewFollower',
    tx: MOCK_CIRCLE,
  },
  // CircleNewSubscriber
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleNewSubscriber',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    circleNoticeType: 'CircleNewSubscriber',
    tx: MOCK_CIRCLE,
  },
  // CircleNewUnsubscriber
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleNewUnsubscriber',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    circleNoticeType: 'CircleNewUnsubscriber',
    tx: MOCK_CIRCLE,
  },
  // CircleInvitation
  {
    __typename: 'CircleNotice' as any,
    id: 'CircleInvitation',
    unread: false,
    createdAt: '2020-12-24T07:29:17.682Z',
    actors: [MOCK_USER],
    circleNoticeType: 'CircleInvitation',
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
