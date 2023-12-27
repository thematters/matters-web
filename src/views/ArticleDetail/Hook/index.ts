import { useMutation } from '~/components/GQL'
import {
  ArticleDetailPublicQuery,
  EditArticleSupportSettingMutation,
} from '~/gql/graphql'

import { EDIT_ARTICLE_SUPPORT_SETTING } from '../gql'

export const useEditArticleDetailSupportSetting = (
  article?: ArticleDetailPublicQuery['article']
) => {
  const articleId = article?.id
  const [update, { loading: saving }] =
    useMutation<EditArticleSupportSettingMutation>(EDIT_ARTICLE_SUPPORT_SETTING)

  const edit = (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) =>
    update({
      variables: {
        id: articleId,
        requestForDonation,
        replyToDonator,
      },
    })
  return { edit, saving }
}
