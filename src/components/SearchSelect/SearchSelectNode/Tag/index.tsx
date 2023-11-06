import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import { Card, IconChecked, IconUnChecked, Tag } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from '../styles.module.css'

interface SearchSelectTagProps {
  tag: DigestTagFragment
  selected?: boolean
  onClick: (tag: DigestTagFragment) => void
  inStagingArea?: boolean
}

const SearchSelectTag: React.FC<SearchSelectTagProps> = ({
  tag,
  selected,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    [styles.node]: true,
    [styles.selectable]: inStagingArea,
  })

  return (
    <Card
      spacing={['base', 'base']}
      onClick={() => onClick(tag)}
      testId={TEST_ID.SEARCH_RESULTS_ITEM}
    >
      <section className={nodeClass}>
        <Tag tag={tag} type="list" hasCount is="span" />

        <span className={styles.iconSelect}>
          {inStagingArea && selected && (
            <IconChecked color="green" size="mdS" />
          )}
          {inStagingArea && !selected && (
            <IconUnChecked color="greyLight" size="mdS" />
          )}
        </span>
      </section>
    </Card>
  )
}

export default SearchSelectTag
