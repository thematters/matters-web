import classNames from 'classnames'

import { Title } from '~/components'

import styles from './styles.css'

interface PageHeaderProps {
  title: string | React.ReactNode
  description?: string | React.ReactNode

  is?: 'h1' | 'h2' | 'h3'
  hasNoBorder?: boolean
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  is = 'h1',
  hasNoBorder = false,

  children
}) => {
  const headerClass = classNames({
    hasNoBorder: !!hasNoBorder
  })

  return (
    <header className={headerClass} tabIndex={0}>
      <section className="title">
        <Title type="nav" is={is}>
          {title}
        </Title>

        {children}
      </section>

      {description && <p className="description">{description}</p>}

      <style jsx>{styles}</style>
    </header>
  )
}
