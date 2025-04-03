import _uniq from 'lodash/uniq'
import { useContext } from 'react'

import { DraftDetailStateContext } from '~/components'
import { useImperativeQuery, useMutation } from '~/components/GQL'
import {
  ArticleAccessType,
  ArticleDigestDropdownArticleFragment,
  ArticleLicenseType,
  AssetFragment,
  DigestRichCirclePublicFragment,
  DigestTagFragment,
  DraftAssetsQuery,
  SetDraftAccessMutation,
  SetDraftCanCommentMutation,
  SetDraftCollectionMutation,
  SetDraftCoverMutation,
  SetDraftIndentMutation,
  SetDraftPublishIscnMutation,
  SetDraftSensitiveByAuthorMutation,
  SetDraftTagsMutation,
  SetSupportRequestReplyMutation,
} from '~/gql/graphql'

import {
  DRAFT_ASSETS,
  SET_ACCESS,
  SET_CAMPAIGN,
  SET_CAN_COMMENT,
  SET_COLLECTION,
  SET_COVER,
  SET_INDENT,
  SET_PUBLISH_ISCN,
  SET_SENSITIVE_BY_AUTHOR,
  SET_SUPPORT_REQUEST_REPLY,
  SET_TAGS,
} from './gql'

/**
 * Hooks for editing draft cover, tags and collection
 */
