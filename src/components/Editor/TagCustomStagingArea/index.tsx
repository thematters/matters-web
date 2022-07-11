import { useContext } from 'react'

import { Spinner, usePublicQuery, ViewerContext } from '~/components'
import { SelectTag } from '~/components/SearchSelect/SearchingArea'
import { CustomStagingAreaProps } from '~/components/SearchSelect/StagingArea'

import { EDITOR_RECOMMENDED_TAGS } from './gql'
import RecommendedTags from './RecommendedTags'
import SelectedTags from './SelectedTags'
import styles from './styles.css'

import {
  EditorRecommendedTags,
  EditorRecommendedTags_user_tags_edges_node as TagType,
} from './__generated__/EditorRecommendedTags'

const TagCustomStagingArea = ({
  nodes: tags,
  setNodes: setTags,
  hint,
}: CustomStagingAreaProps) => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data } = usePublicQuery<EditorRecommendedTags>(
    EDITOR_RECOMMENDED_TAGS,
    {
      variables: { userName: viewer.userName },
    }
  )

  const hasTag = tags.length > 0
  const userTagsEdges = data?.user?.tags.edges || []
  const recommendationTagsEdges = data?.user?.recommendation.tags.edges || []
  const recommendedTags = [...userTagsEdges, ...recommendationTagsEdges]?.map(
    (edge) => edge.node
  )

  const removeTag = (tag: SelectTag) => {
    const newTags = tags.filter((t) => t.node.id !== tag.id)
    setTags(newTags)
  }
  const addTag = (tag: SelectTag) => {
    const oldTags = tags.filter((t) => t.node.id !== tag.id)
    setTags([...oldTags, { node: tag, selected: true }])
  }

  if (!recommendedTags || recommendedTags.length <= 0) {
    return (
      <section className="customTagArea">
        <Spinner />
      </section>
    )
  }

  if (hasTag) {
    return (
      <section className="customTagArea">
        <SelectedTags
          tags={tags.map((t) => t.node as TagType)}
          onRemoveTag={removeTag}
        />
        <hr />
        <RecommendedTags tags={recommendedTags} onAddTag={addTag} />

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="customTagArea">
      <RecommendedTags tags={recommendedTags} onAddTag={addTag} />
      <style jsx>{styles}</style>
    </section>
  )
}

export default TagCustomStagingArea
