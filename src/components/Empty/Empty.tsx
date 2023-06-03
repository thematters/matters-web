import { Alert } from '@reach/alert'

import styles from './styles.module.css'

interface EmptyProps {
  icon: React.ReactNode
  description: string | React.ReactNode
}

export const Empty = ({ icon, description }: EmptyProps) => {
  return (
    <section className="empty">
      <section>{icon}</section>

      <Alert type="polite">
        <section className="description">{description}</section>
      </Alert>
    </section>
  )
}
