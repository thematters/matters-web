import _uniq from 'lodash/uniq'

import { useCreateDraft } from '~/components'
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
  SetDraftSensitiveByAuthorMutation,
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
  SET_SENSITIVE_BY_AUTHOR,
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
  const { createDraft } = useCreateDraft()

  const edit = (asset?: any, newId?: string) =>
    update({
      variables: { id: draftId || newId, cover: asset ? asset.id : null },
    })

  const createDraftAndEdit = async (asset?: any) => {
    if (draftId) return edit(asset)

    return createDraft({
      onCreate: (newDraftId) => edit(asset, newDraftId),
    })
  }

  return { edit: createDraftAndEdit, saving, refetch }
}

export const useEditDraftTags = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const [updateTags, { loading: saving }] =
    useMutation<SetDraftTagsMutation>(SET_TAGS)
  const { createDraft } = useCreateDraft()

  const edit = (newTags: DigestTagFragment[], newId?: string) =>
    updateTags({
      variables: {
        id: draftId || newId,
        tags: _uniq(newTags.map(({ content }) => content)),
      },
    })

  const createDraftAndEdit = async (newTags: DigestTagFragment[]) => {
    if (draftId) return edit(newTags)

    return createDraft({
      onCreate: (newDraftId) => edit(newTags, newDraftId),
    })
  }

  return { edit: createDraftAndEdit, saving }
}

export const useEditDraftCollection = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const [setCollection, { loading: saving }] =
    useMutation<SetDraftCollectionMutation>(SET_COLLECTION)
  const { createDraft } = useCreateDraft()

  const edit = (
    newArticles: ArticleDigestDropdownArticleFragment[],
    newId?: string
  ) =>
    setCollection({
      variables: {
        id: draftId || newId,
        collection: _uniq(newArticles.map(({ id }) => id)),
      },
    })

  const createDraftAndEdit = async (
    newArticles: ArticleDigestDropdownArticleFragment[]
  ) => {
    if (draftId) return edit(newArticles)

    return createDraft({
      onCreate: (newDraftId) => edit(newArticles, newDraftId),
    })
  }

  return { edit: createDraftAndEdit, saving }
}

export const useEditDraftAccess = (
  draft: EditMetaDraftFragment,
  circle?: DigestRichCirclePublicFragment
) => {
  const draftId = draft.id
  const [setAccess, { loading: saving }] =
    useMutation<SetDraftAccessMutation>(SET_ACCESS)
  const { createDraft } = useCreateDraft()

  const edit = async (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType,
    newId?: string
  ) =>
    setAccess({
      variables: {
        id: draftId || newId,
        circle: (addToCircle && circle?.id) || null,
        license,
        accessType: paywalled
          ? ArticleAccessType.Paywall
          : ArticleAccessType.Public,
      },
    })

  const createDraftAndEdit = async (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) => {
    if (draftId) return edit(addToCircle, paywalled, license)

    return createDraft({
      onCreate: (newDraftId) =>
        edit(addToCircle, paywalled, license, newDraftId),
    })
  }

  return { edit: createDraftAndEdit, saving }
}

export const useEditSupportSetting = (draft?: EditMetaDraftFragment) => {
  const draftId = draft?.id
  const [update, { loading: saving }] =
    useMutation<SetSupportRequestReplyMutation>(SET_SUPPORT_REQUEST_REPLY)
  const { createDraft } = useCreateDraft()

  const edit = (
    requestForDonation: string | null,
    replyToDonator: string | null,
    newId?: string
  ) =>
    update({
      variables: {
        id: draftId || newId,
        requestForDonation,
        replyToDonator,
      },
    })

  const createDraftAndEdit = async (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) => {
    if (draftId) return edit(requestForDonation, replyToDonator)

    return createDraft({
      onCreate: (newDraftId) =>
        edit(requestForDonation, replyToDonator, newDraftId),
    })
  }

  return { edit: createDraftAndEdit, saving }
}

export const useEditDraftSensitiveByAuthor = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const [update, { loading: saving }] =
    useMutation<SetDraftSensitiveByAuthorMutation>(SET_SENSITIVE_BY_AUTHOR)
  const { createDraft } = useCreateDraft()

  const edit = (sensitiveByAuthor: boolean, newId?: string) =>
    update({ variables: { id: draftId || newId, sensitiveByAuthor } })

  const createDraftAndEdit = async (sensitiveByAuthor: boolean) => {
    if (draftId) return edit(sensitiveByAuthor)

    return createDraft({
      onCreate: (newDraftId) => edit(sensitiveByAuthor, newDraftId),
    })
  }

  return { edit: createDraftAndEdit, saving }
}

export const useEditDraftPublishISCN = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const [update, { loading: saving }] =
    useMutation<SetDraftPublishIscnMutation>(SET_PUBLISH_ISCN)
  const { createDraft } = useCreateDraft()

  const edit = (iscnPublish: boolean, newId?: string) =>
    update({ variables: { id: draftId || newId, iscnPublish } })

  const createDraftAndEdit = async (iscnPublish: boolean) => {
    if (draftId) return edit(iscnPublish)

    return createDraft({
      onCreate: (newDraftId) => edit(iscnPublish, newDraftId),
    })
  }

  return { edit: createDraftAndEdit, saving }
}

export const useEditDraftCanComment = (draft: EditMetaDraftFragment) => {
  const draftId = draft.id
  const [update, { loading: saving }] =
    useMutation<SetDraftCanCommentMutation>(SET_CAN_COMMENT)
  const { createDraft } = useCreateDraft()

  const edit = (canComment: boolean, newId?: string) =>
    update({ variables: { id: draftId || newId, canComment } })

  const createDraftAndEdit = async (canComment: boolean) => {
    if (draftId) return edit(canComment)

    return createDraft({
      onCreate: (newDraftId) => edit(canComment, newDraftId),
    })
  }

  return { edit: createDraftAndEdit, saving }
}
