import { Card, IconAdd16 } from '~/components'

import styles from './styles.css'

type ListItemProps = {
  title: string | React.ReactNode
  onClick?: () => any
}

const CoverIndicator = ({ cover }: { cover?: string | null }) => (
  <span className="rect">
    {cover ? <img src={cover} /> : <IconAdd16 size="xs" />}
    <style jsx>{styles}</style>
  </span>
)

const NumberIndicator = ({ num }: { num: number }) => (
  <span className={`rect ${num > 0 ? 'num' : ''}`}>
    {num}
    <style jsx>{styles}</style>
  </span>
)

const ListItem: React.FC<ListItemProps> & {
  CoverIndicator: typeof CoverIndicator
  NumberIndicator: typeof NumberIndicator
} = ({ title, onClick, children }) => {
  return (
    <li>
      <Card bgColor="white" spacing={[0, 0]} onClick={onClick}>
        <section className="item">
          <h3 className="title">{title}</h3>

          {children}
        </section>
      </Card>

      <style jsx>{styles}</style>
    </li>
  )
}

ListItem.CoverIndicator = CoverIndicator
ListItem.NumberIndicator = NumberIndicator

export default ListItem
