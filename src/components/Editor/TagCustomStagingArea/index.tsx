import { CustomStagingAreaProps } from '~/components/SearchSelect/StagingArea'

import RecommendedTags from './RecommendedTags'
import SelectedTags from './SelectedTags'
import styles from './styles.css'

const TagCustomStagingArea = ({
  nodes,
  setNodes,
  hint,
}: CustomStagingAreaProps) => {
  const hasTag = nodes.length > 0
  const recommendedTags = [] as any[]
  const removeTag = () => {
    //
  }
  const addTag = () => {
    //
  }

  if (hasTag) {
    return (
      <section className="customTagArea">
        <SelectedTags tags={recommendedTags} onRemoveTag={removeTag} />
        <hr />
        <RecommendedTags tags={recommendedTags} onClickTag={addTag} />

        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="customTagArea">
      <RecommendedTags tags={recommendedTags} onClickTag={addTag} />
      <style jsx>{styles}</style>
    </section>
  )
}

export default TagCustomStagingArea
