import { toPath } from '~/common/utils'
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
  return (
    <section className={styles.container}>
      <section>
        <LinkWrapper {...userProfilePath}>
          <section className={styles.avatar}>
            <Avatar size="xxlm" user={author} inProfile />
          </section>
        </LinkWrapper>
      </section>
      <LinkWrapper {...userProfilePath}>
        <section className={styles.info}>
          <span className={styles.displayName}>{displayName}</span>
          {!!description && <span className={styles.bio}>{description}</span>}
        </section>
      </LinkWrapper>
    </section>
  )
}

Author.fragments = fragments

export default Author