import classNames from 'classnames'

import { Title } from '~/components'

import styles from './styles.module.css'

export interface PageHeaderProps {
  title: string | React.ReactNode

  is?: 'h1' | 'h2' | 'h3'
  hasBorder?: boolean
}

export const PageHeader: React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  title,
  is = 'h1',
  hasBorder = true,

  children,
}) => {
  const headerClasses = classNames({
    [styles.header]: true,
    [styles.hasBorder]: hasBorder,
  })

  return (
    <header className={headerClasses}>
      <section className={styles.title}>
        <Title type="nav" is={is}>
          {title}
        </Title>

        {children}
      </section>
    </header>
  )
}
