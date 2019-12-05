import classNames from 'classnames'

import { Title } from '~/components'

import styles from './styles.css'

interface PageHeaderProps {
  buttons?: React.ReactNode
  description?: string
  pageTitle: string | React.ReactNode
  is?: 'h1' | 'h2' | 'h3'
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  buttons,
  description,
  pageTitle,
  children,
  is = 'h1'
}) => {
  if (buttons || description) {
    const headerClasses = classNames({
      hasButtons: !!buttons,
      hasDescription: !!description
    })

    return (
      <header className={headerClasses}>
        <section className="title">
          <Title is={is} type="page">
            {pageTitle}
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
      <Title is={is} type="page">
        {pageTitle}
      </Title>

      {children}

      <style jsx>{styles}</style>
    </header>
  )
}
