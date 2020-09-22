export const OAUTH_PROVIDER = ['likecoin', 'stripe-connect']

export const OAUTH_SCOPE_TREE = {
  query: {
    viewer: {
      _t: {
        zh_hant: `Liker ID、電子信箱、帳戶設定、草稿、收藏作品、瀏覽記錄等`,
        zh_hans: `Liker ID、邮箱、帳戶设定、草稿、收藏作品、浏览记录等`,
      },
      likerId: {
        _t: {
          zh_hant: 'Liker ID',
          zh_hans: 'Liker ID',
        },
      },
      info: {
        email: {
          _t: {
            zh_hant: '電子信箱',
            zh_hans: '邮箱',
          },
        },
      },
    },
  },
  mutation: {
    level1: {
      _t: {
        zh_hant: '基本信息、標籤、評論、封鎖、追蹤等',
        zh_hans: '基本信息、标签、评论、屏蔽、追踪等',
      },
    },
    level2: {
      _t: {
        zh_hant: '作品發佈、評論修改、草稿刪除等',
        zh_hans: '作品发布、评论修改、草稿删除等',
      },
      publishArticle: {
        _t: {
          zh_hant: '作品發佈',
          zh_hans: '作品发布',
        },
      },
    },
    level3: {
      _t: {
        zh_hant: '作品修訂、錢包、金流等',
        zh_hans: '文章修订、钱包、支付等',
      },
      putDraft: {
        _t: {
          zh_hant: '作品草稿',
          zh_hans: '作品草稿',
        },
      },
    },
  },
}
