import { Tag } from '~/components'
import { SelectTag } from '~/components/SearchSelect/SearchingArea'

import styles from './styles.css'

import { EditorRecommendedTags_user_tags_edges_node as TagType } from '../__generated__/EditorRecommendedTags'

type SelectedTagsProps = {
  tags: TagType[]
  onRemoveTag: (tag: SelectTag) => void
}

const SelectedTags: React.FC<SelectedTagsProps> = ({ tags, onRemoveTag }) => {
  return (
    <section className="selectedTags">
      <ul className="tagList">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Tag
              tag={tag}
              type="inline"
              hasClose
              disabled
              removeTag={() => onRemoveTag(tag)}
            />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SelectedTags
