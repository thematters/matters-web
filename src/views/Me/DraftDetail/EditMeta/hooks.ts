import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'

import { ArticleDigestDropdown } from '~/components'
import { useImperativeQuery, useMutation } from '~/components/GQL'
import assetFragment from '~/components/GQL/fragments/asset'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { DraftAssets } from './__generated__/DraftAssets'
import { EditMetaDraft } from './__generated__/EditMetaDraft'
import { SetDraftCollection } from './__generated__/SetDraftCollection'
import { SetDraftCover } from './__generated__/SetDraftCover'
import { SetDraftTags } from './__generated__/SetDraftTags'

export const fragments = {
  draft: gql`
    fragment EditMetaDraft on Draft {
      id
      publishState
      cover
      assets {
        ...Asset
      }
      tags
      collection(input: { first: null }) {
        edges {
          node {
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
    ${ArticleDigestDropdown.fragments.article}
    ${assetFragment}
  `,
}

const DRAFT_ASSETS = gql`
  query DraftAssets($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        assets {
          ...Asset
        }
      }
    }
  }
  ${assetFragment}
`

const SET_COLLECTION = gql`
  mutation SetDraftCollection($id: ID!, $collection: [ID]) {
    putDraft(input: { id: $id, collection: $collection }) {
      id
      collection(input: { first: null }) {
        edges {
          node {
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`

const SET_COVER = gql`
  mutation SetDraftCover($id: ID!, $cover: ID) {
    putDraft(input: { id: $id, cover: $cover }) {
      id
      ...EditMetaDraft
    }
  }
  ${fragments.draft}
`

const SET_TAGS = gql`
  mutation SetDraftTags($id: ID!, $tags: [String]!) {
    putDraft(input: { id: $id, tags: $tags }) {
      id
      ...EditMetaDraft
    }
  }
  ${fragments.draft}
`

export const useEditCover = (draft: EditMetaDraft) => {
  const draftId = draft.id
  const refetch = useImperativeQuery<DraftAssets>(DRAFT_ASSETS, {
    variables: { id: draft.id },
  })
  const [update, { loading: saving }] = useMutation<SetDraftCover>(SET_COVER)

  const onEdit = (asset?: any) =>
    update({
      variables: {
        id: draftId,
        cover: asset ? asset.id : null,
      },
    })

  return { onEdit, saving, refetch }
}

export const useEditTags = (draft: EditMetaDraft) => {
  const draftId = draft.id
  const [updateTags, { loading: saving }] = useMutation<SetDraftTags>(SET_TAGS)

  const onEdit = (newTags: DigestTag[]) =>
    updateTags({
      variables: {
        id: draftId,
        tags: _uniq(newTags.map(({ content }) => content)),
      },
    })

  return { onEdit, saving }
}

export const useEditCollection = (draft: EditMetaDraft) => {
  const draftId = draft.id
  const [setCollection, { loading: saving }] = useMutation<SetDraftCollection>(
    SET_COLLECTION
  )

  const onEdit = (newArticles: ArticleDigestDropdownArticle[]) =>
    setCollection({
      variables: {
        id: draftId,
        collection: _uniq(newArticles.map(({ id }) => id)),
      },
    })

  return { onEdit, saving }
}
