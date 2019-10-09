import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useContext } from 'react'

import { Translate } from '~/components'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Mutation } from '~/components/GQL'

import Collapsable from '../Collapsable'
import { AddTagsDraft } from './__generated__/AddTagsDraft'
import SearchTags from './SearchTags'
import styles from './styles.css'
import Tag from './Tag'

const fragments = {
  draft: gql`
    fragment AddTagsDraft on Draft {
      id
      tags
      publishState
    }
  `
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

const AddTags = ({ draft }: { draft: AddTagsDraft }) => {
  const { updateHeaderState } = useContext(HeaderContext)

  const draftId = draft.id
  const tags = draft.tags || []
  const hasTags = tags.length > 0
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const tagsContainerClasses = classNames({
    'tags-container': true,
    'u-area-disable': isPending || isPublished
  })

  return (
    <Collapsable
      title={<Translate zh_hans="增加标签" zh_hant="增加標籤" />}
      defaultCollapsed={!hasTags}
    >
      <p className="tags-intro">
        <Translate
          zh_hant="通過添加標籤幫助讀者更好地找到你的作品。每篇作品最多可以添加五個標籤。如果沒有合適的標籤，你可以創建新的。"
          zh_hans="通过添加标签帮助读者更好地找到你的作品。每篇作品最多可以添加五个标签。如果没有合适的标签，你可以创建新的。"
        />
      </p>

      <Mutation mutation={UPDATE_TAGS}>
        {updateTags => {
          const addTag = async (tag: string) => {
            updateHeaderState({ type: 'draft', state: 'saving', draftId })
            try {
              await updateTags({
                variables: { id: draft.id, tags: _uniq(tags.concat(tag)) }
              })
              updateHeaderState({ type: 'draft', state: 'saved', draftId })
            } catch (e) {
              updateHeaderState({ type: 'draft', state: 'saveFailed', draftId })
            }
          }
          const deleteTag = async (tag: string) => {
            updateHeaderState({ type: 'draft', state: 'saving', draftId })
            try {
              await updateTags({
                variables: { id: draft.id, tags: tags.filter(it => it !== tag) }
              })
              updateHeaderState({ type: 'draft', state: 'saved', draftId })
            } catch (e) {
              updateHeaderState({ type: 'draft', state: 'saveFailed', draftId })
            }
          }

          return (
            <section className={tagsContainerClasses}>
              {tags.map(tag => (
                <Tag tag={tag} deleteTag={deleteTag} key={tag} />
              ))}
              <SearchTags addTag={addTag} />
            </section>
          )
        }}
      </Mutation>

      <style jsx>{styles}</style>
    </Collapsable>
  )
}

AddTags.fragments = fragments

export default AddTags
