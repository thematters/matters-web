import styles from './styles.css'

interface EmptyProps {
  icon: React.ReactNode
  description: string | React.ReactNode
}

export const Empty = ({ icon, description }: EmptyProps) => {
  return (
    <section className="empty">
      <section>{icon}</section>

      <section className="description">{description}</section>

      <style jsx>{styles}</style>
    </section>
  )
}
