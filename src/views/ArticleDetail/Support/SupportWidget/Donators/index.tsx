import classNames from 'classnames'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { analytics } from '~/common/utils'
import { Media, SupportersDialog, Tooltip } from '~/components'
import { Avatar, AvatarProps } from '~/components/Avatar'
import { DonatorsArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

type AvatarItemPros = Pick<AvatarProps, 'user'> & {
  user?: { displayName?: string | null } | null
}

const AvatarItem = ({ user }: AvatarItemPros) => {
  return (
    <Tooltip
      content={
        user?.displayName || (
          <FormattedMessage defaultMessage="Anonymous User" id="GclYG/" />
        )
      }
      placement="top"
    >
      <div className={styles.avatarItem}>
        <Media lessThan="xl">
          <Avatar user={user} size={24} />
        </Media>
        <Media greaterThanOrEqual="xl">
          <Avatar user={user} size={32} />
        </Media>
      </div>
    </Tooltip>
  )
}

interface DonatorsProps {
  article: DonatorsArticleFragment
  isAuthor?: boolean
}

const Donators = ({ article, isAuthor }: DonatorsProps) => {
  const maxAvatarNum = 49
  const edges = article.donations.edges
  const donatorsCount = article.donations.totalCount
  const frontDonators = (edges?.map(({ node }) => node.sender) || []).slice(
    0,
    maxAvatarNum + 1
  )
  const isAllAnonymousSupporters = frontDonators.every(
    (donator) => !donator?.id
  )

  const containerClasses = classNames({
    [styles.clickable]: isAuthor,
  })

  return (
    <SupportersDialog article={article}>
      {({ openDialog }) => (
        <section
          className={containerClasses}
          onClick={() => {
            if (isAuthor) {
              analytics.trackEvent('click_button', {
                type: 'supporter_list',
                pageType: 'article_detail',
              })
              openDialog()
            }
          }}
        >
          <section className={styles.avatarList}>
            {frontDonators.map((user, index) => (
              <Fragment key={index}>
                {index < maxAvatarNum && (
                  <Fragment>
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
              </Fragment>
            ))}
          </section>
          {isAuthor && donatorsCount > 0 && !isAllAnonymousSupporters && (
            <section className={styles.viewSupport}>
              <FormattedMessage
                defaultMessage="View supporters"
                id="uME1sk"
                description="src/views/ArticleDetail/SupportWidget/Donators/index.tsx"
              />
            </section>
          )}
        </section>
      )}
    </SupportersDialog>
  )
}

Donators.fragments = fragments

export default Donators
