import classNames from 'classnames'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { IMAGE_PIXEL } from '~/common/enums'
import { Media, SupportersDialog, Tooltip } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { DonatorsArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type AvatarItemPros = Pick<AvatarProps, 'user'> & {
  user: { displayName?: string | null }
}

const AvatarItem = ({ user }: AvatarItemPros) => {
  return (
    <Tooltip content={user?.displayName || ''} placement="top">
      <div className={styles.avatarItem}>
        <Media at="sm">
          <Avatar
            user={user || undefined}
            src={user ? undefined : IMAGE_PIXEL}
            size="md"
          />
        </Media>
        <Media greaterThan="sm">
          <Avatar
            user={user || undefined}
            src={user ? undefined : IMAGE_PIXEL}
            size="lg"
          />
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
  const donators = (
    edges?.map(({ node }) => node).filter((user) => !!user) || []
  ).slice(0, maxAvatarNum)
  const frontDonators = donators.slice(0, maxAvatarNum - 1)

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
                    <AvatarItem user={user} />
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
