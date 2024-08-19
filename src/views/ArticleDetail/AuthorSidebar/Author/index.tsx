import type { ClickButtonProp as TrackEventProps } from '~/common/utils'
import { analytics, toPath } from '~/common/utils'
import { Avatar, LinkWrapper } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type AuthorProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

const Author = ({ article }: AuthorProps) => {
  const { author } = article
  const {
    userName,
    displayName,
    info: { description },
  } = author
  const userProfilePath = toPath({
    page: 'userProfile',
    userName: userName || '',
  })

  const trackEvent = {
    pageType: 'article_detail',
    pageComponent: 'article_author',
  } as Omit<TrackEventProps, 'type'>

  return (
    <section className={styles.container}>
      <section>
        <LinkWrapper
          {...userProfilePath}
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'user_avatar',
              ...trackEvent,
            })
          }}
        >
          <Avatar size={64} user={author} inProfile />
        </LinkWrapper>
      </section>

      <section className={styles.info}>
        <LinkWrapper
          {...userProfilePath}
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: 'user_name',
              ...trackEvent,
            })
          }}
        >
          <span className={styles.displayName}>{displayName}</span>
        </LinkWrapper>
        {!!description && <span className={styles.bio}>{description}</span>}
      </section>
    </section>
  )
}

Author.fragments = fragments

export default Author
