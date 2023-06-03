import classNames from 'classnames'

import { Card, IconAdd16, IconExclaimHint } from '~/components'

import styles from './styles.module.css'

type ListItemProps = {
  title: string | React.ReactNode
  subTitle?: string | React.ReactNode
  hint?: boolean
  onClick?: () => any
}

const CoverIndicator = ({ cover }: { cover?: string | null }) => (
  <span className="rect">
    {cover ? <img src={cover} alt="cover" /> : <IconAdd16 size="xs" />}
  </span>
)

const NumberIndicator = ({
  num,
  withHintOverlay = false,
}: {
  num: number
  withHintOverlay?: boolean
}) => (
  <span style={{ position: 'relative', width: '2.25rem', height: '2.25rem' }}>
    <span
      className={`rect ${num > 0 ? 'num' : ''}`}
      style={{ position: 'absolute', bottom: 0, left: 0 }}
    >
      {num}
    </span>
    {withHintOverlay && num === 0 && (
      <IconExclaimHint style={{ position: 'absolute', top: 0, right: 0 }} />
    )}
  </span>
)

const ListItem: React.FC<React.PropsWithChildren<ListItemProps>> & {
  CoverIndicator: typeof CoverIndicator
  NumberIndicator: typeof NumberIndicator
} = ({ title, subTitle, hint, onClick, children }) => {
  const subtitleClasses = classNames({
    subtitle: true,
    hint: !!hint,
  })

  return (
    <li role="listitem">
      <Card bgColor="white" spacing={[0, 0]} onClick={onClick}>
        <section className="item">
          <section>
            <h3 className="title">{title}</h3>
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
