import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useEffect } from 'react'

import { Spinner, Tag } from '~/components'
import SidebarTags from '~/components/Editor/Sidebar/Tags'
import { QueryError } from '~/components/GQL'

import { ArticleTags } from './__generated__/ArticleTags'

export interface EditTagsProps {
  articleId: string
  tags: string[]
  setTags: (tags: string[]) => any
}

const ARTICLE_TAGS = gql`
  query ArticleTags($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Article {
        tags @connection(key: "tagsList") {
          ...DigestTag
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

const EditTags = ({ articleId, tags, setTags }: EditTagsProps) => {
  const { data, loading, error } = useQuery<ArticleTags>(ARTICLE_TAGS, {
    variables: { id: articleId },
  })

  useEffect(() => {
    setTags(
      (data?.node?.__typename === 'Article' &&
        data.node.tags?.map(({ content }) => content)) ||
        []
    )
  }, [data?.node?.__typename])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <SidebarTags
      tags={tags}
      onAddTag={(tag) => setTags(_uniq(tags.concat(tag)))}
      onDeleteTag={(tag) => setTags(tags.filter((it) => it !== tag))}
    />
  )
}

export default EditTags
