import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'

import { Translate } from '~/components'
import SidebarCollapsable from '~/components/Editor/Sidebar/Collapsable'
import { useMutation } from '~/components/GQL'

import SearchTags from './SearchTags'
import styles from './styles.css'
import Tag from './Tag'

import { AddTagsDraft } from './__generated__/AddTagsDraft'
import { UpdateDraftTags } from './__generated__/UpdateDraftTags'

const fragments = {
  draft: gql`
    fragment AddTagsDraft on Draft {
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
      ...AddTagsDraft
    }
  }
  ${fragments.draft}
`

interface AddTagsProps {
  draft: AddTagsDraft
  setSaveStatus: (status: 'saved' | 'saving' | 'saveFailed') => void
}

const AddTags = ({ draft, setSaveStatus }: AddTagsProps) => {
  const [updateTags] = useMutation<UpdateDraftTags>(UPDATE_TAGS)
  // const draftId = draft.id
  const tags = draft.tags || []
  const hasTags = tags.length > 0
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const tagsContainerClasses = classNames({
    'tags-container': true,
    'u-area-disable': isPending || isPublished,
  })
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
    <SidebarCollapsable
      title={<Translate id="tag" />}
      defaultCollapsed={!hasTags}
    >
      <p className="tags-intro">
        <Translate
          zh_hant="通過添加標籤幫助讀者更好地找到你的作品。如果沒有合適的標籤，你可以創建新的。"
          zh_hans="通过添加标签帮助读者更好地找到你的作品。如果没有合适的标签，你可以创建新的。"
        />
      </p>

      <section className={tagsContainerClasses}>
        {tags.map((tag) => (
          <Tag tag={tag} deleteTag={deleteTag} key={tag} />
        ))}
        <SearchTags addTag={addTag} />
      </section>

      <style jsx>{styles}</style>
    </SidebarCollapsable>
  )
}

AddTags.fragments = fragments

export default AddTags
