import classNames from 'classnames'
import Link from 'next/link'

import { Img } from '~/components'

import { toPath } from '~/common/utils'

import TAG_COVER from '@/public/static/images/tag-cover.png'

import styles from './styles.css'

interface CardProps {
  id: string
  content: string
  cover?: string
}

interface ItemProps {
  hidden?: boolean
}

const Card: React.FC<CardProps> = ({ id, content, cover }) => {
  const path = toPath({ page: 'tagDetail', id })

  const url = cover || TAG_COVER
  const maskClasses = classNames({ mask: !!cover })

  return (
    <Link {...path}>
      <a>
        <section className="card">
          <Img url={url} size="360w" />
          <div className={maskClasses}>
            <p>{content}</p>
          </div>
        </section>
        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

const Item: React.FC<ItemProps> = ({ children, hidden = false }) => {
  const classes = classNames({ item: true, hidden })

  return (
    <section className={classes} role="listitem">
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

export const List: React.FC & { Card: typeof Card; Item: typeof Item } = ({
  children,
}) => {
  return (
    <section className="list" role="list">
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

List.Item = Item
List.Card = Card
