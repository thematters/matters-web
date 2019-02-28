import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useContext, useState } from 'react'
import { Mutation, Query, QueryResult } from 'react-apollo'

import {
  Dropdown,
  Icon,
  Label,
  LanguageContext,
  Spinner,
  TextIcon,
  Translate
} from '~/components'

import { translate } from '~/common/utils'
import ICON_CLOSE from '~/static/icons/close-white.svg?sprite'

import { AddTagsDraft } from './__generated__/AddTagsDraft'
import {
  SearchTagsQuery,
  SearchTagsQuery_search_edges_node_Tag
} from './__generated__/SearchTagsQuery'
import Collapsable from './Collapsable'
import styles from './styles.css'

const fragments = {
  draft: gql`
    fragment AddTagsDraft on Draft {
      id
      tags
    }
  `
}

const SEARCH_TAGS = gql`
  query SearchTagsQuery($search: String!) {
    search(input: { key: $search, type: Tag, first: 10 }) {
      edges {
        node {
          ... on Tag {
            id
            content
            articles(input: {}) {
              totalCount
            }
          }
        }
      }
    }
  }
`

const UPDATE_TAGS = gql`
  mutation UpdateDraftTags($id: ID!, $tags: [String]!) {
    putDraft(input: { id: $id, tags: $tags }) {
      id
      ...AddTagsDraft
    }
  }
  ${fragments.draft}
`

const SearchTags = ({
  hasTags,
  addTag
}: {
  hasTags: boolean
  addTag: (tag: string) => void
}) => {
  const { lang } = useContext(LanguageContext)

  const [search, setSearch] = useState('')

  const DropdownContent = ({
    tags
  }: {
    tags: SearchTagsQuery_search_edges_node_Tag[]
  }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '10.5rem'
      }}
    >
      {tags.map(tag => (
        <span
          onClick={() => addTag(tag.content)}
          style={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}
        >
          <span>{tag.content}</span>
          <span>{tag.articles.totalCount}</span>
        </span>
      ))}
      <hr />
      <span onClick={() => addTag(search)}>
        <Translate zh_hans="创建" zh_hant="創建" />
        <span> {search} </span>
      </span>
    </div>
  )

  return (
    <>
      <Query query={SEARCH_TAGS} variables={{ search }}>
        {({ data, loading }: QueryResult & { data: SearchTagsQuery }) => (
          <Dropdown
            content={
              loading ? (
                <Spinner />
              ) : (
                <DropdownContent
                  tags={data.search.edges.map(
                    ({
                      node
                    }: {
                      node: SearchTagsQuery_search_edges_node_Tag
                    }) => node
                  )}
                />
              )
            }
          >
            <input
              onChange={e => setSearch(e.target.value)}
              value={search}
              style={{ fontSize: 14, marginTop: 16 }}
              placeholder={
                hasTags
                  ? undefined
                  : translate({
                      zh_hans: '增加标签...',
                      zh_hant: '增加標籤...',
                      lang
                    })
              }
            />
          </Dropdown>
        )}
      </Query>
      <style jsx>{styles}</style>
    </>
  )
}

const TagList = ({
  tags,
  deleteTag
}: {
  tags: string[]
  deleteTag: (tag: string) => void
}) => (
  <>
    {tags.map((tag, i) => (
      <Label
        key={i}
        style={{
          marginRight: '0.25rem',
          width: '4rem',
          padding: '0.125rem'
        }}
      >
        <TextIcon
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: ''
          }}
          textPlacement="left"
          icon={
            <Icon
              size="xsmall"
              id={ICON_CLOSE.id}
              viewBox={ICON_CLOSE.viewBox}
              onClick={() => deleteTag(tag)}
            />
          }
        >
          {tag}
        </TextIcon>
      </Label>
    ))}
  </>
)

const AddTags = ({ draft }: { draft: AddTagsDraft }) => {
  const tags = draft.tags || []

  return (
    <Collapsable title={<Translate zh_hans="增加标签" zh_hant="增加標籤" />}>
      <span className={'sidebar-description'}>
        <Translate
          zh_hant="通過添加標籤幫助讀者更好地找到你的文章。每篇文章最多可以添加五個標籤。如果沒有合適的標籤，你可以創建新的。"
          zh_hans="通过添加标签帮助读者更好地找到你的文章。每篇文章最多可以添加五个标签。如果没有合适的标签，你可以创建新的。"
        />
      </span>
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
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline'
              }}
            >
              <TagList tags={tags} deleteTag={deleteTag} />
              <SearchTags hasTags={tags.length > 0} addTag={addTag} />
            </span>
          )
        }}
      </Mutation>
      <style jsx>{styles}</style>
    </Collapsable>
  )
}

AddTags.fragments = fragments

export default AddTags
