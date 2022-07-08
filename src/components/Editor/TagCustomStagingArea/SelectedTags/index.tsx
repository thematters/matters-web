import { Tag } from '~/components'

import styles from './styles.css'

type SelectedTagsProps = {
  tags: any[]
  onRemoveTag: (tag: any) => void
}

const SelectedTags: React.FC<SelectedTagsProps> = ({ tags, onRemoveTag }) => {
  return (
    <section className="selectedTags">
      <ul className="tagList">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Tag tag={tag} type="inline" removeTag={() => onRemoveTag(tag)} />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

export default SelectedTags
