import gql from 'graphql-tag'

import SidebarCover from '~/components/Editor/Sidebar/Cover'
import { useMutation } from '~/components/GQL'
import assetFragment from '~/components/GQL/fragments/asset'

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

const UPDATE_COVER = gql`
  mutation UpdateDraftCover($id: ID!, $coverAssetId: ID) {
    putDraft(input: { id: $id, coverAssetId: $coverAssetId }) {
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
  const [update, { loading }] = useMutation<UpdateDraftCover>(UPDATE_COVER)
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  const onEdit = (asset: EditCoverDraft_assets) => {
    update({
      variables: {
        id: draft.id,
        coverAssetId: asset.id,
      },
    })
  }

  return (
    <SidebarCover
      cover={draft.cover}
      assets={draft.assets}
      onEdit={onEdit}
      saving={loading}
      disabled={isPending || isPublished}
    />
  )
}

EditCover.fragments = fragments

export default EditCover
