import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useEffect } from 'react'

import { Spinner, Tag } from '~/components'
import SidebarCollection from '~/components/Editor/Sidebar/Collection'
import SidebarTags from '~/components/Editor/Sidebar/Tags'
import { QueryError } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { EditModeArticle } from './__generated__/EditModeArticle'

interface EditModeSidebarProps {
  mediaHash: string
  editModeTags: string[]
  setEditModeTags: (tags: string[]) => any
  editModeCollection: ArticleDigestDropdownArticle[]
  setEditModeCollection: (articles: ArticleDigestDropdownArticle[]) => any
}

const EDIT_MODE_ARTICLE = gql`
  query EditModeArticle(
    $mediaHash: String!
    $after: String
    $first: Int = null
  ) {
    article(input: { mediaHash: $mediaHash }) {
      id
      tags {
        ...DigestTag
      }
      ...ArticleCollection
    }
  }
  ${Tag.fragments.tag}
  ${articleFragments.articleCollection}
`

const EditModeSidebar = ({
  mediaHash,
  editModeTags,
  setEditModeTags,
  editModeCollection,
  setEditModeCollection,
}: EditModeSidebarProps) => {
  const { data, loading, error } = useQuery<EditModeArticle>(
    EDIT_MODE_ARTICLE,
    {
      variables: { mediaHash },
    }
  )
  const article = data?.article
  const tags = article?.tags?.map(({ content }) => content) || []
  const collection = article?.collection.edges?.map(({ node }) => node) || []

  useEffect(() => {
    setEditModeTags(tags)
    setEditModeCollection(collection)
  }, [data?.article?.id])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!article) {
    return null
  }

  return (
    <>
      <SidebarTags
        tags={editModeTags.length > 0 ? editModeTags : tags}
        onAddTag={(tag) => setEditModeTags(_uniq(editModeTags.concat(tag)))}
        onDeleteTag={(tag) =>
          setEditModeTags(editModeTags.filter((it) => it !== tag))
        }
      />
      <SidebarCollection
        articles={
          editModeCollection.length > 0 ? editModeCollection : collection
        }
        onEdit={setEditModeCollection}
      />
    </>
  )
}

export default EditModeSidebar
