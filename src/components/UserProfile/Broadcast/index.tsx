import { Card, IconVolume32 } from '~/components'

import styles from './styles.css'

import { UserProfileUserPublic_user_ownCircles } from '../__generated__/UserProfileUserPublic'

type BroadcastProps = {
  circles: UserProfileUserPublic_user_ownCircles
}

const Broadcast = ({ circles }: BroadcastProps) => {
  return (
    <section className="container">
      <Card>
        <section className="icon">
          <IconVolume32 />
        </section>
        <section className="content">{''}</section>
      </Card>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Broadcast
