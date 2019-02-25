import { Title } from '~/components'

import styles from './styles.css'

interface PageHeaderProps {
  pageTitle: string | React.ReactNode
  is?: 'h1' | 'h2' | 'h3'
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  children,
  is = 'h1'
}) => {
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
