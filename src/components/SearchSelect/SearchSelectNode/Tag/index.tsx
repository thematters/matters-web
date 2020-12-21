import classNames from 'classnames'

import { Card, IconChecked, IconUnChecked, Tag } from '~/components'

import styles from '../styles.css'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

interface SearchSelectTagProps {
  tag: DigestTag
  selected?: boolean
  onClick: (tag: DigestTag) => void
  inStagingArea?: boolean
}

const SearchSelectTag: React.FC<SearchSelectTagProps> = ({
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
    <Card spacing={['base', 'base']} onClick={() => onClick(tag)}>
      <section className={nodeClass}>
        <Tag tag={tag} type="list" hasCount={!inStagingArea} disabled />

        <span className="icon-select">
          {inStagingArea && selected && (
            <IconChecked color="green" size="md-s" />
          )}
          {inStagingArea && !selected && (
            <IconUnChecked color="grey-light" size="md-s" />
          )}
        </span>

        <style jsx> {styles}</style>
      </section>
    </Card>
  )
}

export default SearchSelectTag
