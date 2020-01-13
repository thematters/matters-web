import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

type CardSpacing = 'xtight' | 'tight' | 'base'

interface CardProps {
  bgColor?: 'grey-lighter'
  spacing?: [CardSpacing, CardSpacing]
  fontSize?: 'md-s'

  href: string
  as?: string
}

export const Card: React.FC<CardProps> = ({
  bgColor,
  spacing = [0, 0],
  fontSize,

  href,
  as,

  children
}) => {
  const cardClass = classNames({
    [`bg-${bgColor}`]: !!bgColor,
    [`spacing-vertical-${spacing[0]}`]: !!spacing[0],
    [`spacing-horizontal-${spacing[1]}`]: !!spacing[1],
    [`font-size-${fontSize}`]: !!fontSize
  })

  return (
    <Link href={href} as={as}>
      <article className={cardClass}>
        {children}

        <style jsx>{styles}</style>
      </article>
    </Link>
  )
}
