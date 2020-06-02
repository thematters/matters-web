import { Button, IconClear } from '~/components'

import styles from './styles.css'

interface TagProps {
  tag: string
  deleteTag: (tag: string) => void
}

const Tag = ({ tag, deleteTag }: TagProps) => (
  <span className="tag">
    <span>{tag}</span>

    <Button onClick={() => deleteTag(tag)}>
      <IconClear color="grey-lighter" />
    </Button>

    <style jsx>{styles}</style>
  </span>
)

export default Tag
