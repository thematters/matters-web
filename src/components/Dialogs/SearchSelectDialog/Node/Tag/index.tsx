import classNames from 'classnames'

import {
  Card,
  IconCheckedMedium,
  IconCheckMedium,
  List,
  Tag,
} from '~/components'

import styles from '../styles.css'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

interface SearchSelectTagProps {
  tag: DigestTag
  selected?: boolean
  onClick: (tag: DigestTag) => void
  inStagingArea?: boolean
}

export const SearchSelectTag: React.FC<SearchSelectTagProps> = ({
  tag,
  selected,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    node: true,
    selectable: inStagingArea,
  })

  return (
    <List.Item>
      <Card spacing={['base', 'base']} onClick={() => onClick(tag)}>
        <section className={nodeClass}>
          <Tag tag={tag} type="list" hasCount={!inStagingArea} disabled />

          <span className="icon-select">
            {inStagingArea && selected && (
              <IconCheckedMedium color="green" size="md" />
            )}
            {inStagingArea && !selected && (
              <IconCheckMedium color="grey-light" size="md" />
            )}
          </span>

          <style jsx> {styles}</style>
        </section>
      </Card>
    </List.Item>
  )
}
