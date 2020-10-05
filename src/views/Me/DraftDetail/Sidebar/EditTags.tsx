import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'

import { toDigestTag } from '~/components'
import SidebarTags from '~/components/Editor/Sidebar/Tags'
import { useMutation } from '~/components/GQL'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { EditTagsDraft } from './__generated__/EditTagsDraft'
import { UpdateDraftTags } from './__generated__/UpdateDraftTags'

const fragments = {
  draft: gql`
    fragment EditTagsDraft on Draft {
      id
      tags
      publishState
    }
  `,
}

const UPDATE_TAGS = gql`
  mutation UpdateDraftTags($id: ID!, $tags: [String]!) {
    putDraft(input: { id: $id, tags: $tags }) {
      id
      ...EditTagsDraft
    }
  }
  ${fragments.draft}
`

interface EditTagsProps {
  draft: EditTagsDraft
  setSaveStatus: (status: 'saved' | 'saving' | 'saveFailed') => void
}

const EditTags = ({ draft, setSaveStatus }: EditTagsProps) => {
  const [updateTags, { loading }] = useMutation<UpdateDraftTags>(UPDATE_TAGS)
  const tags = draft.tags || []
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  const onEdit = async (newTags: DigestTag[]) => {
    setSaveStatus('saving')
    try {
      await updateTags({
        variables: {
          id: draft.id,
          tags: _uniq(newTags.map(({ content }) => content)),
        },
      })
      setSaveStatus('saved')
    } catch (e) {
      setSaveStatus('saveFailed')
    }
  }

  // convert to DigestTag since `draft.tags` only contain content
  const normalizedTags = tags.map(toDigestTag)

  return (
    <SidebarTags
      tags={normalizedTags}
      onEdit={onEdit}
      saving={loading}
      disabled={isPending || isPublished}
    />
  )
}

EditTags.fragments = fragments

export default EditTags
