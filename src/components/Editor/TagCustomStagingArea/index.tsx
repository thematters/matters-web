import _uniqBy from 'lodash/uniqBy'
import { useContext } from 'react'

import { MAX_ARTICLE_TAG_LENGTH } from '~/common/enums'
import { Spinner, usePublicQuery, ViewerContext } from '~/components'
import { SelectTag } from '~/components/SearchSelect/SearchingArea'
import { CustomStagingAreaProps } from '~/components/SearchSelect/StagingArea'
import { EditorRecommendedTagsQuery } from '~/gql/graphql'

import { EDITOR_RECOMMENDED_TAGS } from './gql'
import RecommendedTags from './RecommendedTags'
import SelectedTags from './SelectedTags'
import styles from './styles.module.css'

type EditorRecommendedTagsUserTagsEdgesNode = Required<
  NonNullable<
    NonNullable<EditorRecommendedTagsQuery['user']>['tags']['edges']
  >[0]['node']
>

const TagCustomStagingArea = ({
  nodes: tags,
  setNodes: setTags,
  hint,
  toStagingArea,
}: CustomStagingAreaProps) => {
  const viewer = useContext(ViewerContext)

  /**
   * Data Fetching
   */
  // public data
  const { data, loading } = usePublicQuery<EditorRecommendedTagsQuery>(
    EDITOR_RECOMMENDED_TAGS,
    {
      variables: { userName: viewer.userName },
    }
  )

  // recommended tags
  const userTagsEdges = data?.user?.tags.edges || []

  let recommendedTags = [...userTagsEdges]?.map((edge) => edge.node)
  // remove duplicated tags
  recommendedTags = _uniqBy(recommendedTags, (tag) => tag.content)
  // remove selected tags
  recommendedTags = recommendedTags.filter(
    (tag) => !tags.find((t) => t.node.id === tag.id)
  )

  const removeTag = (tag: SelectTag) => {
    const newTags = tags.filter((t) => t.node.id !== tag.id)
    setTags(newTags)
  }
  const addTag = (tag: SelectTag) => {
    const oldTags = tags.filter((t) => t.node.id !== tag.id)
    setTags([...oldTags, { node: tag, selected: true }])
    toStagingArea && toStagingArea()
  }

  if (loading) {
    return (
      <section className={styles.customTagArea}>
        <Spinner />
      </section>
    )
  }

  const hasTag = tags.length > 0
  const hasRecommendedTags = recommendedTags && recommendedTags.length > 0

  if (!hasTag && !hasRecommendedTags) {
    return (
      <section className={styles.customTagArea}>
        <section className={styles.hint}>{hint}</section>
      </section>
    )
  }

  return (
    <section className={styles.customTagArea}>
      {hasTag && (
        <SelectedTags
          tags={tags.map(
            (t) => t.node as EditorRecommendedTagsUserTagsEdgesNode
          )}
          onRemoveTag={removeTag}
        />
      )}
      {/* {hasRecommendedTags && <hr />} */}
      {hasRecommendedTags && (
        <RecommendedTags
          tags={recommendedTags as EditorRecommendedTagsUserTagsEdgesNode[]}
          onAddTag={addTag}
          disabled={tags.length >= MAX_ARTICLE_TAG_LENGTH}
        />
      )}
    </section>
  )
}

export default TagCustomStagingArea
