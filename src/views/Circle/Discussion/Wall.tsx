import { useContext } from 'react'

import CIRCLE_DISCUSSION_WALL from '@/public/static/images/circle-discussion-wall.svg'
import CIRCLE_DISCUSSION_WALL_SM from '@/public/static/images/circle-discussion-wall-sm.svg'
import { translate } from '~/common/utils'
import { LanguageContext, Translate } from '~/components'
import { DiscussionPublicQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type WallProps = {
  circle: NonNullable<DiscussionPublicQuery['circle']>
}

const Wall = ({ circle }: WallProps) => {
  const { lang } = useContext(LanguageContext)
  const discussionCount = circle.discussionCount || 0
  const discussionThreadCount = circle.discussionThreadCount || 0

  return (
    <section
      className={styles.wall}
      aria-label={translate({
        zh_hant: '成為圍爐一員，一起談天說地',
        zh_hans: '成为围炉一员，一起谈天说地',
        en: 'Subscribe circle and chat together!',
        lang,
      })}
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={CIRCLE_DISCUSSION_WALL} />

        <img src={CIRCLE_DISCUSSION_WALL_SM} alt="illustration" />
      </picture>

      <section className={styles.brief}>
        {discussionThreadCount > 0 && (
          <p>
            <Translate
              zh_hant={`聽說目前共累積 ${discussionThreadCount} 串討論，${discussionCount} 則迴響`}
              zh_hans={`听说目前共累积 ${discussionThreadCount} 串讨论，${discussionCount} 则回响`}
            />
          </p>
        )}
      </section>
    </section>
  )
}

export default Wall
