import { FormattedMessage } from 'react-intl'

import IMAGE_WALL_BACKGROUND_MD from '@/public/static/images/circle-wall-background-md.jpg'
import IMAGE_WALL_BACKGROUND_SM from '@/public/static/images/circle-wall-background-sm.jpg'
import { Translate } from '~/components'

import styles from './styles.module.css'

interface SensitiveWallProps {
  sensitiveByAuthor: boolean
  expandAll: () => void
}

const SensitiveWall = ({
  sensitiveByAuthor,
  expandAll,
}: SensitiveWallProps) => {
  const style = {
    '--circle-wall-bg-sm': `url(${IMAGE_WALL_BACKGROUND_SM.src})`,
    '--circle-wall-bg-md': `url(${IMAGE_WALL_BACKGROUND_MD.src})`,
  } as React.CSSProperties

  return (
    <section className={styles.container} style={style}>
      <section className={styles.message} onClick={expandAll}>
        <FormattedMessage
          defaultMessage="This article has been marked as restricted content by the {actor}. "
          id="bQ5vZC"
          description="src/views/ArticleDetail/Wall/Sensitive/index.tsx"
          values={{
            actor: sensitiveByAuthor ? (
              <Translate en="author" zh_hans="作者" zh_hant="作者" />
            ) : (
              <Translate en="site" zh_hans="站方" zh_hant="站方" />
            ),
          }}
        />
        <br />
        <FormattedMessage
          defaultMessage="May contain pornography, violence, gore, etc. Click here to expand all."
          id="5rxHb7"
          description="src/views/ArticleDetail/Wall/Sensitive/index.tsx"
        />
      </section>
    </section>
  )
}

export default SensitiveWall
