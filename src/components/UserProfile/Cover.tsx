import IMAGE_COVER from '~/static/images/profile-cover.png'

import styles from './styles.css'

export const ProfileCover = ({ cover }: { cover: string | null }) => (
  <>
    <div
      className="profile-cover"
      style={{ backgroundImage: `url(${cover || IMAGE_COVER})` }}
    />
    <style jsx>{styles}</style>
  </>
)

export default ProfileCover
