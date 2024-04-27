import classNames from 'classnames'

import { ReactComponent as IconInfo } from '@/public/static/icons/24px/information.svg'
import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { toSizedImageURL } from '~/common/utils'
import { Card, Icon } from '~/components'

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
      <Icon icon={IconPlus} size="xs" />
    )}
  </span>
)

const NumberIndicator = ({
  num,
  withHintOverlay = false,
}: {
  num: number
  withHintOverlay?: boolean
}) => (
  <span className={`${styles.indicator} ${num > 0 ? styles.num : ''}`}>
    {num}
    {withHintOverlay && num === 0 && (
      <span className={styles.hintOverlay}>
        <Icon icon={IconInfo} color="gold" />
      </span>
    )}
  </span>
)

const ListItem: React.FC<React.PropsWithChildren<ListItemProps>> & {
  CoverIndicator: typeof CoverIndicator
  NumberIndicator: typeof NumberIndicator
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

export default ListItem
