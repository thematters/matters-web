import classNames from 'classnames'

import IconPlus from '@/public/static/icons/24px/plus.svg'
import IconRight from '@/public/static/icons/24px/right.svg'
import IconSquareChecked from '@/public/static/icons/square-checked.svg'
import { toSizedImageURL } from '~/common/utils'
import { Card, Icon } from '~/components'

import styles from './styles.module.css'

type ListItemProps = {
  title: string | React.ReactNode
  subTitle?: string | React.ReactNode
  hint?: boolean
  onClick?: () => void
}

const CoverIndicator = ({ cover }: { cover?: string | null }) => (
  <span className={styles.indicator}>
    {cover ? (
      <img
        className={styles.cover}
        src={toSizedImageURL({
          url: cover,
          width: 72,
          height: 72,
        })}
        alt="cover"
      />
    ) : (
      <Icon icon={IconPlus} size={12} />
    )}
  </span>
)

const NumberIndicator = ({ num }: { num: number }) =>
  num > 0 ? (
    <span className={`${styles.indicator} ${num > 0 ? styles.num : ''}`}>
      {num}
    </span>
  ) : (
    <span className={styles.indicator}>
      <Icon icon={IconPlus} size={12} />
    </span>
  )

const ArrowIndicator = ({ checked }: { checked: boolean }) =>
  checked ? (
    <span className={[styles.indicator, styles.arrowIndicator].join(' ')}>
      <Icon icon={IconSquareChecked} size={24} />
    </span>
  ) : (
    <span className={[styles.arrowIndicator].join(' ')}>
      <Icon icon={IconRight} color="grey" />
    </span>
  )

const ListItem: React.FC<React.PropsWithChildren<ListItemProps>> & {
  CoverIndicator: typeof CoverIndicator
  NumberIndicator: typeof NumberIndicator
  ArrowIndicator: typeof ArrowIndicator
} = ({ title, subTitle, hint, onClick, children }) => {
  const subtitleClasses = classNames({
    [styles.subtitle]: true,
    [styles.hint]: !!hint,
  })

  return (
    <li role="listitem">
      <Card bgColor="white" spacing={[0, 0]} onClick={onClick}>
        <section className={styles.item}>
          <section>
            <h3 className={styles.title}>{title}</h3>
            <p className={subtitleClasses}>{subTitle}</p>
          </section>

          {children}
        </section>
      </Card>
    </li>
  )
}

ListItem.CoverIndicator = CoverIndicator
ListItem.NumberIndicator = NumberIndicator
ListItem.ArrowIndicator = ArrowIndicator

export default ListItem
