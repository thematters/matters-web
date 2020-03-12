import classNames from 'classnames'

import { Title } from '~/components'

import styles from './styles.css'

export interface PageHeaderProps {
  title: string | React.ReactNode

  is?: 'h1' | 'h2' | 'h3'
  hasNoBorder?: boolean
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  is = 'h1',
  hasNoBorder = false,

  children
}) => {
  const headerClass = classNames({
    hasNoBorder: !!hasNoBorder
  })

  return (
    <header className={headerClass}>
      <section className="title">
        <Title type="nav" is={is}>
          {title}
        </Title>

        {children}
      </section>

      <style jsx>{styles}</style>
    </header>
  )
}
