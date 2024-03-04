import gql from 'graphql-tag'

import { useMutation } from '~/components/GQL'
import { EditArticleSupportSettingMutation } from '~/gql/graphql'

const EDIT_ARTICLE_SUPPORT_SETTING = gql`
  mutation EditArticleSupportSetting(
    $id: ID!
    $requestForDonation: requestForDonation_String_maxLength_140
    $replyToDonator: replyToDonator_String_maxLength_140
  ) {
    editArticle(
      input: {
        id: $id
        requestForDonation: $requestForDonation
        replyToDonator: $replyToDonator
      }
    ) {
      id
      requestForDonation
      replyToDonator
    }
  }
`

export const useEditArticleDetailSupportSetting = (articleId?: string) => {
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
