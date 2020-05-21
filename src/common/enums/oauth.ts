import { TEXT } from '~/common/enums'

export const OAUTH_PROVIDER = ['likecoin', 'stripe-connect']

export const OAUTH_SCOPE_TREE = {
  query: {
    viewer: {
      __text__: {
        zh_hant: ` Liker ID、${TEXT.zh_hant.email}、${TEXT.zh_hant.settingsAccount}、${TEXT.zh_hant.draft}、收藏作品、${TEXT.zh_hant.readHistory}等`,
        zh_hans: ` Liker ID、${TEXT.zh_hant.email}、${TEXT.zh_hant.settingsAccount}、${TEXT.zh_hant.draft}、收藏作品、${TEXT.zh_hant.readHistory}等`,
      },
      likerId: {
        __text__: {
          zh_hant: ' Liker ID',
          zh_hans: ' Liker ID',
        },
      },
      info: {
        email: {
          __text__: {
            zh_hant: TEXT.zh_hant.email,
            zh_hans: TEXT.zh_hant.email,
          },
        },
      },
    },
  },
  mutation: {},
}
