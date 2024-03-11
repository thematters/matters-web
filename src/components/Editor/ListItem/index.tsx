import classNames from 'classnames'

import { toSizedImageURL } from '~/common/utils'
import { Card, IconAdd16, IconArrowRight16, IconChecked32 } from '~/components'

import styles from './styles.module.css'

type ListItemProps = {
  title: string | React.ReactNode
  subTitle?: string | React.ReactNode
  hint?: boolean
  onClick?: () => any
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
          disableAnimation: true,
        })}
        alt="cover"
      />
    ) : (
      <IconAdd16 size="xs" />
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
      <IconAdd16 size="xs" />
    </span>
  )

const ArrowIndicator = ({ checked }: { checked: boolean }) =>
  checked ? (
    <span className={[styles.indicator, styles.arrowIndicator].join(' ')}>
      <IconChecked32 size="md" />
    </span>
  ) : (
    <span className={[styles.arrowIndicator].join(' ')}>
      <IconArrowRight16 color="grey" />
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
