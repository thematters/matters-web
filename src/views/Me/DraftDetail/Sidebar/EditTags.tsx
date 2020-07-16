import { gql } from '@apollo/client'
import _uniq from 'lodash/uniq'

import SidebarTags from '~/components/Editor/Sidebar/Tags'
import { useMutation } from '~/components/GQL'

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
  const [updateTags] = useMutation<UpdateDraftTags>(UPDATE_TAGS)
  const tags = draft.tags || []
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'

  const addTag = async (tag: string) => {
    setSaveStatus('saving')
    try {
      await updateTags({
        variables: { id: draft.id, tags: _uniq(tags.concat(tag)) },
      })
      setSaveStatus('saved')
    } catch (e) {
      setSaveStatus('saveFailed')
    }
  }
  const deleteTag = async (tag: string) => {
    setSaveStatus('saving')
    try {
      await updateTags({
        variables: { id: draft.id, tags: tags.filter((it) => it !== tag) },
      })
      setSaveStatus('saved')
    } catch (e) {
      setSaveStatus('saveFailed')
    }
  }

  return (
    <SidebarTags
      tags={tags}
      onAddTag={addTag}
      onDeleteTag={deleteTag}
      disabled={isPending || isPublished}
    />
  )
}

EditTags.fragments = fragments

export default EditTags
