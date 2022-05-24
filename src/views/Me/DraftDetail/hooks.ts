import _uniq from 'lodash/uniq'

import { useImperativeQuery, useMutation } from '~/components/GQL'

import {
  DRAFT_ASSETS,
  SET_ACCESS,
  SET_COLLECTION,
  SET_COVER,
  SET_PUBLISH_ISCN,
  SET_TAGS,
} from './gql'

import {
  ArticleAccessType,
  ArticleLicenseType,
} from '@/__generated__/globalTypes'
import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { DraftAssets } from './__generated__/DraftAssets'
import { EditMetaDraft } from './__generated__/EditMetaDraft'
import { SetDraftAccess } from './__generated__/SetDraftAccess'
import { SetDraftCollection } from './__generated__/SetDraftCollection'
import { SetDraftCover } from './__generated__/SetDraftCover'
import { SetDraftPublishISCN } from './__generated__/SetDraftPublishISCN'
import { SetDraftTags } from './__generated__/SetDraftTags'

/**
 * Hooks for editing draft cover, tags and collection
 */
export const useEditDraftCover = (draft: EditMetaDraft) => {
  const draftId = draft.id
  const refetch = useImperativeQuery<DraftAssets>(DRAFT_ASSETS, {
    variables: { id: draft.id },
    fetchPolicy: 'network-only',
  })
  const [update, { loading: saving }] = useMutation<SetDraftCover>(SET_COVER)

  const edit = (asset?: any) =>
    update({
      variables: { id: draftId, cover: asset ? asset.id : null },
    })

  return { edit, saving, refetch }
}

export const useEditDraftTags = (draft: EditMetaDraft) => {
  const draftId = draft.id
  const [updateTags, { loading: saving }] = useMutation<SetDraftTags>(SET_TAGS)

  const edit = (newTags: DigestTag[]) =>
    updateTags({
      variables: {
        id: draftId,
        tags: _uniq(newTags.map(({ content }) => content)),
      },
    })

  return { edit, saving }
}

export const useEditDraftPublishISCN = (draft: EditMetaDraft) => {
  const draftId = draft.id
  const [update, { loading: saving }] =
    useMutation<SetDraftPublishISCN>(SET_PUBLISH_ISCN)

  const edit = (iscnPublish: boolean) =>
    update({
      variables: {
        id: draftId,
        iscnPublish,
      },
    })

  return { edit, saving }
}

export const useEditDraftCollection = (draft: EditMetaDraft) => {
  const draftId = draft.id
  const [setCollection, { loading: saving }] =
    useMutation<SetDraftCollection>(SET_COLLECTION)

  const edit = (newArticles: ArticleDigestDropdownArticle[]) =>
    setCollection({
      variables: {
        id: draftId,
        collection: _uniq(newArticles.map(({ id }) => id)),
      },
    })

  return { edit, saving }
}

export const useEditDraftAccess = (
  draft: EditMetaDraft,
  circle?: DigestRichCirclePublic
) => {
  const draftId = draft.id
  const [setAccess, { loading: saving }] =
    useMutation<SetDraftAccess>(SET_ACCESS)

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
          ? ArticleAccessType.paywall
          : ArticleAccessType.public,
      },
    })

  return { edit, saving }
}
