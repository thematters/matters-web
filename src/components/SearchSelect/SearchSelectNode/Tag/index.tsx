import classNames from 'classnames'

import { ReactComponent as IconCircleCheckFill } from '@/public/static/icons/24px/circle-check-fill.svg'
import { ReactComponent as IconCircleEmpty } from '@/public/static/icons/24px/circle-empty.svg'
import { TEST_ID } from '~/common/enums'
import { Card, Icon, Tag } from '~/components'
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
            <Icon icon={IconCircleCheckFill} color="green" size="mdS" />
          )}
          {inStagingArea && !selected && (
            <Icon icon={IconCircleEmpty} color="greyLight" size="mdS" />
          )}
        </span>
      </section>
    </Card>
  )
}

export default SearchSelectTag
