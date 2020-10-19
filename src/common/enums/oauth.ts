export const OAUTH_PROVIDER = ['likecoin', 'stripe-connect']

export const OAUTH_SCOPE_TREE = {
  query: {
    viewer: {
      _t: {
        zh_hant: '電子信箱、Liker ID、帳戶設定、草稿、收藏作品、瀏覽記錄等',
        zh_hans: '邮箱、Liker ID、帳戶设定、草稿、收藏作品、浏览记录等',
      },
      settings: {
        _t: {
          zh_hant: '語言、通知等帳戶設定',
          zh_hans: '语言、通知等帐户设定',
        },
      },
      info: {
        _t: {
          zh_hant: '電子信箱等個人資料',
          zh_hans: '邮箱等个人资料',
        },
      },
      recommendation: {
        _t: {
          zh_hant: '作品、標籤、作者等追蹤列表',
          zh_hans: '作品、标签、作者等追踪列表',
        },
      },
      drafts: {
        _t: {
          zh_hant: '草稿',
          zh_hans: '草稿',
        },
      },
      subscriptions: {
        _t: {
          zh_hant: '收藏作品',
          zh_hans: '收藏作品',
        },
      },
      activity: {
        _t: {
          zh_hant: '閱讀、搜尋、讚賞等歷史記錄',
          zh_hans: '阅读、搜寻、赞赏等历史记录',
        },
      },
      likerId: {
        _t: {
          zh_hant: ' Liker ID',
          zh_hans: ' Liker ID',
        },
      },
      liker: {
        _t: {
          zh_hant: 'LikeCoin 餘額',
          zh_hans: 'LikeCoin 余额',
        },
      },
      blockList: {
        _t: {
          zh_hant: '封鎖列表',
          zh_hans: '屏蔽列表',
        },
      },
      status: {
        _t: {
          zh_hant: 'LikeCoin 餘額、未讀通知數等',
          zh_hans: 'LikeCoin 余额、未读通知数等',
        },
      },
      wallet: {
        _t: {
          zh_hant: '錢包餘額、交易紀錄等',
          zh_hans: '钱包余额、交易纪录等',
        },
      },
      notices: {
        _t: {
          zh_hant: '通知',
          zh_hans: '通知',
        },
      },
    },
  },
  mutation: {
    level1: {
      _t: {
        zh_hant: '管理個人資料、標籤、評論、封鎖、追蹤等',
        zh_hans: '管理个人资料、标签、评论、封锁、追踪等',
      },
      toggleSubscribeArticle: {
        _t: {
          zh_hant: '收藏作品',
          zh_hans: '收藏作品',
        },
      },
      toggleFollowTag: {
        _t: {
          zh_hant: '追蹤標籤',
          zh_hans: '追踪标签',
        },
      },
      updateTagSetting: {
        _t: {
          zh_hant: '管理標籤',
          zh_hans: '管理标签',
        },
      },
      addArticlesTags: {
        _t: {
          zh_hant: '添加作品到標籤',
          zh_hans: '添加作品到标签',
        },
      },
      updateArticlesTags: {
        _t: {
          zh_hant: '管理標籤作品',
          zh_hans: '管理标签作品',
        },
      },
      deleteArticlesTags: {
        _t: {
          zh_hant: '移除標籤作品',
          zh_hans: '移除标签作品',
        },
      },
      togglePinComment: {
        _t: {
          zh_hant: '精选評論',
          zh_hans: '精选评论',
        },
      },
      voteComment: {
        _t: {
          zh_hant: '讚踩評論',
          zh_hans: '赞踩评论',
        },
      },
      unvoteComment: {
        _t: {
          zh_hant: '取消讚踩評論',
          zh_hans: '取消赞踩评论',
        },
      },
      pinComment: {
        _t: {
          zh_hant: '精选評論',
          zh_hans: '精选评论',
        },
      },
      unpinComment: {
        _t: {
          zh_hant: '取消精选評論',
          zh_hans: '取消精选评论',
        },
      },
      markAllNoticesAsRead: {
        _t: {
          zh_hant: '標記所有通知為已讀',
          zh_hans: '标记所有通知为已读',
        },
      },
      updateUserInfo: {
        _t: {
          zh_hant: '修改個人資料',
          zh_hans: '修改个人资料',
        },
      },
      updateNotificationSetting: {
        _t: {
          zh_hant: '修改通知設定',
          zh_hans: '修改通知设定',
        },
      },
      toggleFollowUser: {
        _t: {
          zh_hant: '追蹤作者',
          zh_hans: '追踪作者',
        },
      },
      toggleBlockUser: {
        _t: {
          zh_hant: '封鎖用戶',
          zh_hans: '封锁用户',
        },
      },
      toggleSubscribePush: {
        _t: {
          zh_hant: '修改推送通知設定',
          zh_hans: '修改推送通知设定',
        },
      },
      migration: {
        _t: {
          zh_hant: '導入作品',
          zh_hans: '导入作品',
        },
      },
    },
    level2: {
      _t: {
        zh_hant: '發佈作品、修改評論、刪除草稿等',
        zh_hans: '发布作品、修改评论、删除草稿等',
      },
      publishArticle: {
        _t: {
          zh_hant: '發佈作品',
          zh_hans: '发布作品',
        },
      },
      putComment: {
        _t: {
          zh_hant: '發佈和修訂評論',
          zh_hans: '发布和修订评论',
        },
      },
      deleteComment: {
        _t: {
          zh_hant: '刪除評論',
          zh_hans: '删除评论',
        },
      },
      updateCommentsState: {
        _t: {
          zh_hant: '折疊評論',
          zh_hans: '折叠评论',
        },
      },
      deleteDraft: {
        _t: {
          zh_hant: '刪除草稿',
          zh_hans: '删除草稿',
        },
      },
    },
    level3: {
      _t: {
        zh_hant: '管理作品、錢包、金流等',
        zh_hans: '管理作品、钱包、支付等',
      },
      putDraft: {
        _t: {
          zh_hant: '修改草稿',
          zh_hans: '修改草稿',
        },
      },
      editArticle: {
        _t: {
          zh_hant: '修訂作品',
          zh_hans: '修订作品',
        },
      },
      appreciateArticle: {
        _t: {
          zh_hant: '讚賞作品',
          zh_hans: '赞赏作品',
        },
      },
      addCredit: {
        _t: {
          zh_hant: '储值',
          zh_hans: '储值',
        },
      },
      payTo: {
        _t: {
          zh_hant: '支持作品',
          zh_hans: '支持作品',
        },
      },
      payout: {
        _t: {
          zh_hant: '提現',
          zh_hans: '提现',
        },
      },
      connectStripeAccount: {
        _t: {
          zh_hant: '创建 Stripe 帐户',
          zh_hans: '创建 Stripe 帐户',
        },
      },
      singleFileUpload: {
        _t: {
          zh_hant: '文件（圖片、音頻等）上傳',
          zh_hans: '文件（图片、音频等）上传',
        },
      },
      changeEmail: {
        _t: {
          zh_hant: '修改電子信箱',
          zh_hans: '修改邮箱',
        },
      },
      generateLikerId: {
        _t: {
          zh_hant: '生成 Liker ID',
          zh_hans: '生成 Liker ID',
        },
      },
      clearReadHistory: {
        _t: {
          zh_hant: '清空閱讀歷史',
          zh_hans: '清空阅读历史',
        },
      },
      clearSearchHistory: {
        _t: {
          zh_hant: '清空搜尋歷史',
          zh_hans: '清空搜寻历史',
        },
      },
    },
  },
}
