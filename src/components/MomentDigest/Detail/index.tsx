import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Button, DateTime, Icon, LinkWrapper } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { MomentDigestDetailMomentPublicFragment } from '~/gql/graphql'

import Assets from '../Assets'
import { fragments } from './gql'
import styles from './styles.module.css'

export type MomentDigestDetailProps = {
  moment: MomentDigestDetailMomentPublicFragment
  onClose: () => void
}

export const MomentDigestDetail = ({
  moment,
  onClose,
}: MomentDigestDetailProps) => {
  const { content, createdAt, assets, author } = moment

  const momentDetailPath = toPath({
    page: 'momentDetail',
    moment,
  })

  const userProfilePath = toPath({
    page: 'userProfile',
    userName: author.userName || '',
  })

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <section className={styles.left}>
          <section
            className={styles.author}
            data-test-id={TEST_ID.MOMENT_DIGEST_AUTHOR}
          >
            <UserDigest.Mini user={author} avatarSize={40} hasAvatar />

            <section className={styles.info}>
              <section className={styles.top}>
                <LinkWrapper {...userProfilePath}>
                  <section className={styles.displayName}>
                    {author.displayName}
                  </section>
                </LinkWrapper>
              </section>
              <LinkWrapper {...momentDetailPath}>
                <DateTime date={createdAt} color="grey" />
              </LinkWrapper>
            </section>
          </section>
        </section>
        <section className={styles.right}>
          <Button textColor="greyDarker" textActiveColor="black">
            <Icon icon={IconTimes} onClick={onClose} size={22} />
          </Button>
        </section>
      </header>
      {!!content && (
        <section
          className={styles.content}
          data-test-id={TEST_ID.MOMENT_DIGEST_CONTENT}
          dangerouslySetInnerHTML={{
            __html: content || '',
          }}
        />
      )}
      {!!assets && assets.length > 0 && <Assets moment={moment} />}
    </section>
  )
}

MomentDigestDetail.fragments = fragments