export const useEditDraftCover = () => {
  const { addRequest, getDraftId, createDraft, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const refetch = useImperativeQuery<DraftAssetsQuery>(DRAFT_ASSETS, {
    variables: { id: getDraftId() },
    fetchPolicy: 'network-only',
  })
  const [update, { loading: saving }] =
    useMutation<SetDraftCoverMutation>(SET_COVER)

  const edit = async (
    asset?: AssetFragment,
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return update({
      variables: {
        id: newId || getDraftId(),
        cover: asset ? asset.id : null,
        lastUpdatedAt,
      },
    })
  }

  const createDraftAndEdit = async (asset?: AssetFragment) => {
    if (getDraftId()) {
      return edit(asset, undefined, getDraftUpdatedAt())
    }

    return createDraft({
      onCreate: (newDraftId) => edit(asset, newDraftId),
    })
  }

  return {
    edit: async (assets?: AssetFragment) =>
      addRequest(() => createDraftAndEdit(assets)),
    saving,
    refetch,
  }
}

export const useEditDraftTags = () => {
  const { addRequest, createDraft, getDraftId, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const [updateTags, { loading: saving }] =
    useMutation<SetDraftTagsMutation>(SET_TAGS)

  const edit = async (
    newTags: DigestTagFragment[],
    newId?: string,
    lastUpdatedAt?: string
  ) =>
    updateTags({
      variables: {
        id: newId || getDraftId(),
        tags: _uniq(newTags.map(({ content }) => content)),
        lastUpdatedAt,
      },
    })

  const createDraftAndEdit = async (newTags: DigestTagFragment[]) => {
    if (getDraftId()) {
      return edit(newTags, undefined, getDraftUpdatedAt())
    }

    return createDraft({
      onCreate: (newDraftId) => edit(newTags, newDraftId),
    })
  }

  return {
    edit: async (newTags: DigestTagFragment[]) =>
      addRequest(() => createDraftAndEdit(newTags)),
    saving,
  }
}

export const useEditDraftCollection = () => {
  const { addRequest, createDraft, getDraftId, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const [setCollection, { loading: saving }] =
    useMutation<SetDraftCollectionMutation>(SET_COLLECTION)

  const edit = async (
    newArticles: ArticleDigestDropdownArticleFragment[],
    newId?: string,
    lastUpdatedAt?: string
  ) =>
    setCollection({
      variables: {
        id: newId || getDraftId(),
        collection: _uniq(newArticles.map(({ id }) => id)),
        lastUpdatedAt,
      },
    })

  const createDraftAndEdit = async (
    newArticles: ArticleDigestDropdownArticleFragment[]
  ) => {
    if (getDraftId()) {
      return edit(newArticles, undefined, getDraftUpdatedAt())
    }

    return createDraft({
      onCreate: (newDraftId) => edit(newArticles, newDraftId),
    })
  }

  return {
    edit: async (newArticles: ArticleDigestDropdownArticleFragment[]) =>
      addRequest(() => createDraftAndEdit(newArticles)),
    saving,
  }
}

export const useEditDraftAccess = (circle?: DigestRichCirclePublicFragment) => {
  const { addRequest, createDraft, getDraftId, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const [setAccess, { loading: saving }] =
    useMutation<SetDraftAccessMutation>(SET_ACCESS)

  const edit = async (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType,
    newId?: string,
    lastUpdatedAt?: string
  ) =>
    setAccess({
      variables: {
        id: newId || getDraftId(),
        circle: (addToCircle && circle?.id) || null,
        license,
        accessType: paywalled
          ? ArticleAccessType.Paywall
          : ArticleAccessType.Public,
        lastUpdatedAt,
      },
    })

  const createDraftAndEdit = async (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) => {
    if (getDraftId()) {
      return edit(
        addToCircle,
        paywalled,
        license,
        undefined,
        getDraftUpdatedAt()
      )
    }

    return createDraft({
      onCreate: (newDraftId) =>
        edit(addToCircle, paywalled, license, newDraftId),
    })
  }

  return {
    edit: async (
      addToCircle: boolean,
      paywalled: boolean,
      license: ArticleLicenseType
    ) => addRequest(() => createDraftAndEdit(addToCircle, paywalled, license)),
    saving,
  }
}

export const useEditSupportSetting = () => {
  const { addRequest, createDraft, getDraftId, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const [update, { loading: saving }] =
    useMutation<SetSupportRequestReplyMutation>(SET_SUPPORT_REQUEST_REPLY)

  const edit = async (
    requestForDonation: string | null,
    replyToDonator: string | null,
    newId?: string,
    lastUpdatedAt?: string
  ) =>
    update({
      variables: {
        id: newId || getDraftId(),
        requestForDonation,
        replyToDonator,
        lastUpdatedAt,
      },
    })

  const createDraftAndEdit = async (
    requestForDonation: string | null,
    replyToDonator: string | null
  ) => {
    if (getDraftId()) {
      return edit(
        requestForDonation,
        replyToDonator,
        undefined,
        getDraftUpdatedAt()
      )
    }

    return createDraft({
      onCreate: (newDraftId) =>
        edit(requestForDonation, replyToDonator, newDraftId),
    })
  }

  return {
    edit: async (
      requestForDonation: string | null,
      replyToDonator: string | null
    ) =>
      addRequest(() => createDraftAndEdit(requestForDonation, replyToDonator)),
    saving,
  }
}

export const useEditDraftSensitiveByAuthor = () => {
  const { addRequest, createDraft, getDraftId, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const [update, { loading: saving }] =
    useMutation<SetDraftSensitiveByAuthorMutation>(SET_SENSITIVE_BY_AUTHOR)

  const edit = async (
    sensitiveByAuthor: boolean,
    newId?: string,
    lastUpdatedAt?: string
  ) =>
    update({
      variables: {
        id: newId || getDraftId(),
        sensitiveByAuthor,
        lastUpdatedAt,
      },
    })

  const createDraftAndEdit = async (sensitiveByAuthor: boolean) => {
    if (getDraftId()) {
      return edit(sensitiveByAuthor, undefined, getDraftUpdatedAt())
    }

    return createDraft({
      onCreate: (newDraftId) => edit(sensitiveByAuthor, newDraftId),
    })
  }

  return {
    edit: async (sensitiveByAuthor: boolean) =>
      addRequest(() => createDraftAndEdit(sensitiveByAuthor)),
    saving,
  }
}

export const useEditDraftPublishISCN = () => {
  const { addRequest, createDraft, getDraftId, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const [update, { loading: saving }] =
    useMutation<SetDraftPublishIscnMutation>(SET_PUBLISH_ISCN)

  const edit = async (
    iscnPublish: boolean,
    newId?: string,
    lastUpdatedAt?: string
  ) =>
    update({
      variables: {
        id: newId || getDraftId(),
        iscnPublish,
        lastUpdatedAt,
      },
    })

  const createDraftAndEdit = async (iscnPublish: boolean) => {
    if (getDraftId()) {
      return edit(iscnPublish, undefined, getDraftUpdatedAt())
    }

    return createDraft({
      onCreate: (newDraftId) => edit(iscnPublish, newDraftId),
    })
  }

  return {
    edit: async (iscnPublish: boolean) =>
      addRequest(() => createDraftAndEdit(iscnPublish)),
    saving,
  }
}

export const useEditDraftCanComment = () => {
  const { addRequest, createDraft, getDraftId, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const [update, { loading: saving }] =
    useMutation<SetDraftCanCommentMutation>(SET_CAN_COMMENT)

  const edit = async (
    canComment: boolean,
    newId?: string,
    lastUpdatedAt?: string
  ) =>
    update({
      variables: {
        id: newId || getDraftId(),
        canComment,
        lastUpdatedAt,
      },
    })

  const createDraftAndEdit = async (canComment: boolean) => {
    if (getDraftId()) {
      return edit(canComment, undefined, getDraftUpdatedAt())
    }

    return createDraft({
      onCreate: (newDraftId) => edit(canComment, newDraftId),
    })
  }

  return {
    edit: async (canComment: boolean) =>
      addRequest(() => createDraftAndEdit(canComment)),
    saving,
  }
}

export const useEditIndent = () => {
  const { addRequest, createDraft, getDraftId, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const [update, { loading: saving }] =
    useMutation<SetDraftIndentMutation>(SET_INDENT)

  const edit = async (
    indented: boolean,
    newId?: string,
    lastUpdatedAt?: string
  ) =>
    update({
      variables: {
        id: newId || getDraftId(),
        indented,
        lastUpdatedAt,
      },
    })

  const createDraftAndEdit = async (indented: boolean) => {
    if (getDraftId()) {
      return edit(indented, undefined, getDraftUpdatedAt())
    }

    return createDraft({
      onCreate: (newDraftId) => edit(indented, newDraftId),
    })
  }

  return {
    edit: async (indented: boolean) =>
      addRequest(() => createDraftAndEdit(indented)),
    saving,
  }
}

export const useEditDraftCampaign = () => {
  const { addRequest, createDraft, getDraftId, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const [update, { loading: saving }] =
    useMutation<SetDraftCanCommentMutation>(SET_CAMPAIGN)

  const edit = async (
    selected?: { campaign: string; stage: string },
    newId?: string,
    lastUpdatedAt?: string
  ) =>
    update({
      variables: {
        id: newId || getDraftId(),
        campaigns: selected ? [selected] : [],
        isReset: !selected,
        lastUpdatedAt,
      },
    })

  const createDraftAndEdit = async (selected?: {
    campaign: string
    stage: string
  }) => {
    if (getDraftId()) {
      return edit(selected, undefined, getDraftUpdatedAt())
    }

    return createDraft({
      onCreate: (newDraftId) => edit(selected, newDraftId),
    })
  }

  return {
    edit: async (selected?: { campaign: string; stage: string }) =>
      addRequest(() => createDraftAndEdit(selected)),
    saving: saving,
  }
}
