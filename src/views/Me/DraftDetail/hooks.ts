import _uniq from 'lodash/uniq'
import { useContext } from 'react'

import { DraftDetailStateContext, useCreateDraft } from '~/components'
import { useImperativeQuery, useMutation } from '~/components/GQL'
import {
  ArticleAccessType,
  ArticleDigestDropdownArticleFragment,
  ArticleLicenseType,
  DigestRichCirclePublicFragment,
  DigestTagFragment,
  DraftAssetsQuery,
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
export const useEditDraftCover = () => {
  const { addRequest, getDraftId } = useContext(DraftDetailStateContext)
  const { createDraft } = useCreateDraft()
  const refetch = useImperativeQuery<DraftAssetsQuery>(DRAFT_ASSETS, {
    variables: { id: getDraftId() },
    fetchPolicy: 'network-only',
  })
  const [update, { loading: saving }] =
    useMutation<SetDraftCoverMutation>(SET_COVER)

  const edit = (asset?: any, newId?: string) =>
    update({
      variables: { id: newId || getDraftId(), cover: asset ? asset.id : null },
    })

  const createDraftAndEdit = async (asset?: any) => {
    if (getDraftId()) return edit(asset)

    return createDraft({
      onCreate: (newDraftId) => edit(asset, newDraftId),
    })
  }

  return {
    edit: async (props: any) => addRequest(() => createDraftAndEdit(props)),
    saving,
    refetch,
  }
}

export const useEditDraftTags = () => {
  const { addRequest, getDraftId } = useContext(DraftDetailStateContext)
  const { createDraft } = useCreateDraft()
  const [updateTags, { loading: saving }] =
    useMutation<SetDraftTagsMutation>(SET_TAGS)
  const edit = (newTags: DigestTagFragment[], newId?: string) =>
    updateTags({
      variables: {
        id: newId || getDraftId(),
        tags: _uniq(newTags.map(({ content }) => content)),
      },
    })

  const createDraftAndEdit = async (newTags: DigestTagFragment[]) => {
    if (getDraftId()) return edit(newTags)

    return createDraft({
      onCreate: (newDraftId) => edit(newTags, newDraftId),
    })
  }

  return {
    edit: async (props: any) => addRequest(() => createDraftAndEdit(props)),
    saving,
  }
}

export const useEditDraftCollection = () => {
  const { addRequest, getDraftId } = useContext(DraftDetailStateContext)
  const { createDraft } = useCreateDraft()
  const [setCollection, { loading: saving }] =
    useMutation<SetDraftCollectionMutation>(SET_COLLECTION)

  const edit = (
    newArticles: ArticleDigestDropdownArticleFragment[],
    newId?: string
  ) =>
    setCollection({
      variables: {
        id: newId || getDraftId(),
        collection: _uniq(newArticles.map(({ id }) => id)),
      },
    })

  const createDraftAndEdit = async (
    newArticles: ArticleDigestDropdownArticleFragment[]
  ) => {
    if (getDraftId()) return edit(newArticles)

    return createDraft({
      onCreate: (newDraftId) => edit(newArticles, newDraftId),
    })
  }

  return {
    edit: async (props: any) => addRequest(() => createDraftAndEdit(props)),
    saving,
  }
}

export const useEditDraftAccess = (circle?: DigestRichCirclePublicFragment) => {
  const { addRequest, getDraftId } = useContext(DraftDetailStateContext)
  const { createDraft } = useCreateDraft()
  const [setAccess, { loading: saving }] =
    useMutation<SetDraftAccessMutation>(SET_ACCESS)

  const edit = async (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType,
    newId?: string
  ) =>
    setAccess({
      variables: {
        id: newId || getDraftId(),
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
    if (getDraftId()) return edit(addToCircle, paywalled, license)

    return createDraft({
      onCreate: (newDraftId) =>
        edit(addToCircle, paywalled, license, newDraftId),
    })
  }

  return {
    edit: async (p1: any, p2: any, p3: any) =>
      addRequest(() => createDraftAndEdit(p1, p2, p3)),
    saving,
  }
}

export const useEditSupportSetting = () => {
  const { addRequest, getDraftId } = useContext(DraftDetailStateContext)
  const { createDraft } = useCreateDraft()
  const [update, { loading: saving }] =
    useMutation<SetSupportRequestReplyMutation>(SET_SUPPORT_REQUEST_REPLY)

  const edit = (
    requestForDonation: string | null,
    replyToDonator: string | null,
    newId?: string
  ) =>
    update({
      variables: {
        id: newId || getDraftId(),
        requestForDonation,
        replyToDonator,
      },
    })

  const createDraftAndEdit = async (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) => {
    if (getDraftId()) return edit(requestForDonation, replyToDonator)

    return createDraft({
      onCreate: (newDraftId) =>
        edit(requestForDonation, replyToDonator, newDraftId),
    })
  }

  return {
    edit: async (p1: any, p2: any) =>
      addRequest(() => createDraftAndEdit(p1, p2)),
    saving,
  }
}

export const useEditDraftSensitiveByAuthor = () => {
  const { addRequest, getDraftId } = useContext(DraftDetailStateContext)
  const { createDraft } = useCreateDraft()
  const [update, { loading: saving }] =
    useMutation<SetDraftSensitiveByAuthorMutation>(SET_SENSITIVE_BY_AUTHOR)

  const edit = (sensitiveByAuthor: boolean, newId?: string) =>
    update({ variables: { id: newId || getDraftId(), sensitiveByAuthor } })

  const createDraftAndEdit = async (sensitiveByAuthor: boolean) => {
    if (getDraftId()) return edit(sensitiveByAuthor)

    return createDraft({
      onCreate: (newDraftId) => edit(sensitiveByAuthor, newDraftId),
    })
  }

  return {
    edit: async (props: any) => addRequest(() => createDraftAndEdit(props)),
    saving,
  }
}

export const useEditDraftPublishISCN = () => {
  const { addRequest, getDraftId } = useContext(DraftDetailStateContext)
  const { createDraft } = useCreateDraft()
  const [update, { loading: saving }] =
    useMutation<SetDraftPublishIscnMutation>(SET_PUBLISH_ISCN)

  const edit = (iscnPublish: boolean, newId?: string) =>
    update({ variables: { id: newId || getDraftId(), iscnPublish } })

  const createDraftAndEdit = async (iscnPublish: boolean) => {
    if (getDraftId()) return edit(iscnPublish)

    return createDraft({
      onCreate: (newDraftId) => edit(iscnPublish, newDraftId),
    })
  }

  return {
    edit: async (props: any) => addRequest(() => createDraftAndEdit(props)),
    saving,
  }
}

export const useEditDraftCanComment = () => {
  const { addRequest, getDraftId } = useContext(DraftDetailStateContext)
  const { createDraft } = useCreateDraft()
  const [update, { loading: saving }] =
    useMutation<SetDraftCanCommentMutation>(SET_CAN_COMMENT)

  const edit = (canComment: boolean, newId?: string) =>
    update({ variables: { id: newId || getDraftId(), canComment } })

  const createDraftAndEdit = async (canComment: boolean) => {
    if (getDraftId()) return edit(canComment)

    return createDraft({
      onCreate: (newDraftId) => edit(canComment, newDraftId),
    })
  }

  return {
    edit: async (props: any) => addRequest(() => createDraftAndEdit(props)),
    saving,
  }
}
