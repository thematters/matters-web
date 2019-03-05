import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { Mutation } from 'react-apollo'

import { Translate } from '~/components'

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
  const tags = draft.tags || []

  return (
    <Collapsable title={<Translate zh_hans="增加标签" zh_hant="增加標籤" />}>
      <p className="tags-intro">
        <Translate
          zh_hant="通過添加標籤幫助讀者更好地找到你的文章。每篇文章最多可以添加五個標籤。如果沒有合適的標籤，你可以創建新的。"
          zh_hans="通过添加标签帮助读者更好地找到你的文章。每篇文章最多可以添加五个标签。如果没有合适的标签，你可以创建新的。"
        />
      </p>

      <Mutation mutation={UPDATE_TAGS}>
        {updateTags => {
          const addTag = (tag: string) =>
            updateTags({
              variables: { id: draft.id, tags: _uniq(tags.concat(tag)) }
            })
          const deleteTag = (tag: string) =>
            updateTags({
              variables: { id: draft.id, tags: tags.filter(it => it !== tag) }
            })

          return (
            <section className="tags-container">
              {tags.map(tag => (
                <Tag tag={tag} deleteTag={deleteTag} key={tag} />
              ))}
              <SearchTags hasTags={tags.length > 0} addTag={addTag} />
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
