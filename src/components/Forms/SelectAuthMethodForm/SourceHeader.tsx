import IMAGE_AUTH_SOURCE_APPRECIATION from '@/public/static/images/auth-source/appreciation.png'
import IMAGE_AUTH_SOURCE_BOOKMARK from '@/public/static/images/auth-source/bookmark.png'
import IMAGE_AUTH_SOURCE_CIRCLE from '@/public/static/images/auth-source/circle.png'
import IMAGE_AUTH_SOURCE_COLLECT from '@/public/static/images/auth-source/collect.png'
import IMAGE_AUTH_SOURCE_COMMENT from '@/public/static/images/auth-source/comment.png'
import IMAGE_AUTH_SOURCE_CREATE from '@/public/static/images/auth-source/create.png'
import IMAGE_AUTH_SOURCE_ENTER from '@/public/static/images/auth-source/enter.png'
import IMAGE_AUTH_SOURCE_FOLLOW from '@/public/static/images/auth-source/follow.png'
import IMAGE_AUTH_SOURCE_SUPPORT from '@/public/static/images/auth-source/support.png'
import { UNIVERSAL_AUTH_SOURCE } from '~/common/enums'

import styles from './styles.module.css'

const AUTH_SOURCE_IMG = {
  [UNIVERSAL_AUTH_SOURCE.enter]: {
    image: IMAGE_AUTH_SOURCE_ENTER.src,
  },
  [UNIVERSAL_AUTH_SOURCE.appreciation]: {
    image: IMAGE_AUTH_SOURCE_APPRECIATION.src,
  },
  [UNIVERSAL_AUTH_SOURCE.bookmark]: {
    image: IMAGE_AUTH_SOURCE_BOOKMARK.src,
  },
  [UNIVERSAL_AUTH_SOURCE.circle]: {
    image: IMAGE_AUTH_SOURCE_CIRCLE.src,
  },
  [UNIVERSAL_AUTH_SOURCE.collectArticle]: {
    image: IMAGE_AUTH_SOURCE_COLLECT.src,
  },
  [UNIVERSAL_AUTH_SOURCE.comment]: {
    image: IMAGE_AUTH_SOURCE_COMMENT.src,
  },
  [UNIVERSAL_AUTH_SOURCE.create]: {
    image: IMAGE_AUTH_SOURCE_CREATE.src,
  },
  [UNIVERSAL_AUTH_SOURCE.followUser]: {
    image: IMAGE_AUTH_SOURCE_FOLLOW.src,
  },
  [UNIVERSAL_AUTH_SOURCE.followTag]: {
    image: IMAGE_AUTH_SOURCE_FOLLOW.src,
  },
  [UNIVERSAL_AUTH_SOURCE.followCircle]: {
    image: IMAGE_AUTH_SOURCE_FOLLOW.src,
  },
  [UNIVERSAL_AUTH_SOURCE.support]: {
    image: IMAGE_AUTH_SOURCE_SUPPORT.src,
  },
}

const SourceHeader = ({ source }: { source: UNIVERSAL_AUTH_SOURCE }) => {
  return (
    <section className={styles.sourceHeader}>
      <img src={AUTH_SOURCE_IMG[source].image} alt="banner image" />
    </section>
  )
}

export default SourceHeader
