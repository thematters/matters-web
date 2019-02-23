import { Avatar } from '~/components'

import styles from './styles.css'

export const UserProfile = () => {
  return (
    <section className="container">
      <div className="l-row">
        <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2 content">
          <Avatar size="xlarge" />
        </section>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}
