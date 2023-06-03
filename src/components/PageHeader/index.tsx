import classNames from 'classnames'

import { Title } from '~/components'

import styles from './styles.module.css'

export interface PageHeaderProps {
  title: string | React.ReactNode

  is?: 'h1' | 'h2' | 'h3'
  hasNoBorder?: boolean
}

export const PageHeader: React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  title,
  is = 'h1',
  hasNoBorder = false,

  children,
}) => {
  const headerClasses = classNames({
    hasNoBorder: !!hasNoBorder,
  })

  return (
    <header className={headerClasses}>
      <section className="title">
        <Title type="nav" is={is}>
          {title}
        </Title>

        {children}
      </section>
    </header>
  )
}
