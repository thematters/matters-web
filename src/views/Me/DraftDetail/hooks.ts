import _uniq from 'lodash/uniq'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import { ERROR_CODES } from '~/common/enums'
import { parseFormSubmitErrors } from '~/common/utils'
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

export const useVersionConflictHandler = () => {
  const intl = useIntl()

  return async <T>(
    promise: Promise<T>,
    retryFn?: () => Promise<T>
  ): Promise<T> => {
    try {
      return await promise
    } catch (error: any) {
      const [, codes] = parseFormSubmitErrors(error)
      for (const code of codes) {
        if (code.includes(ERROR_CODES.DRAFT_VERSION_CONFLICT) && retryFn) {
          // Show native confirm dialog instead of using the event
          const confirmResult = window.confirm(
            intl.formatMessage({
              defaultMessage:
                'The draft has been updated on another device or tab. Click OK to continue editing and overwrite this version.',
              id: 'kEfk9g',
            })
          )

          if (confirmResult) {
            return retryFn()
          } else {
            window.close()
          }
        }
      }
      throw error
    }
  }
}

/**
 * Hooks for editing draft cover, tags and collection
 */
export const useEditDraftCover = () => {
  const { addRequest, getDraftId, createDraft, getDraftUpdatedAt } = useContext(
    DraftDetailStateContext
  )
  const handleVersionConflict = useVersionConflictHandler()
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
    return handleVersionConflict(
      update({
        variables: {
          id: newId || getDraftId(),
          cover: asset ? asset.id : null,
          lastUpdatedAt,
        },
      }),
      () =>
        update({
          variables: {
            id: newId || getDraftId(),
            cover: asset ? asset.id : null,
          },
        })
    )
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
  const handleVersionConflict = useVersionConflictHandler()

  const edit = async (
    newTags: DigestTagFragment[],
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return handleVersionConflict(
      updateTags({
        variables: {
          id: newId || getDraftId(),
          tags: _uniq(newTags.map(({ content }) => content)),
          lastUpdatedAt,
        },
      }),
      () =>
        updateTags({
          variables: {
            id: newId || getDraftId(),
            tags: _uniq(newTags.map(({ content }) => content)),
          },
        })
    )
  }

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
  const handleVersionConflict = useVersionConflictHandler()

  const edit = async (
    newArticles: ArticleDigestDropdownArticleFragment[],
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return handleVersionConflict(
      setCollection({
        variables: {
          id: newId || getDraftId(),
          collection: _uniq(newArticles.map(({ id }) => id)),
          lastUpdatedAt,
        },
      }),
      () =>
        setCollection({
          variables: {
            id: newId || getDraftId(),
            collection: _uniq(newArticles.map(({ id }) => id)),
          },
        })
    )
  }

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
  const handleVersionConflict = useVersionConflictHandler()

  const edit = async (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType,
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return handleVersionConflict(
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
      }),
      () =>
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
    )
  }

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
  const handleVersionConflict = useVersionConflictHandler()

  const edit = async (
    requestForDonation: string | null,
    replyToDonator: string | null,
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return handleVersionConflict(
      update({
        variables: {
          id: newId || getDraftId(),
          requestForDonation,
          replyToDonator,
          lastUpdatedAt,
        },
      }),
      () =>
        update({
          variables: {
            id: newId || getDraftId(),
            requestForDonation,
            replyToDonator,
          },
        })
    )
  }

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
  const handleVersionConflict = useVersionConflictHandler()

  const edit = async (
    sensitiveByAuthor: boolean,
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return handleVersionConflict(
      update({
        variables: {
          id: newId || getDraftId(),
          sensitiveByAuthor,
          lastUpdatedAt,
        },
      }),
      () =>
        update({
          variables: {
            id: newId || getDraftId(),
            sensitiveByAuthor,
          },
        })
    )
  }

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
  const handleVersionConflict = useVersionConflictHandler()

  const edit = async (
    iscnPublish: boolean,
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return handleVersionConflict(
      update({
        variables: {
          id: newId || getDraftId(),
          iscnPublish,
          lastUpdatedAt,
        },
      }),
      () =>
        update({
          variables: {
            id: newId || getDraftId(),
            iscnPublish,
          },
        })
    )
  }

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
  const handleVersionConflict = useVersionConflictHandler()

  const edit = async (
    canComment: boolean,
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return handleVersionConflict(
      update({
        variables: {
          id: newId || getDraftId(),
          canComment,
          lastUpdatedAt,
        },
      }),
      () =>
        update({
          variables: {
            id: newId || getDraftId(),
            canComment,
          },
        })
    )
  }

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
  const handleVersionConflict = useVersionConflictHandler()

  const edit = async (
    indented: boolean,
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return handleVersionConflict(
      update({
        variables: {
          id: newId || getDraftId(),
          indented,
          lastUpdatedAt,
        },
      }),
      () =>
        update({
          variables: {
            id: newId || getDraftId(),
            indented,
          },
        })
    )
  }

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
  const handleVersionConflict = useVersionConflictHandler()

  const edit = async (
    selected?: { campaign: string; stage: string },
    newId?: string,
    lastUpdatedAt?: string
  ) => {
    return handleVersionConflict(
      update({
        variables: {
          id: newId || getDraftId(),
          campaigns: selected ? [selected] : [],
          isReset: !selected,
          lastUpdatedAt,
        },
      }),
      () =>
        update({
          variables: {
            id: newId || getDraftId(),
            campaigns: selected ? [selected] : [],
            isReset: !selected,
          },
        })
    )
  }

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
