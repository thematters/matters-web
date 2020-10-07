import gql from 'graphql-tag'

import SidebarCover from '~/components/Editor/Sidebar/Cover'
import { useImperativeQuery, useMutation } from '~/components/GQL'
import assetFragment from '~/components/GQL/fragments/asset'

import { ENTITY_TYPE } from '~/common/enums'

import { DraftAssets } from './__generated__/DraftAssets'
import {
  EditCoverDraft,
  EditCoverDraft_assets,
} from './__generated__/EditCoverDraft'
import { UpdateDraftCover } from './__generated__/UpdateDraftCover'

const fragments = {
  draft: gql`
    fragment EditCoverDraft on Draft {
      id
      publishState
      cover
      assets {
        ...Asset
      }
    }
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

const UPDATE_COVER = gql`
  mutation UpdateDraftCover($id: ID!, $cover: ID) {
    putDraft(input: { id: $id, cover: $cover }) {
      id
      ...EditCoverDraft
    }
  }
  ${fragments.draft}
`

interface EditCoverProps {
  draft: EditCoverDraft
}

const EditCover = ({ draft }: EditCoverProps) => {
  const refetchAssets = useImperativeQuery<DraftAssets>(DRAFT_ASSETS, {
    variables: { id: draft.id },
  })
  const [update, { loading }] = useMutation<UpdateDraftCover>(UPDATE_COVER)
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  const onEdit = (asset?: EditCoverDraft_assets) => {
    update({
      variables: {
        id: draft.id,
        cover: asset ? asset.id : null,
      },
    })
  }

  return (
    <SidebarCover
      cover={draft.cover}
      assets={draft.assets}
      entityId={draft.id}
      entityType={ENTITY_TYPE.draft}
      onEdit={onEdit}
      refetchAssets={refetchAssets}
      saving={loading}
      disabled={isPending || isPublished}
    />
  )
}

EditCover.fragments = fragments

export default EditCover
