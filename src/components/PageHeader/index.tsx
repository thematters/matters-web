import classNames from 'classnames'

import { Title } from '~/components'

import styles from './styles.css'

interface PageHeaderProps {
  title: string | React.ReactNode
  buttons?: React.ReactNode
  description?: string

  is?: 'h1' | 'h2' | 'h3'
  hasNoBottomBorder?: boolean
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  buttons,
  description,
  title,
  children,
  is = 'h1',
  hasNoBottomBorder = false
}) => {
  if (buttons || description) {
    const headerClasses = classNames({
      hasButtons: !!buttons,
      hasDescription: !!description,
      hasNoBottomBorder
    })

    return (
      <header className={headerClasses}>
        <section className="title">
          <Title type="nav" is={is}>
            {title}
          </Title>

          {buttons}
        </section>

        <section className="description">{description}</section>

        {children}

        <style jsx>{styles}</style>
      </header>
    )
  }

  return (
    <header>
      <Title type="nav" is={is}>
        {title}
      </Title>

      {children}

      <style jsx>{styles}</style>
    </header>
  )
}
