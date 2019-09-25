import { TEXT } from '~/common/enums'

export const OAUTH_PROVIDER = ['likecoin']

export const OAUTH_SCOPE_TREE = {
  query: {
    viewer: {
      __text__: {
        zh_hant: ` Liker ID、${TEXT.zh_hant.email}、${TEXT.zh_hant.accountSetting}、${TEXT.zh_hant.draft}、收藏作品、${TEXT.zh_hant.readHistory}等`,
        zh_hans: ` Liker ID、${TEXT.zh_hant.email}、${TEXT.zh_hant.accountSetting}、${TEXT.zh_hant.draft}、收藏作品、${TEXT.zh_hant.readHistory}等`
      },
      likerId: {
        __text__: {
          zh_hant: ' Liker ID',
          zh_hans: ' Liker ID'
        }
      },
      info: {
        email: {
          __text__: {
            zh_hant: '電郵地址',
            zh_hans: '邮箱地址'
          }
        }
      }
    }
  },
  mutation: {}
}
