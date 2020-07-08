import { Img } from '~/components'

import IMAGE_COVER from '@/public/static/images/profile-cover.png'

import styles from './styles.css'

interface ProfileCoverProps {
  cover?: string | null
  inEditor?: boolean
}

export const ProfileCover = ({ cover, inEditor }: ProfileCoverProps) => {
  const url = cover || IMAGE_COVER
  const isFallback = !cover

  return (
    <div className="profile-cover">
      <Img
        url={url}
        size="1080w"
        smUpSize="540w"
        disabled={isFallback || inEditor}
      />

      <style jsx>{styles}</style>
    </div>
  )
}

export default ProfileCover
