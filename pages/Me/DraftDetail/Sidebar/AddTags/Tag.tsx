import { Icon } from '~/components'

import ICON_FAIL from '~/static/icons/fail.svg?sprite'

import styles from './styles.css'

interface TagProps {
  tag: string
  deleteTag: (tag: string) => void
}

const Tag = ({ tag, deleteTag }: TagProps) => (
  <span className="tag">
    <span>{tag}</span>
    <button type="button" onClick={() => deleteTag(tag)}>
      <Icon
        id={ICON_FAIL.id}
        viewBox={ICON_FAIL.viewBox}
        style={{ width: 14, height: 14 }}
      />
    </button>
    <style jsx>{styles}</style>
  </span>
)

export default Tag
