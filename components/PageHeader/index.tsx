import { Title } from '~/components'

import styles from './styles.css'

interface PageHeaderProps {
  pageTitle: string | React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  children
}) => {
  return (
    <header>
      <Title is="h1" type="page">
        {pageTitle}
      </Title>

      {children}
      <style jsx>{styles}</style>
    </header>
  )
}
