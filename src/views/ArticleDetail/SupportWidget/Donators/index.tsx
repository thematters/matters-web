import classNames from 'classnames'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { Media, SupportersDialog, Tooltip } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { DonatorsArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type AvatarItemPros = Pick<AvatarProps, 'user'> & {
  user?: { displayName?: string | null } | null
}

const AvatarItem = ({ user }: AvatarItemPros) => {
  if (!user) {
    return (
      <div className={styles.avatarItem}>
        <Media lessThan="xl">
          <Avatar size="md" />
        </Media>
        <Media greaterThanOrEqual="xl">
          <Avatar size="lg" />
        </Media>
      </div>
    )
  }

  return (
    <Tooltip content={user.displayName} placement="top">
      <div className={styles.avatarItem}>
        <Media lessThan="xl">
          <Avatar user={user} size="md" />
        </Media>
        <Media greaterThanOrEqual="xl">
          <Avatar user={user} size="lg" />
        </Media>
      </div>
    </Tooltip>
  )
}

interface DonatorsProps {
  article: DonatorsArticleFragment
  showAvatarAnimation?: boolean
  isAuthor?: boolean
}

const Donators = ({
  article,
  showAvatarAnimation = false,
  isAuthor,
}: DonatorsProps) => {
  const maxAvatarNum = 49

  const edges = article.donations.edges
  const donatorsCount = article.donations.totalCount
  const frontDonators = (edges?.map(({ node }) => node.sender) || []).slice(
    0,
    maxAvatarNum + 1
  )

  const containerClasses = classNames({
    [styles.clickable]: isAuthor,
  })

  return (
    <SupportersDialog article={article}>
      {({ openDialog }) => (
        <section
          className={containerClasses}
          onClick={() => isAuthor && openDialog()}
        >
          <section className={styles.avatarList}>
            {frontDonators.map((user, index) => (
              <>
                {index < maxAvatarNum && (
                  <Fragment key={index}>
                    <AvatarItem user={user || undefined} />
                  </Fragment>
                )}
                {index === maxAvatarNum && (
                  <span className={styles.count}>
                    {donatorsCount - maxAvatarNum <= 99 && (
                      <>+{donatorsCount - maxAvatarNum}</>
                    )}
                    {donatorsCount - maxAvatarNum > 99 && <>99+</>}
                  </span>
                )}
              </>
            ))}
          </section>
          {isAuthor && donatorsCount > 0 && (
            <section className={styles.viewSupport}>
              <span>
                <FormattedMessage defaultMessage="View" id="FgydNe" />
              </span>
              <span>
                <FormattedMessage
                  defaultMessage="Supporter"
                  id="NbdvAd"
                  description="src/views/ArticleDetail/SupportWidget/Donators/index.tsx"
                />
              </span>
            </section>
          )}
        </section>
      )}
    </SupportersDialog>
  )
}

Donators.fragments = fragments

export default Donators
