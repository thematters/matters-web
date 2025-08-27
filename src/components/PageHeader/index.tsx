import classNames from 'classnames'

import { Title } from '~/components'

import styles from './styles.module.css'

export interface PageHeaderProps {
  title: string | React.ReactNode

  is?: 'h1' | 'h2' | 'h3'
  hasBorder?: boolean
  type?: 'nav' | 'base'
  spacingBottom?: 8 | 12 | 16
}

export const PageHeader: React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  title,
  is = 'h1',
  type = 'nav',
  hasBorder = true,
  spacingBottom = 8,
  children,
}) => {
  const headerClasses = classNames({
    [styles.header]: true,
    [styles.hasBorder]: hasBorder,
    [styles[`spacingBottom${spacingBottom}`]]: spacingBottom,
  })

  return (
    <header className={headerClasses}>
      <section className={styles.title}>
        <Title type={type} is={is}>
          {title}
        </Title>

        {children}
      </section>
    </header>
  )
}
