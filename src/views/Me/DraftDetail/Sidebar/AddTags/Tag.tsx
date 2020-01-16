import { Icon } from '~/components'

import styles from './styles.css'

interface TagProps {
  tag: string
  deleteTag: (tag: string) => void
}

const Tag = ({ tag, deleteTag }: TagProps) => (
  <span className="tag">
    <span>{tag}</span>

    <button type="button" onClick={() => deleteTag(tag)}>
      <Icon.Fail style={{ width: 14, height: 14 }} />
    </button>

    <style jsx>{styles}</style>
  </span>
)

export default Tag
