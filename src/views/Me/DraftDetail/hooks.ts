import _uniq from 'lodash/uniq'

import { useImperativeQuery, useMutation } from '~/components/GQL'
import {
  ArticleAccessType,
  ArticleDigestDropdownArticleFragment,
  ArticleLicenseType,
  DigestRichCirclePublicFragment,
  DigestTagFragment,
  DraftAssetsQuery,
  EditMetaDraftFragment,
  SetDraftAccessMutation,
  SetDraftCanCommentMutation,
  SetDraftCollectionMutation,
  SetDraftCoverMutation,
  SetDraftPublishIscnMutation,
  SetDraftTagsMutation,
  SetSupportRequestReplyMutation,
} from '~/gql/graphql'

import {
  DRAFT_ASSETS,
  SET_ACCESS,
  SET_CAN_COMMENT,
  SET_COLLECTION,
  SET_COVER,
  SET_PUBLISH_ISCN,
  SET_SUPPORT_REQUEST_REPLY,
  SET_TAGS,
} from './gql'

/**
 * Hooks for editing draft cover, tags and collection
 */
export const useEditDraftCover = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const refetch = useImperativeQuery<DraftAssetsQuery>(DRAFT_ASSETS, {
    variables: { id: draft.id },
    fetchPolicy: 'network-only',
  })
  const [update, { loading: saving }] =
    useMutation<SetDraftCoverMutation>(SET_COVER)

  const edit = (asset?: any) =>
    update({
      variables: { id: draftId, cover: asset ? asset.id : null },
    })

  return { edit, saving, refetch }
}

export const useEditDraftTags = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const [updateTags, { loading: saving }] =
    useMutation<SetDraftTagsMutation>(SET_TAGS)

  const edit = (newTags: DigestTagFragment[]) =>
    updateTags({
      variables: {
        id: draftId,
        tags: _uniq(newTags.map(({ content }) => content)),
      },
    })

  return { edit, saving }
}

export const useEditDraftCollection = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const [setCollection, { loading: saving }] =
    useMutation<SetDraftCollectionMutation>(SET_COLLECTION)

  const edit = (newArticles: ArticleDigestDropdownArticleFragment[]) =>
    setCollection({
      variables: {
        id: draftId,
        collection: _uniq(newArticles.map(({ id }) => id)),
      },
    })

  return { edit, saving }
}

export const useEditDraftAccess = (
  draft: EditMetaDraftFragment,
  circle?: DigestRichCirclePublicFragment
) => {
  const draftId = draft.id
  const [setAccess, { loading: saving }] =
    useMutation<SetDraftAccessMutation>(SET_ACCESS)

  const edit = async (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) =>
    setAccess({
      variables: {
        id: draftId,
        circle: (addToCircle && circle?.id) || null,
        license,
        accessType: paywalled
          ? ArticleAccessType.Paywall
          : ArticleAccessType.Public,
      },
    })

  return { edit, saving }
}

export const useEditSupportSetting = (draft?: EditMetaDraftFragment) => {
  const draftId = draft?.id
  const [update, { loading: saving }] =
    useMutation<SetSupportRequestReplyMutation>(SET_SUPPORT_REQUEST_REPLY)

  const edit = (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) =>
    update({
      variables: {
        id: draftId,
        requestForDonation,
        replyToDonator,
      },
    })
  return { edit, saving }
}

export const useEditDraftPublishISCN = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const [update, { loading: saving }] =
    useMutation<SetDraftPublishIscnMutation>(SET_PUBLISH_ISCN)

  const edit = (iscnPublish: boolean) =>
    update({
      variables: {
        id: draftId,
        iscnPublish,
      },
    })

  return { edit, saving }
}

export const useEditDraftCanComment = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const [update, { loading: saving }] =
    useMutation<SetDraftCanCommentMutation>(SET_CAN_COMMENT)

  const edit = (canComment: boolean) =>
    update({
      variables: {
        id: draftId,
        canComment,
      },
    })

  return { edit, saving }
}
